const Contract = require('../models/Contract.js');
const validateQuote = require('../utils/validation.js');
const Quote = require('../models/Quote.js');
const { generateContractTerms } = require('../utils/contractTerms.js');
const Crane = require('../models/Crane.js');
const generateContractNumber = () => {
  return 'CNT-' + Date.now().toString().slice(-6);
};


const createContract = async (req, res) => {
  try {
    console.log(req.body)
    const { id,craneId } = req.body;
    console.log(id)
    const quoteId = id
    const prvcontract =await Contract.findById(quoteId);
    if(prvcontract){
      const populatedContract = await Contract.findById(prvcontract._id).populate('quoteId');

      return res.status(201).json(populatedContract);
      console.log("in the prv contract")
    }

    // Fetch the quote to generate terms
   else{ const quote = await Quote.findById(quoteId);
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    
    // Generate contract terms based on quote details
    const terms = generateContractTerms(quote);

    const contract = new Contract({
      quoteId,
      contractNumber: generateContractNumber(),
      terms,
      craneId,
      status: 'draft'
    });

    const savedContract = await contract.save();

    // Populate quote details for the response
    const populatedContract = await Contract.findById(savedContract._id).populate('quoteId');
console.log("in the create contract")

    res.status(201).json(populatedContract);}
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 const signContract = async (req, res) => {
  try {
    const { signatureData,craneId } = req.body;

    const contract = await Contract.findOne({ quoteId: req.params.id });
    console.log(signatureData)
    console.log("id", req.params.id)
    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }
    

    contract.signatureData=req.body.signatureData
    contract.signedDate=Date.now()
    contract.craneId=craneId
    contract.status = 'signed';
    const quote = await Quote.findById(contract.quoteId); // Fetch the related quote
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    quote.status = 'approved';
    await quote.save(); // Save the updated quote
    console.log("Quote status updated");
const crane=await Crane.findById(craneId)
if(!crane){

  return res.status(404).json({ message: 'crane not found' });



}
crane.status='rented'
await crane.save();

    const updatedContract = await contract.save();
    res.json(updatedContract);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 const getAllContracts = async (req, res) => {
  try {
    // Fetch all contracts and populate quote details if needed
    const contracts = await Contract.find().populate('quoteId');
    res.status(200).json(contracts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { createContract, signContract, getAllContracts };
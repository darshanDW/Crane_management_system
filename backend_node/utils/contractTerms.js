 const generateContractTerms = (quote) => {
  const terms = `
  CRANE RENTAL AGREEMENT
  
  1. EQUIPMENT
  The Lessor agrees to rent to the Lessee one (1) ${quote.craneType} crane with a capacity of ${quote.capacity} tons.
  
  2. RENTAL PERIOD
  The rental period shall commence on ${new Date(quote.startDate).toLocaleDateString()} for a duration of ${quote.rentalDuration} days.
  
  3. RENTAL RATE
  The agreed rental rate is $${quote.totalPrice.toLocaleString()} for the entire rental period.
  
  4. PAYMENT TERMS
  - 50% deposit required upon contract signing
  - Remaining balance due upon completion of rental period
  - Late payments subject to 1.5% monthly interest charge
  
  5. LESSEE'S RESPONSIBILITIES
  a) Provide safe and adequate access to work site
  b) Obtain necessary permits and authorizations
  c) Ensure proper ground conditions for crane operation
  d) Provide qualified personnel for signaling and rigging
  
  6. LESSOR'S RESPONSIBILITIES
  a) Provide crane in good working condition
  b) Maintain valid certification and insurance
  c) Provide qualified operator
  d) Perform regular maintenance
  
  7. INSURANCE
  Lessee shall maintain comprehensive general liability insurance with minimum coverage of $2,000,000.
  
  8. INDEMNIFICATION
  Lessee agrees to indemnify and hold harmless the Lessor against all claims arising from the use of the equipment.
  
  9. TERMINATION
  Either party may terminate this agreement with 48-hour written notice for breach of contract terms.
  
  10. GOVERNING LAW
  This agreement shall be governed by the laws of the State of operation.
  `;

  return terms;

};
module.exports = {generateContractTerms};
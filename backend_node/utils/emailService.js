import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
/*
export const sendQuoteEmail = async (to, quote) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your Crane Rental Quote',
    html: `
      <h2>Quote Details</h2>
      <p>Quote Number: ${quote._id}</p>
      <p>Crane Type: ${quote.craneType}</p>
      <p>Total Price: $${quote.totalPrice}</p>
      <p>Duration: ${quote.rentalDuration} days</p>
    `
  };

  return transporter.sendMail(mailOptions);
};

*/
export const sendContractEmail = async (to, contract) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Crane Rental Contract for Signature',
    html: `
      <h2>Contract Ready for Signature</h2>
      <p>Contract Number: ${contract.contractNumber}</p>
      <p>Please review and sign the contract at: ${process.env.FRONTEND_URL}/contracts/${contract._id}</p>
    `
  };

  return transporter.sendMail(mailOptions);
};
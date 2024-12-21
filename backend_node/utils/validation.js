 const validateQuote = (data) => {
  console.log(data)
  const errors = {};

  if (!data.craneType) errors.craneType = 'Crane type is required';
  if (!data.capacity || data.capacity <= 0) errors.capacity = 'Valid capacity is required';
  if (!data.rentalDuration || data.rentalDuration < 1) errors.rentalDuration = 'Minimum rental duration is 1 day';
  if (!data.startDate) errors.startDate = 'Start date is required';

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

 const validateContract = (data) => {
  const errors = {};

  if (!data.quoteId) errors.quoteId = 'Quote reference is required';
  if (!data.terms) errors.terms = 'Contract terms are required';

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

module.exports = {validateQuote, validateContract};
import { useState, useEffect } from 'react';

export default function PriceCalculator({ formData }) {
  const [totalPrice, setTotalPrice] = useState(0);
  console.log(formData)
  useEffect(() => {
    const calculatePrice = () => {

      // Ensure necessary form data is available
      if (!formData.craneType || !formData.capacity || !formData.rentalDuration) {
        return 0;
      }
      let rent = formData.rent;

      // If rentalDuration is less than 1 day, set it to 1 day (8 hours)
      const rentalHours = formData.rentalDuration < 1 ? 8 : formData.rentalDuration * 8; // In hours

      // Capacity-based hourly surcharge (e.g., 10 units per ton of capacity)
      const capacityRate = formData.capacity * 2; // Example surcharge based on capacity

      // Duration discount: if more than 7 days, apply a 10% discount (optional)
      const durationDiscount = rentalHours > 56 ? 0.9 : 1; // If > 7 days (56 hours), apply discount
      if (formData.operatorRequired) {
        const operatorRate = 10;
        rent = rent + operatorRate;

      }
console.log(rent)

      // Calculate the final price
      let price =
        (rent + capacityRate) *
        rentalHours *
        durationDiscount;

      // Return the rounded price
      return Math.round(price);
    };

    setTotalPrice(calculatePrice());
  }, [formData]);

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-xl font-bold mb-2">Price Estimate</h3>
      <p className="text-2xl text-blue-600">${totalPrice.toLocaleString()}</p>
      {formData.rentalDuration > 7 && (
        <p className="text-sm text-gray-600 mt-2">
          10% discount applied for rentals over 7 days
        </p>
      )}
    </div>
  );
}
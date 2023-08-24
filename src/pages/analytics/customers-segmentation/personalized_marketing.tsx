import React from 'react';

// Define type for the messages object
type MarketingMessages = {
  [segment: string]: string;
};

// Function to generate personalized marketing messages based on customer segments
const generateMarketingMessages = () => {
  const segments = ['Frequent Buyers', 'Loyal Customers', 'New Customers'];
  const messages: MarketingMessages = {
    'Frequent Buyers': 'Get 20% off on your next purchase!',
    'Loyal Customers': 'Exclusive rewards and discounts for our valued customers!',
    'New Customers': 'Welcome to our store! Enjoy 10% off on your first order!',
  };

  // Generate a random segment for each message
  const personalizedMessages = segments.map(segment => ({
    segment,
    message: messages[segment],
  }));

  return personalizedMessages;
};

const PersonalizedMarketing: React.FC = () => {
  const marketingMessages = generateMarketingMessages();

  return (
    <div className='flex flex-col justify-between w-full h-full px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100'>
      <h2 className='text-lg font-bold'>Personalized Marketing</h2>
      <p className='text-base'>Example for Strategy Marketing</p>
      <ul className='mt-6'>
        {marketingMessages.map(({ segment, message }) => (
          <li key={segment}>
            <strong>{segment}:</strong> {message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonalizedMarketing;

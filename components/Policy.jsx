import React from 'react';
import fastDelivery from '../public/fast-delivery.png';
import savings from '../public/saving.png';
import payment from '../public/payment.png';
import insurance from '../public/insurance.png';
import support from '../public/help-center.png';
import PolicyCard from './PolicyCard';

const policies = [
  {
    image: fastDelivery,
    title: 'fast delivery',
    content: 'Nation whide',
  },
  {
    image: savings,
    title: 'money saving',
    content: 'affordadable prices',
  },
  {
    image: payment,
    title: 'payment method',
    content: 'secure sytems',
  },
  {
    image: support,
    title: 'online support',
    content: '24 hours ',
  },
  {
    image: insurance,
    title: '100% safe',
    content: 'secure shopping',
  },
];

function Policy() {
  return (
    <div className=" mx-auto flex flex-wrap justify-center items-center  my-8 border">
      {policies.map((policy, index) => (
        <div key={index}>
          <PolicyCard policy={policy} />
        </div>
      ))}
    </div>
  );
}

export default Policy;

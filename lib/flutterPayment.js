import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

export default function App() {
  const config = {
    public_key: 'FLWPUBK_TEST-ec6a70b5cfd72d31266a55112ca50edc-X',
    tx_ref: Date.now(),
    amount: 1000,
    currency: 'NGN',
    payment_options: 'card',
    customer: {
      email: 'user@gmail.com',
      phone_number: '08031378164',
      name: 'john doe',
    },
    customizations: {
      title: 'ZEA payment',
      description: 'Payment to Zea',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="text-center">
      <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              closePaymentModal(); // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
      >
        Pay Now
      </button>
    </div>
  );
}

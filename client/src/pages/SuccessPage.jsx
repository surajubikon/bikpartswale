import React from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const { text, paymentMode } = location.state || {};

  return (
    <div>
      <h1>{text} Successful</h1>
      {paymentMode && <p>Payment Mode: {paymentMode}</p>}
    </div>
  );
};

export default SuccessPage;
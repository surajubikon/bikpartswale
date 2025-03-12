import React from "react";
import "./marqu.css"; // Custom CSS for styling

function Marqu() {
  return (
    <div className="bg-gray-900 text-white h-12 flex items-center overflow-hidden font-bold w-full z-50 text-lg">
      <div className="marquee">
        <div className="marquee-content">
          <span>🚴 Premium Quality Parts | 🔧 Discounts Available | 🏍️ Exclusive Deals on Accessories! Shop Now!</span>
          <span>🚴 Premium Quality Parts | 🔧 Discounts Available | 🏍️ Exclusive Deals on Accessories! Shop Now!</span>
        </div>
      </div>
    </div>
  );
}

export default Marqu;

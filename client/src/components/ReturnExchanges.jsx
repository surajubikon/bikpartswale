import React from 'react';  

function ReturnExchanges() {  
  return (  
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">  
      <h1 className="text-2xl font-bold mb-4">Returns & Exchanges</h1>  
      <p className="text-center mb-6">  
        Enter your 5 digit order number and Phone or Email to find your order  
      </p>  
      <div className="w-full max-w-md">  
        <input  
          type="text"  
          placeholder="Order Number"  
          className="mb-4 w-full p-3 border border-gray-300 rounded"  
        />  
        <input  
          type="text"  
          placeholder="Phone or Email"  
          className="mb-4 w-full p-3 border border-gray-300 rounded"  
        />  
        <button className="w-full p-3 text-white bg-teal-500 rounded hover:bg-teal-600">  
          FIND YOUR ORDER  
        </button>  
      </div>  
      <p className="mt-4 text-sm">  
        <a href="#" className="text-blue-600">  
          Check our policy here  
        </a>  
        
      </p>  

      <br/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">  
        <div className="bg-white p-4 rounded-lg shadow flex items-center">  
          <span className="material-icons text-blue-500 mr-3">chat</span>  
          <div>  
            <h3 className="text-lg font-semibold text-indigo-900">Live Chat</h3>  
            <p className="text-gray-600">Talk to an agent</p>  
          </div>  
        </div>  
        
        <div className="bg-white p-4 rounded-lg shadow flex items-center">  
          <span className="material-icons text-blue-500 mr-3">local_shipping</span>  
          <div>  
            <h3 className="text-lg font-semibold text-indigo-900">Fast Delivery</h3>  
            <p className="text-gray-600">We deliver all over India</p>  
          </div>  
        </div>  

        <div className="bg-white p-4 rounded-lg shadow flex items-center">  
          <span className="material-icons text-blue-500 mr-3">lock</span>  
          <div>  
            <h3 className="text-lg font-semibold text-indigo-900">Secure Payments</h3>  
            <p className="text-gray-600">Secure and reliable payment always</p>  
          </div>  
        </div>  
      </div>  
 
    </div>  
  );  
}  

export default ReturnExchanges;
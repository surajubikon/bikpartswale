import React from 'react';  

function AboutUs() {  
  return (  
    <div className="bg-gray-100 p-6 md:p-12">  
      <div className="text-center mb-10">  
        <h2 className="text-3xl font-bold text-indigo-900">About Us</h2>  
        <p className="mt-2 text-gray-600">  
          <strong className="text-indigo-900 text-xl">Welcome to BikePartsWale</strong>, your online store for auto parts, accessories, and services.  
        </p>  
      </div>  
      
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

      <div className="mt-10">  
        <h3 className="text-2xl font-bold text-indigo-900">Our Values:</h3>  
        <p className="mt-2 text-gray-600">  
          We value top quality service and product delivery and will ensure that you have an amazing online experience with us.  
        </p>  
      </div>  
      
      <div className="mt-5">  
        <h3 className="text-2xl font-bold text-indigo-900">Contact Us:</h3>  
        <p className="mt-2 text-gray-600">Email: <a href="mailto:info@bikapartswale.co.in" className="text-blue-500">info@bikepartswale.co.in</a></p>  
      </div>  
    </div>  
  );  
}  

export default AboutUs;
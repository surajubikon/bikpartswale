import React, { useState } from 'react';  
import { FaComments, FaRegEnvelope } from 'react-icons/fa'; // Importing icons  

const faqsData = [  
  {  
    question: "Any other question?",  
    answer: "You can contact our agents via the chat app on the down right corner or email us at info@eauto.co.in! We will be happy to assist you."  
  },  
  {  
    question: "Is there any additional GST?",  
    answer: "No, all the prices on the website are inclusive of GST. There is no additional tax applied on the product."  
  },  
  {  
    question: "Can I return my product?",  
    answer: "Yes, we accept returns. Please raise a return request on this link. Then send your order back to this address using India Post."  
  },  
  {  
    question: "How long will it take to get my order?",  
    answer: "Depending on where you are located, order delivery will take 2-7 days to arrive."  
  },  
  {  
    question: "How long do you take to dispatch after receiving the order?",  
    answer: "We will dispatch your order within 24 hours of receiving it."  
  }  
];  

function Faqs() {  
  const [expandedIndex, setExpandedIndex] = useState(null);  

  const toggleExpand = (index) => {  
    setExpandedIndex(expandedIndex === index ? null : index);  
  };  

  return (  
    <div className="max-w-4xl mx-auto p-4">  
      <h1 className="text-2xl font-bold text-center mb-6">FAQs (Frequently Asked Questions)</h1>  
      {faqsData.map((faq, index) => (  
        <div key={index} className="border-b border-gray-200 mb-4">  
          <div className="flex justify-between items-center py-3 cursor-pointer" onClick={() => toggleExpand(index)}>  
            <h2 className="text-xl font-semibold">{faq.question}</h2>  
            <span className="text-2xl">{expandedIndex === index ? '-' : '+'}</span>  
          </div>  
          {expandedIndex === index && (  
            <p className="text-gray-700">{faq.answer}</p>  
          )}  
        </div>  
      ))}   
      
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">  
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center text-center">  
          <FaComments className="text-blue-500 text-3xl mb-2" />  
          <h3 className="text-lg font-semibold text-indigo-900">Live Chat Support</h3>  
          <p className="text-gray-600">Message us via the chat app</p>  
        </div>  

        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center text-center">  
          <FaRegEnvelope className="text-blue-500 text-3xl mb-2" />  
          <h3 className="text-lg font-semibold text-indigo-900">Send a Message</h3>  
          <p className="text-gray-600">info@eauto.co.in</p>  
        </div>  
      </div>   */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">  
        {/* <div className="bg-white p-4 rounded-lg shadow flex items-center">  
          <span className="material-icons text-blue-500 mr-3">chat</span>  
          <div>  
            <h3 className="text-lg font-semibold text-indigo-900">Live Chat</h3>  
            <p className="text-gray-600">Talk to an agent</p>  
          </div>  
        </div>   */}

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

export default Faqs;
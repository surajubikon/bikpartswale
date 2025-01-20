import React, { useState } from 'react';  
import { FaMotorcycle, FaTools, FaCertificate } from 'react-icons/fa'; // Importing icons  

function blogs() {  
  const [modalOpen, setModalOpen] = useState(false);  
  const [currentPost, setCurrentPost] = useState(null);  

  const blogPosts = [  
    {  
      title: "Top 5 Essential Motorcycle Parts for Your Ride",  
      description: "Discover the must-have parts to keep your motorcycle running smoothly. From brakes to tires, we cover everything you need.",  
      details: "In this blog, we will explore essential motorcycle parts that every rider should know about. These include brakes, tires, chains, sprockets, and more to ensure your ride is safe and enjoyable.",  
      icon: <FaMotorcycle className="text-blue-500 text-3xl mb-3" />,  
    },  
    {  
      title: "How to Maintain Your Bike: Tips and Tricks",  
      description: "Learn effective maintenance tips to extend your bike's lifespan and improve performance. A well-maintained bike is a happy bike!",  
      details: "Proper maintenance can prolong the life of your bike. Regular oil checks, tire pressure monitoring, and cleaning are essential aspects of bike care.",  
      icon: <FaTools className="text-blue-500 text-3xl mb-3" />,  
    },  
    {  
      title: "Choosing the Right Gear for Safety",  
      description: "Safety is paramount! Explore our guide to selecting the best safety gear for your motorcycle adventures.",  
      details: "When it comes to safety, investing in quality gear—like helmets, jackets, gloves, and boots—can make all the difference in a critical situation.",  
      icon: <FaCertificate className="text-blue-500 text-3xl mb-3" />,  
    },  
  ];  

  const handleOpenModal = (post) => {  
    setCurrentPost(post);  
    setModalOpen(true);  
  };  

  const handleCloseModal = () => {  
    setModalOpen(false);  
    setCurrentPost(null);  
  };  

  return (  
    <div className="max-w-6xl mx-auto py-8 px-4">  
      <h1 className="text-3xl font-bold text-center mb-6">Bike Parts and Maintenance Blogs</h1>  
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">  
        {blogPosts.map((post, index) => (  
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-150">  
            <div className="flex justify-center">  
              {post.icon}  
            </div>  
            <h3 className="text-xl font-semibold text-center mt-4">{post.title}</h3>  
            <p className="text-gray-600 mt-2 text-center">{post.description}</p>  
            <button   
              onClick={() => handleOpenModal(post)}   
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg block mx-auto"  
            >  
              Read More  
            </button>  
          </div>  
        ))}  
      </div>  

      {modalOpen && currentPost && (  
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">  
          <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3 shadow-lg">  
            <h2 className="text-xl font-bold mb-4">{currentPost.title}</h2>  
            <p className="text-gray-700 mb-4">{currentPost.details}</p>  
            <button   
              onClick={handleCloseModal}   
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg"  
            >  
              Close  
            </button>  
          </div>  
        </div>  
      )}  
    </div>  
  );  
}  

export default blogs;
import React, { useState } from 'react';

const QAPopup = ({ button, handleClose }) => {
  const toggleFaqVisibility = (index) => {
    const newVisibility = [...faqVisibility];
    newVisibility[index] = !newVisibility[index];
    setFaqVisibility(newVisibility);
  };
  const [faqVisibility, setFaqVisibility] = useState(Array(10).fill(false)); // Tracks FAQ visibility



  const faqs = [
    {
      question: 'What is the purpose of this website?',
      answer: 'This platform helps photographers organize their photos, manage sales, and track photo performance.',
    },
    {
      question: 'Is this website only for professional photographers?',
      answer: 'No! Whether you\'re a professional or beginner, our platform is designed for all photographers.',
    },
    {
      question: 'How do I edit the information for my photos?',
      answer: 'Click a photo to view and edit the information or location of a photo. Make sure to click "Save" to save your edits.',
    },
    {
      question: 'How do I organize my photos into albums?',
      answer: 'Use the Albums page to create and manage your photo collections. Drag and drop photos into a new album or assign the photo an album during upload.',
    },
    {
      question: 'What happens if I accidentally delete a photo?',
      answer: 'Deleted photos are moved to the Trash page, where they can be restored or permanently deleted.',
    },
    {
      question: 'How do I mark my photos as sold?',
      answer: 'Upload a photo, and click the "Sold," button. Sold photos appear on the Sold page.',
    },
    {
      question: 'What does the Statistics page show?',
      answer: 'The Statistics page provides insights into your photo sales based on tags, including what tags are selling the most.',
    },
    {
      question: 'How does the Maps page work?',
      answer: 'The Maps page shows geotagged photos on an interactive map for location-based insights.',
    },
    {
      question: 'Are my photos secure?',
      answer: 'Yes, your photos are stored securely with encryption to prevent unauthorized access.',
    },
    {
      question: 'Is the website free?',
      answer: 'The website is free for storage of up to 500GB.',
    },
    {
      question: 'What happens if my account storage is full?',
      answer: 'Upgrade to a premium plan for more storage or delete unused photos to free up space.',
    },
  ];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#FAFAFA] p-6 rounded-2xl shadow-lg w-[90%] max-w-[600px] relative ml-32 border-2 border-black max-h-[80vh] overflow-y-auto">
        <h1 className="text-3xl text-center mb-8 mt-6">Frequently Asked Questions</h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-300 p-4 rounded-lg">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFaqVisibility(index)}
              >
                <h2 className="text-lg font-medium">{faq.question}</h2>
                <span className="text-xl">{faqVisibility[index] ? '-' : '+'}</span>
              </div>
              {faqVisibility[index] && <p className="mt-2 text-gray-700">{faq.answer}</p>}
            </div>
          ))}
          
        </div>

        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
          title="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default QAPopup;

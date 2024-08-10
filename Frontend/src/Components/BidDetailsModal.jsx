import React, { useState } from 'react';
// Import the FontAwesome icon
import { FaRupeeSign } from 'react-icons/fa';

const BidDetailsModal = ({ bid, isOpen, onClose }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(bid.bidItems[0]?._id || ''); // Default to the first item if available
  const [bidAmount, setBidAmount] = useState('');

  if (!isOpen) return null;

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleBidSubmit = () => {
    if (bidAmount && selectedItem) {
      // Handle the bid submission logic here, e.g., sending the selected item and bid amount to the server
      console.log('Bid submitted:', { itemId: selectedItem, amount: bidAmount });
      setBidAmount('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">{bid.title}</h2>
        <div className="space-y-4">
          <div>
            <strong className="block text-lg">Participants:</strong> 
            <span>{bid.participants.length}</span>
          </div>
          <div>
            <strong className="block text-lg">Items:</strong> 
            <span>{bid.bidItems.length}</span>
          </div>
          <div>
            <strong className="block text-lg">Status:</strong> 
            <span>{bid.status}</span>
          </div>
          <div>
            <strong className="block text-lg">End Time:</strong> 
            <span>{new Date(bid.endTime).toLocaleString()}</span>
          </div>
          <div>
            <strong className="block text-lg">Description:</strong> 
            <span>{bid.description || 'No description provided.'}</span>
          </div>

          {/* Accordion for Items */}
          <div className="mt-4">
            <button
              onClick={toggleAccordion}
              className="w-full text-left bg-gray-100 p-3 rounded hover:bg-gray-200 transition flex justify-between items-center"
            >
              <span className="text-lg font-semibold">Items ({bid.bidItems.length})</span>
              <span className="text-xl">{isAccordionOpen ? '-' : '+'}</span>
            </button>
            {isAccordionOpen && (
              <div className="mt-2 p-2 border border-gray-200 rounded">
                {bid.bidItems.length > 0 ? (
                  <ul className="list-disc list-inside space-y-2">
                    {bid.bidItems.map((item, index) => (
                      <li key={index} className="ml-4">
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-sm text-gray-600">
                          <strong>Description:</strong> {item.description || 'No description provided.'}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Starting Price:</strong> ₹{item.startingPrice}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>No items available.</div>
                )}
              </div>
            )}
          </div>

          {/* Item Selection, Bid Input, and Button */}
          <div className="mt-4 space-y-2">
            <div className="flex flex-col space-y-2">
              <label htmlFor="itemSelect" className="text-lg font-semibold">Select Item:</label>
              <select
                id="itemSelect"
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {bid.bidItems.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name} (Starting at ₹{item.startingPrice})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative flex-grow">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <FaRupeeSign />
                </span>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your bid amount"
                />
              </div>
              <button
                onClick={handleBidSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Place Bid
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BidDetailsModal;

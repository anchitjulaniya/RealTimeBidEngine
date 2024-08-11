import React, { useState, useContext } from 'react'; // Ensure useContext is imported
// Import the FontAwesome icon
import { FaRupeeSign } from 'react-icons/fa';
import { myContext } from '../utils/Context';
import { toast } from 'react-toastify';
import { Url } from '../utils/Url';

const BidDetailsModal = ({ bid, isOpen, onClose }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isParticipantsAccordionOpen, setIsParticipantsAccordionOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(bid.bidItems[0]?._id || ''); // Default to the first item if available
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(myContext); // Using the context to get currentUser

  if (!isOpen) return null;

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const toggleParticipantsAccordion = () => {
    setIsParticipantsAccordionOpen(!isParticipantsAccordionOpen);
  };

  const handleBidSubmit = async () => {
    if (!bidAmount || !selectedItem) {
      setError('Please select an item and enter a bid amount.');
      return;
    }
  
    if (!currentUser) {
      alert('Please log in first.');
      return;
    }

    console.log('bidAmount, selectedItem', bidAmount, selectedItem);
  
    try {
      setLoading(true);
      setError('');
  
      // Assuming you have an API endpoint like `/bids/:id/place`
      const response = await fetch(`${Url}/${bid._id}/bid`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUser?.id,
          itemId: selectedItem,
          amount: bidAmount,
        }),
      });
      
  
      // Log the response status
      console.log('Response Status:', response.status);
  
      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        const text = await response.text();
        console.error('Error Response Text:', text);
        throw new Error(`Failed to place bid. Status: ${response.status}`);
      }
  
      // Attempt to parse JSON
      const result = await response.json();
      console.log('Bid submitted successfully:', result);
      
      toast.success('Bid placed successfully!');
      setBidAmount(''); // Clear the input
      onClose(); // Close the modal if you want
    } catch (error) {
      console.error('Error placing bid:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-4">{bid.title}</h2>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row">
            <div className="w-1/2">
              <strong className="block text-lg">Participants:</strong>
              <span>{bid.participants.length}</span>
            </div>
            <div className="md:w-1/2">
              <strong className="block text-lg">Items:</strong>
              <span>{bid.bidItems.length}</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="w-1/2">
              <strong className="block text-lg">Status:</strong>
              <span>{bid.status}</span>
            </div>
            {/* <div className="md:w-1/2">
              <strong className="block text-lg">End Time:</strong>
              <span>{new Date(bid.endTime).toLocaleString()}</span>
            </div> */}
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
                          <strong>Starting Price:</strong> ₹{item.current}
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

          {/* Accordion for Participants */}
          <div className="mt-4">
            <button
              onClick={toggleParticipantsAccordion}
              className="w-full text-left bg-gray-100 p-3 rounded hover:bg-gray-200 transition flex justify-between items-center"
            >
              <span className="text-lg font-semibold">Participants ({bid.participants.length})</span>
              <span className="text-xl">{isParticipantsAccordionOpen ? '-' : '+'}</span>
            </button>
            {isParticipantsAccordionOpen && (
              <div className="mt-2 p-2 border border-gray-200 rounded">
                {bid.participants.length > 0 ? (
                  <ul className="list-disc list-inside space-y-2">
                    {bid.participants.map((participant, index) => (
                      <li key={index} className="ml-4">
                        <div className="font-semibold">{participant.name}</div>
                        <div className="text-sm text-gray-600">
                          <strong>Id:</strong> {participant._id}
                        </div>
                        {/* <div className="text-sm text-gray-600">
                          <strong>Email:</strong> {participant.email || 'No email provided.'}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Bid Amount:</strong> ₹{participant.bidAmount || 'No bid amount provided.'}
                        </div> */}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>No participants available.</div>
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
                    {item?.description} 
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
                disabled={loading}
              >
                {loading ? 'Placing...' : 'Place Bid'}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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

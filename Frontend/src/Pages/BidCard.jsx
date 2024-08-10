import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BidDetailsModal from '../Components/BidDetailsModal';

const BidCard = ({ bid }) => {
  const [remainingTime, setRemainingTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const calculateRemainingTime = () => {
      const endTime = new Date(bid.endTime).getTime();
      const currentTime = new Date().getTime();
      const timeDifference = endTime - currentTime;

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setRemainingTime("Expired");
      }
    };

    calculateRemainingTime();
    const interval = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(interval);
  }, [bid.endTime]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-white shadow-md rounded p-4 hover:shadow-lg transition flex flex-col">
      <span>
        <Link to={`/${bid._id}`} className="text-xl font-semibold text-blue-600 hover:underline">
          {bid.title}
        </Link>
      </span>
      <div>
        <span>{bid.participants.length} participants</span>
        <span>😎</span>
        <span>{bid.bidItems.length} items</span>
      </div>
      <span>{bid.status}</span>
      <span>{new Date(bid.createdAt).toLocaleString()}</span>
      <span id="remaining-time">
        {remainingTime}
      </span>
      <button
        onClick={openModal}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        View Details
      </button>

      {/* Modal */}
      <BidDetailsModal bid={bid} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default BidCard;

// BidPage.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Url } from '../utils/Url'
import { useParams } from 'react-router-dom';

const socket = io(Url)

const BidPage = () => {

  const { id } = useParams();
  
  
  const [bid, setBid] = useState(null);
  const [bidAmount, setBidAmount] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchBid = async () => {
    
      const response = await axios.get(`${Url}/${id}`);
      setBid(response.data);
      console.log(response.data);
    };

    fetchBid();

    // Listen for updates to the leaderboard
    socket.on('updateLeaderboard', (data) => {
      setLeaderboard(data);
    });

    return () => {
      socket.off('updateLeaderboard');
    };
  }, [id]);

  const handlePlaceBid = () => {
    socket.emit('placeBid', { id, bidAmount });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{bid?.title}</h1>
      <ul className="mb-6">
        {bid?.bidItems?.map((item) => (
          <li key={item._id} className="bg-white p-4 mb-2 rounded shadow">
            <p className="text-lg font-semibold">{item.description}</p>
            <p className="text-gray-600">Highest Bid: ${item.currentHighestBid}</p>
          </li>
        ))}
      </ul>
      <div className="flex items-center mb-6">
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          className="px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter your bid amount"
        />
        <button
          onClick={handlePlaceBid}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Place Bid
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <ul className="bg-white p-4 rounded shadow">
        {leaderboard.map((entry, index) => (
          <li key={index} className="flex justify-between py-2">
            <span className="text-lg">{entry.user}</span>
            <span className="text-lg font-semibold">${entry.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BidPage;

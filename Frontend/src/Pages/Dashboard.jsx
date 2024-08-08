// Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Url } from '../utils/Url'

const Dashboard = () => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchBids = async () => {
      const response = await axios.get(`${Url}/api/bids`);
      setBids(response.data);
    };

    fetchBids();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Your Bids</h1>
      <Link to="/create-bid" className="inline-block bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition">
        Create New Bid
      </Link>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bids.map((bid) => (
          <li key={bid._id} className="bg-white shadow-md rounded p-4 hover:shadow-lg transition">
            <Link to={`/bid/${bid._id}`} className="text-xl font-semibold text-blue-600 hover:underline">
              {bid.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

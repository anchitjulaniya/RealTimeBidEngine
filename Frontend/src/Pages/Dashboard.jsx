import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Url } from '../utils/Url';
import BidCard from './BidCard';

const Dashboard = () => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get(`${Url}`);
        console.log("response.data", response.data);
        setBids(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBids();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-[rgb(249,251,250)]">
      <h1 className="text-3xl font-bold mb-4">Your Bids</h1>
      <Link to="/create-bid" className="inline-block bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition">
        Create New Bid
      </Link>
      <div className="shadow-xl p-5 bg-white">
        <h2 className="text-xl font-semibold font-mono pb-5">All Bids</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bids?.map((bid) => (
            <BidCard key={bid._id} bid={bid} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

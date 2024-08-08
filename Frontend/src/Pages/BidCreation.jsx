import React, { useState } from 'react';
import axios from 'axios';
import { Url } from '../utils/Url';

const BidCreation = () => {
  const [title, setTitle] = useState('Auction for Electronics');
  const [bidItems, setBidItems] = useState([{ description: '', startingBid: 0 }]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [status, setStatus] = useState('draft');

  const handleAddItem = () => {
    setBidItems([...bidItems, { description: '', startingBid: 0 }]);
  };

  const handleItemChange = (index, e) => {
    const newItems = [...bidItems];
    newItems[index][e.target.name] = e.target.value;
    setBidItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bidData = {
        title,
        bidItems,
        startTime,
        endTime,
        status,
      };
      await axios.post(`${Url}`, bidData);
      alert('Bid created successfully!');
    } catch (error) {
      console.error('Bid creation error', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Create New Bid</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Bid Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter bid title"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {bidItems.map((item, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700">Item Description</label>
            <input
              type="text"
              name="description"
              value={item.description}
              onChange={(e) => handleItemChange(index, e)}
              placeholder="Enter item description"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
            <label className="block text-gray-700 mt-2">Starting Bid</label>
            <input
              type="number"
              name="startingBid"
              value={item.startingBid}
              onChange={(e) => handleItemChange(index, e)}
              placeholder="Enter starting bid amount"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddItem}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Add Another Item
        </button>

        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Set Timing</h2>
          <label className="block text-gray-700">Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            required
          />
          <label className="block text-gray-700 mt-4">End Time</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Set Status</h2>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <button
        //   type="submit"
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Create Bid
        </button>
      </form>
    </div>
  );
};

export default BidCreation;

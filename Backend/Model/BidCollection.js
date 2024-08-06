const mongoose = require('mongoose')
const BidCollectionSchema = new mongoose.Schema({
    "_id": "ObjectId",
    "title": "string",
    "bidItems": [
      {
        "itemId": "ObjectId",
        "description": "string",
        "currentHighestBid": "number"
      }
    ],
    "startTime": "ISODate",
    "endTime": "ISODate",
    "status": "enum", // "draft", "published", "closed"
    "participants": [
      {
        "userId": "ObjectId",
        "bids": [
          {
            "itemId": "ObjectId",
            "amount": "number"
          }
        ]
      }
    ]
  }
  )

  const BidCollectionModel = mongoose.model('BidCollection', BidCollectionSchema)

  module.exports = BidCollectionModel
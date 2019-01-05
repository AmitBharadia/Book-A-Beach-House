const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://root:root123@ds151863.mlab.com:51863/homeaway",
  { useNewUrlParser: true }
);

var Property = mongoose.model("property", {
  user_id: {
    type: String
  },
  available_from: {
    type: Date
  },
  available_to: {
    type: Date
  },
  max_guests: {
    type: Number,
    min: 1,
    max: 10
  },
  price: {
    type: Number,
    min: 1
  },
  bedrooms: {
    type: Number,
    min: 0
  },
  bathrooms: {
    type: Number,
    min: 0
  },
  sqft: {
    type: Number,
    min: 0
  },
  img_src: {
    type: String
  },
  location: {
    type: String
  },
  amenities: {
    type: String
  },
  headline: {
    type: String
  },
  description: {
    type: String,
    maxlength: 500
  },
  type: {
    type: String,
    enum: ["House", "Apartment"]
  }
});

module.exports = { Property };

const mongoose = require('mongoose');

const tourDetailsSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default:null
   
  },
  name: {
    type: String,
    default:null
   
  },
  tourType:[
    {
      type: String, 
    },
  ],
  overview: {
    type: String,
    default:null
   
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status:{
   type:String,

  },
  vendorName:{
    type: String,
    default:null
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vendors',
  },
  location: {
    type: String,
    default:null
   
  },
  isGroup:{
    type:Boolean
  },
  reviews: [
    {
      text: String,
      email: String,
      comment: String,
    }
  ],
  images: [
    {
      type: String, 
    },
  ],
  cost: [
    {
      standardPrice: { type: Number }, // Define standardPrice as a Number
      deluxePrice: { type: Number }, // Define deluxePrice as a Number
      premiumPrice: { type: Number }, // Define premiumPrice as a Number
    },
  ],
  duration: {
    type: String,
   
  },
  group: {
    type: Boolean,
    default: false,
  },
  groupSize: {
    type: String,
    // Add any specific validation for group size if needed
  },
  transportation: {
    type: Boolean,
    default: false,
  },
  cancellationPolicy: {
    type: String,
    
  },
  overview: {
    type: String,
   
  },
  languages: [
    {
      type: String,
    },
  ],
  highlights: [
    {
      type: String,
    },
  ],
  whatsIncluded: 
  [
    {
      type: String,
    },
  ],
  whatsExcluded: 
  [
    {
      type: String,
    },
  ],
  availableDates: 
  {
    type: String,
   
  },
  departureDetails:{
    type: String,
  }
  ,
  inclusions: 
  [
    {
      type: String,
    },
  ],
  exclusions:[
    {
      type: String,
    },
  ],
  knowBeforeYouGo: 
  [
    {
      type: String,
    },
  ],
  additionalInfo:[
    {
      type: String,
    },
  ],
  itineraries: [
    {
      title: { type: String },
      duration: { type: String },
      meals: [
        {
          type: String,
        },
      ],
      image: { type: String },
      description: { type: String },
      day:{type:Number}
    },
  ],
 
}
);

const Tour = mongoose.model('Tour', tourDetailsSchema);

module.exports = Tour;

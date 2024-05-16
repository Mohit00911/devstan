const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const wishlist=require('./controllers/wishlist.js')
const authRouter = require('./controllers/auth.js');
const tourController=require('./controllers/tour.js')
// const imageUploader=require('./controllers/tour.js')
const imageUploader=require('./controllers/cloudinary.js')
const testimonials=require('./controllers/testimonials.js')
const contactUs=require('./controllers/contactUs.js')
const paymentController=require('./services/paymentService.js')
const cors = require('cors');
const port = process.env.PORT || 4000;
const uri = "mongodb+srv://rawat009111:fSQGtHMkkia3YhjZ@tours.qpddv9d.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require('mongoose');
mongoose.connect(uri, { });
const db = mongoose.connection;
db.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});
db.once('open', () => {
  console.log('Connected to MongoDB');
});
app.use(cors());
app.use(bodyParser.json());
app.post('/user/signup', authRouter.signup);
app.post('/user/login', authRouter.login);
app.post('/expert/signup', authRouter.signup);
app.post('/expert/login', authRouter.login);
app.post('/api/createTours', tourController.createTour);
app.post('/api/updateUser',authRouter.updateUser)
app.post('/api/getUser',authRouter.getUser)
app.post('/api/contactus', contactUs.submitContactForm);
app.post('/api/allTours', tourController.getAllTours);
app.post('/api/checkout', paymentController.checkout);
app.post('/api/paymentVerification', paymentController.paymentVerification);
app.post('/api/userBooking', paymentController.userBooking);
app.post('/api/getBookedUserDetails', paymentController.getBookedUserDetails);
app.post('/api/getBookedTours/:vendorId', paymentController.getBookedToursByVendor);
app.post('/api/updateTourStatus', paymentController.updateBookedToursByVendor);
app.post('/api/getBookedToursbyUser/:userId', paymentController.getBookedToursByUser);
// app.get('/api/tours/:location/:date', tourController.getToursByLocationDate);
app.post('/api/tours/:location/:date', tourController.getToursByFilter);
app.get('/api/getTestimonials', testimonials.getAllTestimonials);
app.post('/api/createTestimonial', testimonials.createTestimonial);
app.post('/api/vendorTours', tourController.getToursForVendor);
app.post('/api/updateTour/:tourId', tourController.updateTour);
app.get('/api/getTour/:tourId', tourController.getTourDetails);
app.get('/api/getkey',(req,res)=>res.status(200).json("rzp_test_51M4AB2hSU08Ih"))
app.post('/uploadImage', imageUploader.imageUpload);
app.post('/api/addToWishlist', wishlist.addToWishlist);
app.get('/api/wishlist/:userId', wishlist.getWishlist);
app.post('/api/removeFromWishlist', wishlist.removeFromWishlist);

app.get('/', (req, res) => { 
  res.send('Hello, Express with MongoDB!');
});

app.listen(port, '127.0.0.1', () => {
  console.log(`Server is running on port ${port}`);
});
const { connect } = require("mongoose");
const Tour = require("../models/tour");

const createTour = async (req, res) => {
  try {
    const {
      itineraries,
      overview,
      vendor,
      vendorName,
      uuid,
      name,
      location,
      status,
      cost,
      duration,
      cancellationPolicy,
      languages,
      highlights,
      whatsIncluded,
      whatsExcluded,
      availableDates,
      departureDetails,
      inclusions,
      exclusions,
      knowBeforeYouGo,
      additionalInfo,
      tourType,
    } = req.body;
    const itineraryArray = Object.values(itineraries);

    const existingTour = await Tour.findOne({ uuid: uuid });

    if (existingTour) {
      existingTour.itineraries=itineraryArray;
      existingTour.tourType = tourType;
      existingTour.overview = overview;
      existingTour.status = status;
      existingTour.vendorName = vendorName;
      existingTour.vendor = vendor;
      existingTour.name = name;
      existingTour.location = location;
      existingTour.cost = cost;
      existingTour.duration = duration;
      existingTour.cancellationPolicy = cancellationPolicy;
      existingTour.languages = languages;
      existingTour.highlights = highlights;
      existingTour.whatsIncluded = whatsIncluded;
      existingTour.whatsExcluded = whatsExcluded;
      existingTour.availableDates = availableDates;
      existingTour.departureDetails = departureDetails;
      existingTour.inclusions = inclusions;
      existingTour.exclusions = exclusions;
      existingTour.knowBeforeYouGo = knowBeforeYouGo;
      existingTour.additionalInfo = additionalInfo;
      const updatedTour = await existingTour.save();
      res
        .status(200)
        .json({ message: "Tour updated successfully", tour: updatedTour });
    } else {
      const newTour = new Tour({
        ...req.body, itineraries: itineraryArray ,
        overview,
        vendorName,
        vendor,
        status,
        uuid,
        name,
        location,
        cost,
        duration,
        cancellationPolicy,
        languages,
        highlights,
        whatsIncluded,
        whatsExcluded,
        availableDates,
        departureDetails,
        inclusions,
        exclusions,
        knowBeforeYouGo,
        additionalInfo,
        tourType,
      });
      const savedTour = await newTour.save();
      res
        .status(201)
        .json({ message: "Tour created successfully", tour: savedTour });
    }
  } catch (error) {
    console.error("Error creating/updating tour:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};
const getAllTours = async (req, res) => {
  try {
    const { location, tourType, minPrice, maxPrice, durations } = req.body;

    const tours = await Tour.find();
    const filteredTours = tours.filter((tour) => tour.status !== "disabled");

    let filteredToursByLocationAndName = filteredTours;
    if (location) {
    
      filteredToursByLocationAndName = filteredTours.filter((tour) => {
        const tourLocation = tour.location && tour.location.toLowerCase();
        const tourName = tour.name && tour.name.toLowerCase();
        const matchesLocation = tourLocation === location.toLowerCase();

        const searchTermWords = location.toLowerCase().split(" ");
        const matchesSearchTerm = searchTermWords.every((word) =>
          tourName.includes(word)
        );
        return matchesLocation || matchesSearchTerm;
      });
    }

    let filteredToursByType = filteredToursByLocationAndName;
    if (tourType && tourType.length > 0) {
      filteredToursByType = filteredToursByLocationAndName.filter((tour) => {
        return tourType.every((tourTypeItem) => {
          return tour.tourType.includes(tourTypeItem);
        });
      });
    }
    

    let filteredToursByPrice = filteredToursByType;
    if (minPrice && maxPrice ) {
      filteredToursByPrice = filteredToursByType.filter((tour) => {
        const tourPrice = parseFloat(tour.cost);
        return (
          !isNaN(tourPrice) && tourPrice >= minPrice && tourPrice <= maxPrice
        );
      });
    }
 
    let filteredToursByDuration = filteredToursByPrice;
    if (durations && durations.length > 0) {
      filteredToursByDuration = filteredToursByPrice.filter((tour) => {
        const tourDurationNumbers = tour.duration.match(/\d+/g);
        const tourDurationNumber = tourDurationNumbers
          ? parseInt(tourDurationNumbers.join(""), 10)
          : 0;

        return durations.every((duration) => {
          return tourDurationNumber >= duration;
        });
      });
    }

    res.status(200).json(filteredToursByDuration);
  } catch (error) {
    console.error("Error fetching tours:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getToursForVendor = async (req, res) => {
  try {
    const { vendorId } = req.body;
    const tours = await Tour.find({ vendor: vendorId });
    res.status(200).json(tours);
  } catch (error) {
    console.error("Error fetching vendor tours:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getTourDetails = async (req, res) => {
  try {
    const tourId = req.params.tourId;
  console.log(tourId)
    const tours = await Tour.find({ uuid: tourId });
   
    res.status(200).json(tours) 
  
  } catch (error) {
    console.error("Error fetching vendor tours:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateTour = async (req, res) => {
  try {
    const { tourId } = req.params;

    const updatedTour = await Tour.findOneAndUpdate(
      { uuid: tourId },
      req.body
    );

    if (!updatedTour) {
      return res.status(404).json({ error: "Tour not found" });
    }

    res.json({ message: "Tour updated successfully", tour: updatedTour });
  } catch (error) {
    console.error("Error updating tour:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getToursByLocationDate = async (req, res) => {
  try {
    const { location, date } = req.params;

    const tours = await Tour.find();
    const filteredTours = tours.filter((tour) => tour.status !== "disabled");

    const filteredToursByLocationAndName = filteredTours.filter((tour) => {
      const tourLocation = tour.location && tour.location.toLowerCase();
      const tourName = tour.name && tour.name.toLowerCase();
      const matchesLocation = tourLocation === location.toLowerCase();
      const searchTermWords = location.toLowerCase().split(" ");
      const matchesSearchTerm = searchTermWords.every((word) =>
        tourName.includes(word)
      );
      return matchesLocation || matchesSearchTerm;
    });

    res.json(filteredToursByLocationAndName);
  } catch (error) {
    console.error("Error updating tour:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getToursByFilter = async (req, res) => {
  try {
    const { location, date } = req.params;

    const { tourType, minPrice, maxPrice, durations } = req.body;

    const tours = await Tour.find();
    const filteredTours = tours.filter((tour) => tour.status !== "disabled");

    const filteredToursByLocation = filteredTours.filter(
      (tour) =>
        tour.location && tour.location.toLowerCase() === location.toLowerCase()
    );

    const filteredToursByType = filteredToursByLocation.filter((tour) => {
      return tourType.every((tourTypeItem) => {
        return tour.tourType.includes(tourTypeItem);
      });
    });

    const filteredToursByPrice = filteredToursByType.filter((tour) => {
      const tourPrice = parseFloat(tour.cost);
      return (
        !isNaN(tourPrice) && tourPrice >= minPrice && tourPrice <= maxPrice
      );
    });

    const filteredToursByDuration = filteredToursByPrice.filter((tour) => {
      const tourDurationNumbers = tour.duration.match(/\d+/g);
      const tourDurationNumber = tourDurationNumbers ? parseInt(tourDurationNumbers.join(""), 10) : 0;
  
      return durations.every((duration) => {
          return tourDurationNumber >= duration;
      });
  })
  

    res.json(filteredToursByDuration);
  } catch (error) {
    console.error("Error updating tour:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  createTour,
  getAllTours,
  getToursForVendor,
  getTourDetails,
  updateTour,
  // getToursByLocationDate,
  getToursByFilter,
  
};

const express = require('express');
const aiService = require('../services/aiService');
const Itinerary = require('../models/Itinerary');
const { protect } = require('../middleware/auth');
const router = express.Router();

// @desc    Generate AI itinerary
// @route   POST /api/ai/generate-itinerary
// @access  Private
router.post('/generate-itinerary', protect, async (req, res) => {
  try {
    const {
      destinations,
      duration,
      budget,
      travelers,
      startDate,
      activities,
      transportation,
      personalInfo,
      travelPreferences,
      previousTravel
    } = req.body;

    // Validate required fields
    if (!destinations || !duration || !budget || !travelers || !startDate) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: destinations, duration, budget, travelers, startDate'
      });
    }

    // Prepare user preferences for AI
    const userPreferences = {
      destinations,
      duration: parseInt(duration),
      budget: parseInt(budget),
      travelers: parseInt(travelers),
      startDate,
      activities: activities || [],
      transportation: transportation || 'car',
      travelStyle: travelPreferences?.travelStyle || 'adventure',
      interests: travelPreferences?.interests || [],
      dietaryRestrictions: travelPreferences?.dietaryRestrictions || 'None',
      accommodationType: travelPreferences?.accommodationType || 'Hotels',
      personalInfo: personalInfo || {}
    };

    // Generate itinerary using AI
    const generatedItinerary = await aiService.generateItinerary(userPreferences);

    // Save to database
    const itinerary = await Itinerary.create({
      ...generatedItinerary,
      userId: req.user.id,
      status: 'draft'
    });

    res.status(201).json({
      success: true,
      message: 'AI itinerary generated successfully',
      itinerary
    });
  } catch (error) {
    console.error('Generate itinerary error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating itinerary',
      error: error.message
    });
  }
});

// @desc    Get user itineraries
// @route   GET /api/ai/itineraries
// @access  Private
router.get('/itineraries', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const itineraries = await Itinerary.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Itinerary.countDocuments({ userId: req.user.id });

    res.json({
      success: true,
      count: itineraries.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      itineraries
    });
  } catch (error) {
    console.error('Get itineraries error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching itineraries'
    });
  }
});

// @desc    Get single itinerary
// @route   GET /api/ai/itineraries/:id
// @access  Private
router.get('/itineraries/:id', protect, async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found'
      });
    }

    res.json({
      success: true,
      itinerary
    });
  } catch (error) {
    console.error('Get itinerary error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching itinerary'
    });
  }
});

// @desc    Update itinerary
// @route   PUT /api/ai/itineraries/:id
// @access  Private
router.put('/itineraries/:id', protect, async (req, res) => {
  try {
    const itinerary = await Itinerary.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found'
      });
    }

    res.json({
      success: true,
      message: 'Itinerary updated successfully',
      itinerary
    });
  } catch (error) {
    console.error('Update itinerary error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating itinerary'
    });
  }
});

// @desc    Delete itinerary
// @route   DELETE /api/ai/itineraries/:id
// @access  Private
router.delete('/itineraries/:id', protect, async (req, res) => {
  try {
    const itinerary = await Itinerary.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found'
      });
    }

    res.json({
      success: true,
      message: 'Itinerary deleted successfully'
    });
  } catch (error) {
    console.error('Delete itinerary error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting itinerary'
    });
  }
});

// @desc    Optimize route
// @route   POST /api/ai/optimize-route
// @access  Private
router.post('/optimize-route', protect, async (req, res) => {
  try {
    const { destinations } = req.body;

    if (!destinations || !Array.isArray(destinations)) {
      return res.status(400).json({
        success: false,
        message: 'Destinations array is required'
      });
    }

    const optimizedRoute = await aiService.optimizeRoute(destinations);

    res.json({
      success: true,
      optimizedRoute,
      message: 'Route optimized successfully'
    });
  } catch (error) {
    console.error('Route optimization error:', error);
    res.status(500).json({
      success: false,
      message: 'Error optimizing route'
    });
  }
});

module.exports = router;
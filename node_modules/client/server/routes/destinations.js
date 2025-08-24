const express = require('express');
const Destination = require('../models/Destination');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

// @desc    Get all destinations
// @route   GET /api/destinations
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    let query = { isActive: true };
    
    // Filter by type
    if (req.query.type) {
      query.type = req.query.type;
    }
    
    // Search by name
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
    }

    const destinations = await Destination.find(query)
      .populate('nearbyDestinations.destination', 'name type coordinates')
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Destination.countDocuments(query);

    res.json({
      success: true,
      count: destinations.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      destinations
    });
  } catch (error) {
    console.error('Get destinations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching destinations'
    });
  }
});

// @desc    Get single destination
// @route   GET /api/destinations/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id)
      .populate('nearbyDestinations.destination', 'name type coordinates');

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }

    res.json({
      success: true,
      destination
    });
  } catch (error) {
    console.error('Get destination error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching destination'
    });
  }
});

// @desc    Get destinations by coordinates (nearby)
// @route   GET /api/destinations/nearby/:lat/:lng
// @access  Public
router.get('/nearby/:lat/:lng', async (req, res) => {
  try {
    const { lat, lng } = req.params;
    const radius = parseInt(req.query.radius) || 50; // km
    const limit = parseInt(req.query.limit) || 10;

    const destinations = await Destination.find({
      isActive: true,
      coordinates: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: radius * 1000 // Convert km to meters
        }
      }
    }).limit(limit);

    res.json({
      success: true,
      count: destinations.length,
      destinations
    });
  } catch (error) {
    console.error('Get nearby destinations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching nearby destinations'
    });
  }
});

// @desc    Create destination
// @route   POST /api/destinations
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const destination = await Destination.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Destination created successfully',
      destination
    });
  } catch (error) {
    console.error('Create destination error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating destination'
    });
  }
});

// @desc    Update destination
// @route   PUT /api/destinations/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }

    res.json({
      success: true,
      message: 'Destination updated successfully',
      destination
    });
  } catch (error) {
    console.error('Update destination error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating destination'
    });
  }
});

// @desc    Delete destination
// @route   DELETE /api/destinations/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }

    // Soft delete
    destination.isActive = false;
    await destination.save();

    res.json({
      success: true,
      message: 'Destination deleted successfully'
    });
  } catch (error) {
    console.error('Delete destination error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting destination'
    });
  }
});

module.exports = router;
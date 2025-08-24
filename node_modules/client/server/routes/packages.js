const express = require('express');
const Package = require('../models/Package');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Build query
    let query = { availability: true };
    
    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    // Filter by price range
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = parseInt(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = parseInt(req.query.maxPrice);
    }
    
    // Filter by duration
    if (req.query.minDuration || req.query.maxDuration) {
      query.duration = {};
      if (req.query.minDuration) query.duration.$gte = parseInt(req.query.minDuration);
      if (req.query.maxDuration) query.duration.$lte = parseInt(req.query.maxDuration);
    }
    
    // Search by title or description
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { destinations: { $in: [new RegExp(req.query.search, 'i')] } }
      ];
    }

    // Sort options
    let sort = { createdAt: -1 };
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'price-low':
          sort = { price: 1 };
          break;
        case 'price-high':
          sort = { price: -1 };
          break;
        case 'rating':
          sort = { rating: -1 };
          break;
        case 'duration':
          sort = { duration: 1 };
          break;
        default:
          sort = { createdAt: -1 };
      }
    }

    const packages = await Package.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Package.countDocuments(query);

    res.json({
      success: true,
      count: packages.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      packages
    });
  } catch (error) {
    console.error('Get packages error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching packages'
    });
  }
});

// @desc    Get single package
// @route   GET /api/packages/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);

    if (!package) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      });
    }

    res.json({
      success: true,
      package
    });
  } catch (error) {
    console.error('Get package error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching package'
    });
  }
});

// @desc    Create package
// @route   POST /api/packages
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const package = await Package.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Package created successfully',
      package
    });
  } catch (error) {
    console.error('Create package error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating package'
    });
  }
});

// @desc    Update package
// @route   PUT /api/packages/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const package = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!package) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      });
    }

    res.json({
      success: true,
      message: 'Package updated successfully',
      package
    });
  } catch (error) {
    console.error('Update package error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating package'
    });
  }
});

// @desc    Delete package
// @route   DELETE /api/packages/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);

    if (!package) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      });
    }

    // Soft delete by setting availability to false
    package.availability = false;
    await package.save();

    res.json({
      success: true,
      message: 'Package deleted successfully'
    });
  } catch (error) {
    console.error('Delete package error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting package'
    });
  }
});

// @desc    Get package categories
// @route   GET /api/packages/categories/list
// @access  Public
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Package.distinct('category', { availability: true });
    
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories'
    });
  }
});

module.exports = router;
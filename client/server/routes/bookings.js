const express = require('express');
const Booking = require('../models/Booking');
const { protect, admin } = require('../middleware/auth');
const { validateBooking } = require('../middleware/validation');
const router = express.Router();

// @desc    Get all bookings (admin) or user bookings
// @route   GET /api/bookings
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let query = {};
    
    // If not admin, only show user's bookings
    if (req.user.role !== 'admin') {
      query.userId = req.user.id;
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const bookings = await Booking.find(query)
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      count: bookings.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      bookings
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching bookings'
    });
  }
});

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    let query = { _id: req.params.id };
    
    // If not admin, only allow access to own bookings
    if (req.user.role !== 'admin') {
      query.userId = req.user.id;
    }

    const booking = await Booking.findOne(query)
      .populate('userId', 'name email phone');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching booking'
    });
  }
});

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
router.post('/', protect, validateBooking, async (req, res) => {
  try {
    const bookingData = {
      ...req.body,
      userId: req.user.id
    };

    const booking = await Booking.create(bookingData);
    
    // Populate user data
    await booking.populate('userId', 'name email phone');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating booking'
    });
  }
});

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let query = { _id: req.params.id };
    
    // If not admin, only allow updating own bookings
    if (req.user.role !== 'admin') {
      query.userId = req.user.id;
    }

    const booking = await Booking.findOne(query);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Prevent updating certain fields if booking is confirmed
    if (booking.status === 'confirmed' && req.user.role !== 'admin') {
      const restrictedFields = ['packageName', 'destination', 'startDate', 'endDate', 'totalCost'];
      const hasRestrictedUpdates = restrictedFields.some(field => req.body[field]);
      
      if (hasRestrictedUpdates) {
        return res.status(400).json({
          success: false,
          message: 'Cannot modify confirmed booking details. Please contact support.'
        });
      }
    }

    const updatedBooking = await Booking.findOneAndUpdate(
      query,
      req.body,
      { new: true, runValidators: true }
    ).populate('userId', 'name email phone');

    res.json({
      success: true,
      message: 'Booking updated successfully',
      booking: updatedBooking
    });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating booking'
    });
  }
});

// @desc    Cancel booking
// @route   DELETE /api/bookings/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    let query = { _id: req.params.id };
    
    // If not admin, only allow canceling own bookings
    if (req.user.role !== 'admin') {
      query.userId = req.user.id;
    }

    const booking = await Booking.findOne(query);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if booking can be cancelled
    const startDate = new Date(booking.startDate);
    const now = new Date();
    const daysDifference = Math.ceil((startDate - now) / (1000 * 60 * 60 * 24));

    if (daysDifference < 7 && req.user.role !== 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Bookings cannot be cancelled less than 7 days before start date'
      });
    }

    // Update status to cancelled instead of deleting
    booking.status = 'cancelled';
    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while cancelling booking'
    });
  }
});

// @desc    Get booking statistics (admin only)
// @route   GET /api/bookings/stats/overview
// @access  Private/Admin
router.get('/stats/overview', protect, admin, async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });
    
    // Calculate total revenue
    const revenueResult = await Booking.aggregate([
      { $match: { status: { $in: ['confirmed', 'completed'] } } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalCost' } } }
    ]);
    
    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    // Get monthly bookings for current year
    const currentYear = new Date().getFullYear();
    const monthlyBookings = await Booking.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 },
          revenue: { $sum: '$totalCost' }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    res.json({
      success: true,
      stats: {
        totalBookings,
        confirmedBookings,
        pendingBookings,
        cancelledBookings,
        totalRevenue,
        monthlyBookings
      }
    });
  } catch (error) {
    console.error('Get booking stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching booking statistics'
    });
  }
});

module.exports = router;
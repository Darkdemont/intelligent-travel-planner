const express = require('express');
const pdfService = require('../services/pdfService');
const Itinerary = require('../models/Itinerary');
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');
const router = express.Router();

// @desc    Export itinerary as PDF
// @route   POST /api/pdf/itinerary/:id
// @access  Private
router.post('/itinerary/:id', protect, async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({
      _id: req.params.id,
      userId: req.user.id
    }).populate('userId', 'name email');

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found'
      });
    }

    const pdfBuffer = await pdfService.generateItineraryPDF(itinerary);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="itinerary-${itinerary.title.replace(/[^a-zA-Z0-9]/g, '-')}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);

    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating PDF',
      error: error.message
    });
  }
});

// @desc    Export booking as PDF
// @route   POST /api/pdf/booking/:id
// @access  Private
router.post('/booking/:id', protect, async (req, res) => {
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

    const pdfBuffer = await pdfService.generateBookingPDF(booking);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="booking-${booking.orderNumber}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);

    res.send(pdfBuffer);
  } catch (error) {
    console.error('Booking PDF generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating booking PDF',
      error: error.message
    });
  }
});

// @desc    Generate travel plan PDF
// @route   POST /api/pdf/travel-plan
// @access  Private
router.post('/travel-plan', protect, async (req, res) => {
  try {
    const { planData } = req.body;

    if (!planData) {
      return res.status(400).json({
        success: false,
        message: 'Plan data is required'
      });
    }

    const pdfBuffer = await pdfService.generateTravelPlanPDF(planData, req.user);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="travel-plan-${Date.now()}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);

    res.send(pdfBuffer);
  } catch (error) {
    console.error('Travel plan PDF generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating travel plan PDF',
      error: error.message
    });
  }
});

module.exports = router;
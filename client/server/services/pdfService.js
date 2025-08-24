const puppeteer = require('puppeteer');
const path = require('path');

class PDFService {
  constructor() {
    this.browser = null;
  }

  async initBrowser() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    }
    return this.browser;
  }

  async generateItineraryPDF(itinerary) {
    const browser = await this.initBrowser();
    const page = await browser.newPage();

    const html = this.generateItineraryHTML(itinerary);
    
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      }
    });

    await page.close();
    return pdf;
  }

  async generateBookingPDF(booking) {
    const browser = await this.initBrowser();
    const page = await browser.newPage();

    const html = this.generateBookingHTML(booking);
    
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      }
    });

    await page.close();
    return pdf;
  }

  async generateTravelPlanPDF(planData, user) {
    const browser = await this.initBrowser();
    const page = await browser.newPage();

    const html = this.generateTravelPlanHTML(planData, user);
    
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      }
    });

    await page.close();
    return pdf;
  }

  generateItineraryHTML(itinerary) {
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
    };

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Travel Itinerary - ${itinerary.title}</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                background: #fff;
            }
            
            .header {
                background: linear-gradient(135deg, #059669, #0d9488);
                color: white;
                padding: 30px;
                text-align: center;
                margin-bottom: 30px;
            }
            
            .header h1 {
                font-size: 2.5em;
                margin-bottom: 10px;
            }
            
            .header p {
                font-size: 1.2em;
                opacity: 0.9;
            }
            
            .trip-info {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
                padding: 20px;
                background: #f8f9fa;
                border-radius: 10px;
            }
            
            .info-item {
                text-align: center;
            }
            
            .info-item h3 {
                color: #059669;
                margin-bottom: 5px;
            }
            
            .info-item p {
                font-size: 1.1em;
                font-weight: bold;
            }
            
            .day-section {
                margin-bottom: 40px;
                border: 1px solid #e5e7eb;
                border-radius: 10px;
                overflow: hidden;
            }
            
            .day-header {
                background: #059669;
                color: white;
                padding: 15px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .day-header h2 {
                font-size: 1.5em;
            }
            
            .day-cost {
                font-size: 1.2em;
                font-weight: bold;
            }
            
            .activities {
                padding: 20px;
            }
            
            .activity {
                display: flex;
                align-items: flex-start;
                margin-bottom: 20px;
                padding: 15px;
                background: #f9fafb;
                border-radius: 8px;
                border-left: 4px solid #059669;
            }
            
            .activity-time {
                min-width: 80px;
                font-weight: bold;
                color: #059669;
                margin-right: 15px;
            }
            
            .activity-details {
                flex: 1;
            }
            
            .activity-name {
                font-size: 1.1em;
                font-weight: bold;
                margin-bottom: 5px;
            }
            
            .activity-location {
                color: #6b7280;
                margin-bottom: 5px;
            }
            
            .activity-description {
                color: #4b5563;
                font-size: 0.95em;
            }
            
            .activity-cost {
                min-width: 80px;
                text-align: right;
                font-weight: bold;
                color: #059669;
            }
            
            .total-section {
                background: #f3f4f6;
                padding: 20px;
                border-radius: 10px;
                margin-top: 30px;
                text-align: center;
            }
            
            .total-cost {
                font-size: 2em;
                font-weight: bold;
                color: #059669;
                margin-bottom: 10px;
            }
            
            .footer {
                margin-top: 40px;
                padding: 20px;
                text-align: center;
                color: #6b7280;
                border-top: 1px solid #e5e7eb;
            }
            
            .logo {
                font-size: 1.5em;
                font-weight: bold;
                color: #059669;
                margin-bottom: 5px;
            }
            
            @media print {
                .day-section {
                    page-break-inside: avoid;
                }
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>${itinerary.title}</h1>
            <p>${itinerary.description || 'Your personalized Sri Lankan adventure'}</p>
        </div>
        
        <div class="trip-info">
            <div class="info-item">
                <h3>Duration</h3>
                <p>${itinerary.duration} Days</p>
            </div>
            <div class="info-item">
                <h3>Travelers</h3>
                <p>${itinerary.travelers} People</p>
            </div>
            <div class="info-item">
                <h3>Start Date</h3>
                <p>${formatDate(itinerary.startDate)}</p>
            </div>
            <div class="info-item">
                <h3>Transportation</h3>
                <p>${itinerary.transportation || 'Private Car'}</p>
            </div>
        </div>
        
        ${itinerary.days.map(day => `
            <div class="day-section">
                <div class="day-header">
                    <h2>Day ${day.day} - ${formatDate(day.date)}</h2>
                    <div class="day-cost">${formatCurrency(day.totalCost || 0)}</div>
                </div>
                <div class="activities">
                    ${day.activities.map(activity => `
                        <div class="activity">
                            <div class="activity-time">${activity.startTime}</div>
                            <div class="activity-details">
                                <div class="activity-name">${activity.name}</div>
                                <div class="activity-location">📍 ${activity.location}</div>
                                ${activity.description ? `<div class="activity-description">${activity.description}</div>` : ''}
                            </div>
                            <div class="activity-cost">${formatCurrency(activity.cost || 0)}</div>
                        </div>
                    `).join('')}
                    ${day.notes ? `<div style="margin-top: 15px; padding: 10px; background: #fef3c7; border-radius: 5px; border-left: 4px solid #f59e0b;"><strong>Note:</strong> ${day.notes}</div>` : ''}
                </div>
            </div>
        `).join('')}
        
        <div class="total-section">
            <div class="total-cost">${formatCurrency(itinerary.totalEstimatedCost || 0)}</div>
            <p>Total Estimated Cost for ${itinerary.travelers} travelers</p>
        </div>
        
        <div class="footer">
            <div class="logo">Zentra Travels</div>
            <p>AI-Powered Travel Planning | Generated on ${new Date().toLocaleDateString()}</p>
            <p>Contact: hello@zentratravels.com | +94 11 234 5678</p>
        </div>
    </body>
    </html>
    `;
  }

  generateBookingHTML(booking) {
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
    };

    const getStatusColor = (status) => {
      const colors = {
        confirmed: '#10b981',
        pending: '#f59e0b',
        cancelled: '#ef4444',
        completed: '#3b82f6'
      };
      return colors[status] || '#6b7280';
    };

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Booking Confirmation - ${booking.orderNumber}</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                background: #fff;
            }
            
            .header {
                background: linear-gradient(135deg, #059669, #0d9488);
                color: white;
                padding: 30px;
                text-align: center;
                margin-bottom: 30px;
            }
            
            .header h1 {
                font-size: 2.5em;
                margin-bottom: 10px;
            }
            
            .order-number {
                font-size: 1.3em;
                background: rgba(255,255,255,0.2);
                padding: 10px 20px;
                border-radius: 25px;
                display: inline-block;
                margin-top: 10px;
            }
            
            .booking-info {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            
            .info-card {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 10px;
                border-left: 4px solid #059669;
            }
            
            .info-card h3 {
                color: #059669;
                margin-bottom: 10px;
                font-size: 1.1em;
            }
            
            .info-card p {
                margin-bottom: 5px;
            }
            
            .status-badge {
                display: inline-block;
                padding: 5px 15px;
                border-radius: 20px;
                color: white;
                font-weight: bold;
                text-transform: uppercase;
                font-size: 0.9em;
                background: ${getStatusColor(booking.status)};
            }
            
            .package-details {
                background: #fff;
                border: 1px solid #e5e7eb;
                border-radius: 10px;
                padding: 25px;
                margin-bottom: 30px;
            }
            
            .package-title {
                font-size: 1.5em;
                color: #059669;
                margin-bottom: 15px;
            }
            
            .cost-breakdown {
                background: #f9fafb;
                padding: 20px;
                border-radius: 10px;
                margin-top: 20px;
            }
            
            .cost-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                padding-bottom: 10px;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .cost-item:last-child {
                border-bottom: none;
                font-weight: bold;
                font-size: 1.2em;
                color: #059669;
            }
            
            .footer {
                margin-top: 40px;
                padding: 20px;
                text-align: center;
                color: #6b7280;
                border-top: 1px solid #e5e7eb;
            }
            
            .logo {
                font-size: 1.5em;
                font-weight: bold;
                color: #059669;
                margin-bottom: 5px;
            }
            
            .qr-code {
                text-align: center;
                margin: 20px 0;
                padding: 20px;
                background: #f8f9fa;
                border-radius: 10px;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Booking Confirmation</h1>
            <div class="order-number">Order #${booking.orderNumber}</div>
        </div>
        
        <div class="booking-info">
            <div class="info-card">
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> ${booking.userId.name}</p>
                <p><strong>Email:</strong> ${booking.userId.email}</p>
                <p><strong>Phone:</strong> ${booking.userId.phone}</p>
            </div>
            
            <div class="info-card">
                <h3>Travel Details</h3>
                <p><strong>Destination:</strong> ${booking.destination}</p>
                <p><strong>Start Date:</strong> ${formatDate(booking.startDate)}</p>
                <p><strong>End Date:</strong> ${formatDate(booking.endDate)}</p>
                <p><strong>Travelers:</strong> ${booking.travelers} people</p>
            </div>
            
            <div class="info-card">
                <h3>Booking Status</h3>
                <p><span class="status-badge">${booking.status}</span></p>
                <p><strong>Booked on:</strong> ${formatDate(booking.createdAt)}</p>
                <p><strong>Payment:</strong> ${booking.paymentStatus || 'Pending'}</p>
            </div>
        </div>
        
        <div class="package-details">
            <h2 class="package-title">${booking.packageName}</h2>
            
            ${booking.itinerary && booking.itinerary.length > 0 ? `
                <h3 style="margin: 20px 0 10px 0; color: #374151;">Itinerary Overview</h3>
                ${booking.itinerary.map(day => `
                    <div style="margin-bottom: 15px; padding: 10px; background: #f9fafb; border-radius: 5px;">
                        <strong>Day ${day.day}</strong> - ${formatDate(day.date)}
                        <div style="margin-top: 5px; font-size: 0.9em; color: #6b7280;">
                            ${day.activities.length} activities planned | ${formatCurrency(day.totalCost || 0)}
                        </div>
                    </div>
                `).join('')}
            ` : ''}
            
            ${booking.specialRequests ? `
                <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 5px; border-left: 4px solid #f59e0b;">
                    <strong>Special Requests:</strong><br>
                    ${booking.specialRequests}
                </div>
            ` : ''}
            
            <div class="cost-breakdown">
                <h3 style="margin-bottom: 15px; color: #374151;">Cost Breakdown</h3>
                <div class="cost-item">
                    <span>Package Cost (${booking.travelers} travelers)</span>
                    <span>${formatCurrency(booking.totalCost)}</span>
                </div>
                <div class="cost-item">
                    <span><strong>Total Amount</strong></span>
                    <span><strong>${formatCurrency(booking.totalCost)}</strong></span>
                </div>
            </div>
        </div>
        
        <div class="qr-code">
            <p style="margin-bottom: 10px; color: #6b7280;">Booking Reference QR Code</p>
            <div style="width: 100px; height: 100px; background: #e5e7eb; margin: 0 auto; display: flex; align-items: center; justify-content: center; border-radius: 5px;">
                QR Code
            </div>
            <p style="margin-top: 10px; font-size: 0.9em; color: #6b7280;">Scan for quick access to booking details</p>
        </div>
        
        <div class="footer">
            <div class="logo">Zentra Travels</div>
            <p>AI-Powered Travel Planning | Generated on ${new Date().toLocaleDateString()}</p>
            <p>Contact: hello@zentratravels.com | +94 11 234 5678</p>
            <p style="margin-top: 10px; font-size: 0.9em;">
                Thank you for choosing Zentra Travels. Have a wonderful trip!
            </p>
        </div>
    </body>
    </html>
    `;
  }

  generateTravelPlanHTML(planData, user) {
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
    };

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Travel Plan - ${planData.title || 'Sri Lanka Adventure'}</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                background: #fff;
            }
            
            .header {
                background: linear-gradient(135deg, #059669, #0d9488);
                color: white;
                padding: 30px;
                text-align: center;
                margin-bottom: 30px;
            }
            
            .header h1 {
                font-size: 2.5em;
                margin-bottom: 10px;
            }
            
            .plan-summary {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
                padding: 20px;
                background: #f8f9fa;
                border-radius: 10px;
            }
            
            .summary-item {
                text-align: center;
            }
            
            .summary-item h3 {
                color: #059669;
                margin-bottom: 5px;
            }
            
            .destinations-list {
                background: #fff;
                border: 1px solid #e5e7eb;
                border-radius: 10px;
                padding: 20px;
                margin-bottom: 30px;
            }
            
            .destination-item {
                display: flex;
                align-items: center;
                padding: 10px;
                margin-bottom: 10px;
                background: #f9fafb;
                border-radius: 5px;
            }
            
            .destination-number {
                background: #059669;
                color: white;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 15px;
                font-weight: bold;
            }
            
            .footer {
                margin-top: 40px;
                padding: 20px;
                text-align: center;
                color: #6b7280;
                border-top: 1px solid #e5e7eb;
            }
            
            .logo {
                font-size: 1.5em;
                font-weight: bold;
                color: #059669;
                margin-bottom: 5px;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>${planData.title || 'Your Sri Lanka Travel Plan'}</h1>
            <p>Personalized travel plan for ${user.name}</p>
        </div>
        
        <div class="plan-summary">
            <div class="summary-item">
                <h3>Duration</h3>
                <p>${planData.duration || 'N/A'} Days</p>
            </div>
            <div class="summary-item">
                <h3>Budget</h3>
                <p>${formatCurrency(planData.budget || 0)}</p>
            </div>
            <div class="summary-item">
                <h3>Travelers</h3>
                <p>${planData.travelers || 1} People</p>
            </div>
            <div class="summary-item">
                <h3>Transportation</h3>
                <p>${planData.transportation || 'Private Car'}</p>
            </div>
        </div>
        
        ${planData.selectedDestinations && planData.selectedDestinations.length > 0 ? `
            <div class="destinations-list">
                <h2 style="margin-bottom: 20px; color: #374151;">Selected Destinations</h2>
                ${planData.selectedDestinations.map((dest, index) => `
                    <div class="destination-item">
                        <div class="destination-number">${index + 1}</div>
                        <div>
                            <strong>${dest}</strong>
                        </div>
                    </div>
                `).join('')}
            </div>
        ` : ''}
        
        ${planData.selectedActivities && planData.selectedActivities.length > 0 ? `
            <div class="destinations-list">
                <h2 style="margin-bottom: 20px; color: #374151;">Preferred Activities</h2>
                ${planData.selectedActivities.map(activity => `
                    <div style="padding: 8px 15px; margin-bottom: 8px; background: #f3f4f6; border-radius: 20px; display: inline-block; margin-right: 10px;">
                        ${activity}
                    </div>
                `).join('')}
            </div>
        ` : ''}
        
        <div class="footer">
            <div class="logo">Zentra Travels</div>
            <p>AI-Powered Travel Planning | Generated on ${new Date().toLocaleDateString()}</p>
            <p>Contact: hello@zentratravels.com | +94 11 234 5678</p>
            <p style="margin-top: 15px; font-style: italic;">
                This is your preliminary travel plan. Our AI will generate a detailed itinerary based on your preferences.
            </p>
        </div>
    </body>
    </html>
    `;
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

module.exports = new PDFService();
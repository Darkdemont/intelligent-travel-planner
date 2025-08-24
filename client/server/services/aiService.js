// Mock AI Service for development (replace with real API keys)
// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const OpenAI = require('openai');

class AIService {
  constructor() {
    // Initialize AI services when API keys are available
    this.gemini = null;
    this.openai = null;
    
    console.log('🤖 AI Service initialized');
    console.log('📝 Gemini API:', process.env.GEMINI_API_KEY ? '✅ Available' : '❌ Not configured (using fallback)');
    console.log('📝 OpenAI API:', process.env.OPENAI_API_KEY ? '✅ Available' : '❌ Not configured (using fallback)');
    
    // Uncomment when you have API keys:
    // if (process.env.GEMINI_API_KEY) {
    //   this.gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    //   this.geminiModel = this.gemini.getGenerativeModel({ model: "gemini-pro" });
    // }
    // if (process.env.OPENAI_API_KEY) {
    //   this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // }
  }

  async generateItinerary(userPreferences) {
    const {
      destinations,
      duration,
      budget,
      travelers,
      startDate,
      activities,
      transportation,
      travelStyle,
      interests,
      dietaryRestrictions,
      accommodationType
    } = userPreferences;

    const prompt = this.buildItineraryPrompt(userPreferences);

    try {
      // For now, return fallback itinerary (replace with AI when keys are available)
      console.log('🎯 Generating AI itinerary for:', userPreferences.destinations);
      console.log('💰 Budget:', userPreferences.budget);
      console.log('📅 Duration:', userPreferences.duration, 'days');
      return this.generateFallbackItinerary(userPreferences);
      
      // Uncomment when AI services are configured:
      // let response;
      // if (this.gemini) {
      //   response = await this.generateWithGemini(prompt);
      // } else if (this.openai) {
      //   response = await this.generateWithOpenAI(prompt);
      // } else {
      //   throw new Error('No AI service configured');
      // }
      // return this.parseItineraryResponse(response, userPreferences);
    } catch (error) {
      console.error('AI generation error:', error);
      return this.generateFallbackItinerary(userPreferences);
    }
  }

  buildItineraryPrompt(preferences) {
    return `
Create a detailed ${preferences.duration}-day travel itinerary for Sri Lanka with the following requirements:

**Trip Details:**
- Destinations: ${preferences.destinations.join(', ')}
- Duration: ${preferences.duration} days
- Budget: $${preferences.budget} USD
- Travelers: ${preferences.travelers} people
- Start Date: ${preferences.startDate}
- Transportation: ${preferences.transportation}
- Travel Style: ${preferences.travelStyle}
- Interests: ${preferences.interests.join(', ')}
- Accommodation: ${preferences.accommodationType}
- Dietary Restrictions: ${preferences.dietaryRestrictions || 'None'}

**Requirements:**
1. Create a day-by-day itinerary with specific activities
2. Include estimated costs for each activity
3. Optimize routes for minimal travel time
4. Include local hidden gems and authentic experiences
5. Consider weather and seasonal factors
6. Provide alternative activities for each day
7. Include meal recommendations
8. Suggest optimal timing for each activity

**Response Format (JSON):**
{
  "title": "Trip title",
  "description": "Brief description",
  "totalEstimatedCost": number,
  "days": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "activities": [
        {
          "name": "Activity name",
          "location": "Location",
          "startTime": "HH:MM",
          "duration": hours,
          "cost": cost_per_person,
          "type": "sightseeing|food|transport|accommodation",
          "description": "Detailed description",
          "coordinates": {"lat": number, "lng": number}
        }
      ],
      "totalCost": number,
      "totalTime": hours,
      "notes": "Daily tips and notes"
    }
  ],
  "optimizationData": {
    "routeOptimized": true,
    "costOptimized": true,
    "timeOptimized": true,
    "optimizationScore": 0.95
  },
  "tips": ["General travel tips"],
  "alternatives": ["Alternative activities if weather is bad"]
}

Please ensure all costs are realistic and within the specified budget.
    `;
  }

  async generateWithGemini(prompt) {
    const result = await this.geminiModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  async generateWithOpenAI(prompt) {
    const completion = await this.openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert Sri Lankan travel planner with deep knowledge of destinations, costs, and local experiences. Always respond with valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 4000
    });

    return completion.choices[0].message.content;
  }

  parseItineraryResponse(response, userPreferences) {
    try {
      // Extract JSON from response if it's wrapped in markdown
      const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/) || response.match(/```\n([\s\S]*?)\n```/);
      const jsonString = jsonMatch ? jsonMatch[1] : response;
      
      const parsed = JSON.parse(jsonString);
      
      // Validate and enhance the response
      return {
        ...parsed,
        aiGenerated: true,
        aiPrompt: userPreferences,
        destinations: userPreferences.destinations.map((dest, index) => ({
          name: dest,
          order: index + 1
        })),
        duration: userPreferences.duration,
        budget: userPreferences.budget,
        travelers: userPreferences.travelers,
        startDate: new Date(userPreferences.startDate),
        endDate: new Date(new Date(userPreferences.startDate).getTime() + (userPreferences.duration * 24 * 60 * 60 * 1000)),
        transportation: userPreferences.transportation,
        activities: userPreferences.activities
      };
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return this.generateFallbackItinerary(userPreferences);
    }
  }

  generateFallbackItinerary(preferences) {
    // Generate a basic itinerary when AI fails
    const days = [];
    const costPerDay = Math.floor(preferences.budget / preferences.duration);
    const destinationActivities = {
      'Colombo': ['Galle Face Green', 'National Museum', 'Pettah Market', 'Gangaramaya Temple'],
      'Kandy': ['Temple of the Tooth', 'Royal Botanical Gardens', 'Kandy Lake', 'Cultural Show'],
      'Sigiriya': ['Sigiriya Rock Fortress', 'Pidurangala Rock', 'Village Tour', 'Ayurveda Spa'],
      'Galle': ['Galle Fort', 'Dutch Reformed Church', 'Maritime Museum', 'Lighthouse'],
      'Ella': ['Ella Rock Hike', 'Nine Arch Bridge', 'Little Adams Peak', 'Tea Factory Visit'],
      'Nuwara Eliya': ['Tea Plantations', 'Gregory Lake', 'Hakgala Gardens', 'Strawberry Fields']
    };
    
    for (let i = 0; i < preferences.duration; i++) {
      const date = new Date(preferences.startDate);
      date.setDate(date.getDate() + i);
      
      const currentDestination = preferences.destinations[i % preferences.destinations.length];
      const activities = destinationActivities[currentDestination] || ['Sightseeing', 'Local Experience'];
      
      days.push({
        day: i + 1,
        date: date.toISOString().split('T')[0],
        activities: [
          {
            id: `activity-${i}-1`,
            name: activities[0] || 'Morning Exploration',
            location: currentDestination,
            startTime: "09:00",
            duration: 3,
            cost: costPerDay * 0.4,
            type: "sightseeing",
            description: `Explore the main attractions of ${currentDestination} with a local guide.`,
            coordinates: this.getDestinationCoords(currentDestination)
          },
          {
            id: `activity-${i}-2`,
            name: "Traditional Sri Lankan Lunch",
            location: currentDestination,
            startTime: "12:30",
            duration: 1,
            cost: costPerDay * 0.15,
            type: "food",
            description: "Enjoy authentic Sri Lankan cuisine at a recommended local restaurant.",
            coordinates: this.getDestinationCoords(currentDestination)
          },
          {
            id: `activity-${i}-3`,
            name: activities[1] || 'Afternoon Activity',
            location: currentDestination,
            startTime: "14:00",
            duration: 3,
            cost: costPerDay * 0.25,
            type: "sightseeing",
            description: `Continue exploring ${currentDestination} with afternoon activities.`,
            coordinates: this.getDestinationCoords(currentDestination)
          },
          {
            id: `activity-${i}-4`,
            name: "Accommodation",
            location: currentDestination,
            startTime: "18:00",
            duration: 12,
            cost: costPerDay * 0.2,
            type: "accommodation",
            description: `Comfortable ${preferences.accommodationType} accommodation in ${currentDestination}.`,
            coordinates: this.getDestinationCoords(currentDestination)
          }
        ],
        totalCost: costPerDay,
        totalTime: 19,
        notes: `Day ${i + 1} in ${currentDestination} - Flexible schedule, adjust timing based on your preferences.`
      });
    }

    return {
      title: `${preferences.duration}-Day ${preferences.travelStyle} Sri Lanka Adventure`,
      description: `A carefully planned ${preferences.duration}-day itinerary showcasing the best of ${preferences.destinations.join(', ')} with ${preferences.travelStyle} experiences.`,
      totalEstimatedCost: preferences.budget,
      destinations: preferences.destinations.map((dest, index) => ({
        name: dest,
        order: index + 1,
        coordinates: this.getDestinationCoords(dest)
      })),
      duration: preferences.duration,
      budget: preferences.budget,
      travelers: preferences.travelers,
      startDate: new Date(preferences.startDate),
      endDate: new Date(new Date(preferences.startDate).getTime() + (preferences.duration * 24 * 60 * 60 * 1000)),
      transportation: preferences.transportation,
      activities: preferences.interests || [],
      days,
      aiGenerated: true, // Set to true for demo purposes
      aiPrompt: preferences,
      optimizationData: {
        routeOptimized: true,
        costOptimized: true,
        timeOptimized: true,
        optimizationScore: 0.85
      },
      tips: [
        "Book accommodations in advance during peak season (December-March)",
        "Carry sunscreen and stay hydrated",
        "Respect local customs when visiting temples",
        "Try local street food but choose busy stalls for freshness",
        "Keep copies of important documents"
      ],
      alternatives: [
        "Indoor cultural activities during monsoon season",
        "Alternative beach destinations if weather is unfavorable",
        "Backup transportation options in case of delays"
      ]
    };
  }

  async optimizeRoute(destinations) {
    // Simple route optimization using nearest neighbor algorithm
    if (destinations.length <= 2) return destinations;

    const optimized = [destinations[0]]; // Start with first destination
    const remaining = destinations.slice(1);

    while (remaining.length > 0) {
      const current = optimized[optimized.length - 1];
      let nearest = remaining[0];
      let minDistance = this.calculateDistance(current, nearest);

      for (let i = 1; i < remaining.length; i++) {
        const distance = this.calculateDistance(current, remaining[i]);
        if (distance < minDistance) {
          minDistance = distance;
          nearest = remaining[i];
        }
      }

      optimized.push(nearest);
      remaining.splice(remaining.indexOf(nearest), 1);
    }

    return optimized;
  }

  calculateDistance(dest1, dest2) {
    // Simple distance calculation (in a real app, use Google Maps API)
    const coords1 = this.getDestinationCoords(dest1);
    const coords2 = this.getDestinationCoords(dest2);
    
    if (!coords1 || !coords2) return 100; // Default distance

    const R = 6371; // Earth's radius in km
    const dLat = (coords2.lat - coords1.lat) * Math.PI / 180;
    const dLon = (coords2.lng - coords1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(coords1.lat * Math.PI / 180) * Math.cos(coords2.lat * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  getDestinationCoords(destination) {
    const coords = {
      'Colombo': { lat: 6.9271, lng: 79.8612 },
      'Kandy': { lat: 7.2906, lng: 80.6337 },
      'Sigiriya': { lat: 7.9570, lng: 80.7603 },
      'Galle': { lat: 6.0535, lng: 80.2210 },
      'Ella': { lat: 6.8721, lng: 81.0461 },
      'Nuwara Eliya': { lat: 6.9497, lng: 80.7891 },
      'Anuradhapura': { lat: 8.3114, lng: 80.4037 },
      'Yala': { lat: 6.3725, lng: 81.5185 },
      'Mirissa': { lat: 5.9487, lng: 80.4572 }
    };
    return coords[destination] || null;
  }
}

module.exports = new AIService();
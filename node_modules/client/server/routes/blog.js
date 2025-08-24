const express = require('express');
const BlogPost = require('../models/BlogPost');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

// @desc    Get all blog posts with search and filtering
// @route   GET /api/blog
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Build query
    let query = { isPublished: true };
    
    // Search functionality
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query.$or = [
        { title: searchRegex },
        { excerpt: searchRegex },
        { content: searchRegex },
        { tags: { $in: [searchRegex] } }
      ];
    }
    
    // Filter by category
    if (req.query.category && req.query.category !== 'All') {
      query.category = req.query.category;
    }
    
    // Filter by tags
    if (req.query.tags) {
      const tags = Array.isArray(req.query.tags) ? req.query.tags : [req.query.tags];
      query.tags = { $in: tags };
    }

    // Sort options
    let sort = { publishedAt: -1 };
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'views':
          sort = { views: -1 };
          break;
        case 'likes':
          sort = { likes: -1 };
          break;
        case 'oldest':
          sort = { publishedAt: 1 };
          break;
        default:
          sort = { publishedAt: -1 };
      }
    }

    const posts = await BlogPost.find(query)
      .populate('author', 'name avatar')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select('-content'); // Exclude full content for list view

    const total = await BlogPost.countDocuments(query);

    res.json({
      success: true,
      count: posts.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      posts
    });
  } catch (error) {
    console.error('Get blog posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog posts'
    });
  }
});

// @desc    Get single blog post
// @route   GET /api/blog/:slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ 
      slug: req.params.slug, 
      isPublished: true 
    }).populate('author', 'name avatar');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Increment view count
    post.views += 1;
    await post.save();

    res.json({
      success: true,
      post
    });
  } catch (error) {
    console.error('Get blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog post'
    });
  }
});

// @desc    Get featured blog posts
// @route   GET /api/blog/featured/posts
// @access  Public
router.get('/featured/posts', async (req, res) => {
  try {
    const featuredPosts = await BlogPost.find({ 
      isPublished: true, 
      isFeatured: true 
    })
    .populate('author', 'name avatar')
    .sort({ publishedAt: -1 })
    .limit(3)
    .select('-content');

    res.json({
      success: true,
      posts: featuredPosts
    });
  } catch (error) {
    console.error('Get featured posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured posts'
    });
  }
});

// @desc    Get blog categories
// @route   GET /api/blog/categories/list
// @access  Public
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await BlogPost.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      categories: categories.map(cat => ({
        name: cat._id,
        count: cat.count
      }))
    });
  } catch (error) {
    console.error('Get blog categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog categories'
    });
  }
});

// @desc    Get popular tags
// @route   GET /api/blog/tags/popular
// @access  Public
router.get('/tags/popular', async (req, res) => {
  try {
    const tags = await BlogPost.aggregate([
      { $match: { isPublished: true } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);

    res.json({
      success: true,
      tags: tags.map(tag => ({
        name: tag._id,
        count: tag.count
      }))
    });
  } catch (error) {
    console.error('Get popular tags error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching popular tags'
    });
  }
});

// @desc    Like a blog post
// @route   POST /api/blog/:slug/like
// @access  Public
router.post('/:slug/like', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ 
      slug: req.params.slug, 
      isPublished: true 
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    post.likes += 1;
    await post.save();

    res.json({
      success: true,
      message: 'Post liked successfully',
      likes: post.likes
    });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error liking post'
    });
  }
});

// @desc    Create blog post (admin only)
// @route   POST /api/blog
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const postData = {
      ...req.body,
      author: req.user.id
    };

    const post = await BlogPost.create(postData);
    await post.populate('author', 'name avatar');

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      post
    });
  } catch (error) {
    console.error('Create blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating blog post'
    });
  }
});

// @desc    Update blog post (admin only)
// @route   PUT /api/blog/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'name avatar');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog post updated successfully',
      post
    });
  } catch (error) {
    console.error('Update blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating blog post'
    });
  }
});

// @desc    Delete blog post (admin only)
// @route   DELETE /api/blog/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Delete blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting blog post'
    });
  }
});

module.exports = router;
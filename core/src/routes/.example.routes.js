/**
 * Example Routes Template
 * 
 * Copy this file and rename it to [service].js
 * Replace [Service] with your service name (e.g., users.js)
 */

import express from 'express';
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} from '../controllers/[service]Controller.js';

const router = express.Router();

/**
 * @route   GET /api/[service]
 * @desc    Get all items
 * @access  Public
 */
router.get('/', getAllItems);

/**
 * @route   GET /api/[service]/:id
 * @desc    Get a single item by ID
 * @access  Public
 */
router.get('/:id', getItemById);

/**
 * @route   POST /api/[service]
 * @desc    Create a new item
 * @access  Public
 */
router.post('/', createItem);

/**
 * @route   PUT /api/[service]/:id
 * @desc    Update an item
 * @access  Public
 */
router.put('/:id', updateItem);

/**
 * @route   DELETE /api/[service]/:id
 * @desc    Delete an item
 * @access  Public
 */
router.delete('/:id', deleteItem);

export default router;

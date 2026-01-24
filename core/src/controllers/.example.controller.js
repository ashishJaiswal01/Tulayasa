/**
 * Example Controller Template
 * 
 * Copy this file and rename it to [service]Controller.js
 * Replace [Service] with your service name (e.g., userController.js)
 */

import { getSupabaseClient } from '../../db/connection.js';

/**
 * Get all items
 * @route GET /api/[service]
 */
export async function getAllItems(req, res) {
  try {
    const client = getSupabaseClient();
    
    const response = await fetch(
      `${client.url}/rest/v1/[table_name]?select=*`,
      {
        headers: client.headers
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch items: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ 
      error: 'Failed to fetch items', 
      message: error.message 
    });
  }
}

/**
 * Get a single item by ID
 * @route GET /api/[service]/:id
 */
export async function getItemById(req, res) {
  try {
    const { id } = req.params;
    const client = getSupabaseClient();
    
    const response = await fetch(
      `${client.url}/rest/v1/[table_name]?id=eq.${id}&select=*`,
      {
        headers: client.headers
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch item: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ 
      error: 'Failed to fetch item', 
      message: error.message 
    });
  }
}

/**
 * Create a new item
 * @route POST /api/[service]
 */
export async function createItem(req, res) {
  try {
    // Add validation here
    const { /* field1, field2 */ } = req.body;

    // if (!field1 || !field2) {
    //   return res.status(400).json({ 
    //     error: 'Missing required fields' 
    //   });
    // }

    const client = getSupabaseClient();
    
    const response = await fetch(
      `${client.url}/rest/v1/[table_name]`,
      {
        method: 'POST',
        headers: {
          ...client.headers,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(req.body)
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to create item: ${error}`);
    }

    const data = await response.json();
    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ 
      error: 'Failed to create item', 
      message: error.message 
    });
  }
}

/**
 * Update an item
 * @route PUT /api/[service]/:id
 */
export async function updateItem(req, res) {
  try {
    const { id } = req.params;
    const client = getSupabaseClient();
    
    const response = await fetch(
      `${client.url}/rest/v1/[table_name]?id=eq.${id}`,
      {
        method: 'PATCH',
        headers: {
          ...client.headers,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(req.body)
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to update item: ${error}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ 
      error: 'Failed to update item', 
      message: error.message 
    });
  }
}

/**
 * Delete an item
 * @route DELETE /api/[service]/:id
 */
export async function deleteItem(req, res) {
  try {
    const { id } = req.params;
    const client = getSupabaseClient();
    
    const response = await fetch(
      `${client.url}/rest/v1/[table_name]?id=eq.${id}`,
      {
        method: 'DELETE',
        headers: client.headers
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete item: ${response.statusText}`);
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ 
      error: 'Failed to delete item', 
      message: error.message 
    });
  }
}

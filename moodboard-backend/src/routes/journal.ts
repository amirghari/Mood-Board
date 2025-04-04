// src/routes/journal.ts
import { Router, Request, Response } from 'express';
import pool from '../db';
import { verifyToken } from '../middleware/auth';

const router = Router();

// Get all journal entries for the logged-in user
router.get('/', verifyToken, async (req: Request, res: Response) => {
    try {
      const query = `
        SELECT j.*, u.username, u.name 
        FROM journal_entries j
        JOIN users u ON j.user_id = u.id
        WHERE j.is_private = false
        ORDER BY j.created_at DESC
      `;
      const journals = await pool.query(query);
      res.status(200).json(journals.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// Get all journal entries for the logged-in user
router.get('/user', verifyToken, async (req: Request, res: Response) => {
  const userId = Number((req as any).userId);
  console.log('/user route: userId =', userId, 'type:', typeof userId); // Debug

  try {
    // First verify the user exists
    const userCheck = await pool.query('SELECT id FROM users WHERE id = $1', [userId]);
    if (userCheck.rows.length === 0) {
      console.error('User not found:', userId);
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const query = `
      SELECT j.*, u.username, u.name 
      FROM journal_entries j
      JOIN users u ON j.user_id = u.id
      WHERE j.user_id = $1
      ORDER BY j.created_at DESC
    `;
    const journals = await pool.query(query, [userId]);
    res.status(200).json(journals.rows);
  } catch (error: any) {

    res.status(500).json({ 
      message: 'Server error',
      details: error.message 
    });
  }
});

// Get a specific journal entry by ID
router.get('/:id', verifyToken, async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const journal = await pool.query('SELECT * FROM journal_entries WHERE id = $1', [id]);
        if (journal.rows.length === 0) {
            res.status(404).json({ message: 'Journal entry not found' });
            return;
        }
        res.status(200).json(journal.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new journal entry
router.post('/', verifyToken, async (req: Request, res: Response) => {
    // Now that verifyToken is attached, req.userId should contain the correct user id
    const userId = (req as any).userId;
    const { title, mood, entry_text, is_private } = req.body;
    console.log('Journal POST: Received values:', { userId, title, mood, entry_text, is_private });
    
    try {
      const newJournal = await pool.query(
        'INSERT INTO journal_entries (user_id, title, mood, entry_text, is_private) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [userId, title, mood, entry_text, is_private]
      );
      console.log('Journal POST: Insert successful:', newJournal.rows[0]);
      res.status(201).json(newJournal.rows[0]);
    } catch (error: any) {
      console.error('Journal POST: Server error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

// Update a journal entry
router.put('/:id', verifyToken, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, mood, entry_text } = req.body;
    try {
        const updatedJournal = await pool.query(
            'UPDATE journal_entries SET title = $1, mood = $2, entry_text = $3 WHERE id = $4 RETURNING *',
            [title, mood, entry_text, id]
        );
        if (updatedJournal.rows.length === 0) {
            res.status(404).json({ message: 'Journal entry not found' });
            return;
        }
        res.status(200).json(updatedJournal.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a journal entry
router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedJournal = await pool.query(
            'DELETE FROM journal_entries WHERE id = $1 RETURNING *',
            [id]
        );
        if (deletedJournal.rows.length === 0) {
            res.status(404).json({ message: 'Journal entry not found' });
            return;
        }
        res.status(200).json({ message: 'Journal entry deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
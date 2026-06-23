import 'dotenv/config'; 
import express, { Request, Response } from 'express';
import cors from 'cors';
// 1. IMPORT YOUR SINGLETON
import { prisma } from './lib/prisma'; 

const app = express();
const PORT = process.env.PORT || 5000;

// DEVELOPMENT & PRODUCTION SAFE
const ALLOWED_ORIGIN = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({
  origin: ALLOWED_ORIGIN,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// ==========================================
// 1. EMPLOYEE ENDPOINTS
// ==========================================
app.get('/api/employees', async (req: Request, res: Response) => {
  try {
    const employees = await prisma.employee.findMany({
      include: { manager: true, subordinates: true }
    });
    res.json(employees);
  } catch (error) {
    console.error('Fetch employees error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/employees', async (req: Request, res: Response) => {
  try {
    const newEmployee = await prisma.employee.create({
      data: req.body
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Create employee error:', error);
    res.status(400).json({ error: 'Invalid data provided' });
  }
});

// ==========================================
// 2. TASK / PENDING ACTION ENDPOINTS
// ==========================================
app.get('/api/tasks', async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.error('Fetch tasks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/api/tasks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: req.body
    });
    res.json(updatedTask);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(400).json({ error: 'Failed to update task' });
  }
});

// ==========================================
// 3. INBOX / NOTIFICATION ENDPOINTS
// ==========================================
app.get('/api/inbox', async (req: Request, res: Response) => {
  try {
    const messages = await prisma.inboxMessage.findMany({
      orderBy: { id: 'desc' }
    });
    res.json(messages);
  } catch (error) {
    console.error('Fetch inbox error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/api/inbox/:id/read', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedMessage = await prisma.inboxMessage.update({
      where: { id: Number(id) },
      data: { unread: false }
    });
    res.json(updatedMessage);
  } catch (error) {
    console.error('Update inbox error:', error);
    res.status(400).json({ error: 'Failed to update message status' });
  }
});

// ==========================================
// 4. CALENDAR EVENT ENDPOINTS
// ==========================================
app.get('/api/events', async (req: Request, res: Response) => {
  try {
    const events = await prisma.calendarEvent.findMany();
    res.json(events);
  } catch (error) {
    console.error('Fetch events error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running securely on port ${PORT}`);
});
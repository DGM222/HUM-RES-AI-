import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ==========================================
// 1. EMPLOYEE ENDPOINTS
// ==========================================

// Get all employees
app.get('/api/employees', async (req: Request, res: Response) => {
  try {
    const employees = await prisma.employee.findMany({
      include: { manager: true, subordinates: true }
    });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// Create a new employee
app.post('/api/employees', async (req: Request, res: Response) => {
  try {
    const newEmployee = await prisma.employee.create({
      data: req.body
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create employee' });
  }
});

// ==========================================
// 2. TASK / PENDING ACTION ENDPOINTS
// ==========================================

// Get all tasks
app.get('/api/tasks', async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Update a task (e.g., mark as completed)
app.patch('/api/tasks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: req.body
    });
    res.json(updatedTask);
  } catch (error) {
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
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Mark message as read
app.patch('/api/inbox/:id/read', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedMessage = await prisma.inboxMessage.update({
      where: { id: Number(id) },
      data: { unread: false }
    });
    res.json(updatedMessage);
  } catch (error) {
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
    res.status(500).json({ error: 'Failed to fetch calendar events' });
  }
});

// ==========================================
// 5. DATABASE SEED / MOCK INITIALIZER
// ==========================================
// Call this endpoint once from your browser or postman to populate sample data!
app.post('/api/seed', async (req: Request, res: Response) => {
  try {
    // Clear existing records
    await prisma.task.deleteMany();
    await prisma.inboxMessage.deleteMany();
    await prisma.calendarEvent.deleteMany();
    await prisma.employee.deleteMany();

    // Seed Initial Employees
    const manager = await prisma.employee.create({
      data: {
        name: 'Sarah Jenkins',
        email: 'sarah.j@company.com',
        role: 'HR Director',
        department: 'Human Resources',
        performanceScore: 4.8,
        status: 'Active',
        joinDate: '2022-01-15',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        location: 'New York'
      }
    });

    await prisma.employee.create({
      data: {
        name: 'Alex Rivera',
        email: 'alex.r@company.com',
        role: 'Software Engineer',
        department: 'Engineering',
        performanceScore: 4.2,
        status: 'Active',
        joinDate: '2024-03-10',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        location: 'Remote',
        managerId: manager.id
      }
    });

    // Seed Core Tasks
    await prisma.task.createMany({
      data: [
        { title: 'Review Q2 Performance Logs', assignedTo: 'Sarah Jenkins', status: 'Pending', dueDate: '2026-06-25', urgency: 'high', type: 'performance' },
        { title: 'Approve Leave Request - Alex', assignedTo: 'Sarah Jenkins', status: 'Pending', dueDate: '2026-06-24', urgency: 'medium', type: 'approval' }
      ]
    });

    // Seed Inbox Messages
    await prisma.inboxMessage.createMany({
      data: [
        { sender: 'System Notification', senderRole: 'Automated', content: 'Database integration complete via agy workspace pipeline.', time: 'Just Now', unread: true, avatar: '' }
      ]
    });

    // Seed Calendar
    await prisma.calendarEvent.createMany({
      data: [
        { title: 'Engineering Synced Status', type: 'Meeting', date: '2026-06-24', time: '10:00 AM', attendee: 'Alex Rivera', daysUntil: 1 }
      ]
    });

    res.json({ message: 'Database successfully populated with clean mock entries!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database seeding execution failed' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 HRM API backend running at http://localhost:${PORT}`);
});
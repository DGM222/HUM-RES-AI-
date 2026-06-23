import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding isolation execution...');

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
      { sender: 'System Notification', senderRole: 'Automated', content: 'Database integration complete via secure workspace pipeline.', time: 'Just Now', unread: true, avatar: '' }
    ]
  });

  // Seed Calendar
  await prisma.calendarEvent.createMany({
    data: [
      { title: 'Engineering Synced Status', type: 'Meeting', date: '2026-06-24', time: '10:00 AM', attendee: 'Alex Rivera', daysUntil: 1 }
    ]
  });

  console.log('✅ Database successfully populated with secure mock entries!');
}
main()
  .catch((e) => {
    console.error('❌ Seeding execution failed:', e);
    throw e; // <-- Simple throw instead of process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
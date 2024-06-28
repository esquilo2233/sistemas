const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function clearTables() {
    try {
      await prisma.congressNumber.deleteMany({});
      await prisma.extra.deleteMany({});
      await prisma.senator.deleteMany({});
  
      console.log('Tables cleared successfully');
    } catch (error) {
      console.error('Error clearing tables:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  clearTables();
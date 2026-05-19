const cron = require('node-cron');

const prisma = require('../config/prisma');

const runOverdueJob = () => {
  cron.schedule('0 0 * * *', async () => {

    const now = new Date();

    await prisma.borrow.updateMany({
      where: {
        status: 'active',

        returnDate: {
          lt: now,
        },
      },

      data: {
        status: 'overdue',
      },
    });

    console.log(
      'Overdue job executed'
    );
  });
};

module.exports = runOverdueJob;
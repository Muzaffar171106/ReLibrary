require('dotenv').config();

const app = require('./app');

const runOverdueJob = require(
  './jobs/overdue.job'
);

const PORT = process.env.PORT || 3000;

runOverdueJob();

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
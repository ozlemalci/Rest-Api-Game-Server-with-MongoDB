module.exports = (app) => {
    const jobs = require('../controllers/job.controller.js');
    app.get('/jobs', jobs.findAll);
    app.post('/jobs', jobs.create);
    app.get('/jobs/:jobId', jobs.findOne);
    app.delete('/jobs/deleteAll', jobs.deleteAll);
    app.delete('/jobs/:jobId', jobs.delete);
}

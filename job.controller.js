const Job = require('../models/job.model.js');
const mongoose = require('mongoose');


exports.findAll = (req, res) => {
    Job.find()
    .then(jobs => {
        res.send(jobs);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Hata oluştu"
        });
    });
};


exports.create = (req, res) => {
    const job = new Job({
        id:req.body.id,
        title:req.body.title,
        information:req.body.information
        
    });

   job.save()
    .then(data => {
        res.status(200).json({
            success: 'New item has been created'
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.findOne = (req, res) => {
    Job.findById(req.params.jobId)
    .then(job => {
        if(!job) {
            return res.status(404).send({
                message: "Not Found" + req.params.jobId
            });            
        }
        res.send(job);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Not found with id " + req.params.jobId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving item with id " + req.params.jobId
        });
    });
};


exports.deleteAll = (req, res) => {
    Job.deleteMany({})
    .then(() => {
        res.send({message: "Jobs deleted successfully!"});
    }).catch(err => {
        return res.status(500).send({
            message: "Could not delete jobs"
        });
    });
};


exports.delete = (req, res) => {
    Job.findByIdAndRemove(req.params.jobId)
    .then(job => {
        if(!job) {
            return res.status(404).send({
                message: "Job not found with id " + req.params.jobId
            });
        }
        res.send({message: "Job deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Job not found with id " + req.params.jobId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Job with id " + req.params.jobId
        });
    });
};


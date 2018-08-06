var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    name: {type: String},
    alias: {type: String},
    githubUrl: {type: String},
    
    
    description: {type: String},
    createAt: {type: Date},
    updatedAt: {type: Date, default: Date.now }
});


module.exports = mongoose.model('Project', projectSchema);
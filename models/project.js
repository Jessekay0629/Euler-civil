const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    mainImage: { type: String, required: true }, // URL or file path of the display image
    projectType: { type: String, enum: ['Residential', 'Commercial', 'Industrial'], required: true },
    projectName: { type: String, required: true },
    location: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    services: { type: [String], required: true }, // Array of services provided
    overview: { type: String, required: true },
    projectImages: { type: [String], required: true } // Array of image URLs/paths
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;

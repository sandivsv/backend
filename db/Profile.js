const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: String,
    company: String,
    job: String,
    salary: String
});

module.exports = mongoose.model("profile", profileSchema);
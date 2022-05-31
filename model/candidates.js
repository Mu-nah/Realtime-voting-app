const mongoose = require('mongoose')
const candidateSchema = new mongoose.Schema({
  
  image:{ type: String, required: false},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
    party: {type: String, required: true},
    logo: {type: String, required: true},
}, {timestamps: true})


module.exports = mongoose.model('Candidate', candidateSchema);
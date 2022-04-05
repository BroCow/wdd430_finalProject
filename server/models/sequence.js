const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    
    maxClassId: {type: Number}
});

module.exports = mongoose.model('Sequence', sequenceSchema);
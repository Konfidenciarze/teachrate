const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    teacher: {type: Schema.Types.ObjectId, ref: 'Teacher'},
    rater: {type: Schema.Types.ObjectId, ref: 'User'},
    data: {type: Date, default: Date.now},
    material: {type: Number, required: true},
    punctual: {type: Number, required: true},
    passing: {type: Number, required: true},
    comment: {type: String, default: ''},
    tier: {type: Number, default: 1}
});

module.exports = mongoose.model('Rating', RatingSchema);
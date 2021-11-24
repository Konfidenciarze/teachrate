const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
    pref: {type: String, required: true},
    data: {type: String, required: true},
    post: {type: String, default: ''},
    position: {type: String, required: true},
    faculty: {type: String, required: true},
    img: {type: String, required: true}
});

module.exports = mongoose.model('Teacher', TeacherSchema);
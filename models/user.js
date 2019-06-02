var moment = require('moment');
var mongoose = require('mongoose');
require('mongoose-type-email');

var Schema = mongoose.Schema;


var UserSchema = new Schema(
    {
    first_name: {type: String, required: true, max: 100},
    last_name: {type: String, required: true, max: 100},
    email: {type: mongoose.SchemaTypes.Email, required: true},
    gender: {type: String, required: true, enum: ['Male', 'Female'], default: 'Male'},
    date_of_birth: {type: Date},
    password: {type: String, required: true, max: 100}
    }
);

UserSchema
.virtual('username')
.get(function () {
    return this.first_name + ' ' + this.last_name;
});

UserSchema
.virtual('age')
.get(function () {
    return moment().year() - moment(this.date_of_birth).year;
});

module.exports = mongoose.model('User', UserSchema);
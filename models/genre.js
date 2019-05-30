//Setting up the Genre model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//The Schema
var GenreSchema = new Schema(
    {
    name: {type: String, required: true, min: 3, max: 100},
    }
);

//The Virtual
GenreSchema
.virtual('url')
.get(function(){
    return '/catalog/genre/' + this._id;
});

//Exporting model
module.exports = mongoose.model('Genre', GenreSchema);
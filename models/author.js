//Schema for the author model
var moment = require('moment');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        family_name: {type: String, required: true, max: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date},
    }
);

//The virtual property below helps us get the author's full name
AuthorSchema
.virtual('name')
.get(function () {
    return this.family_name + ', ' + this.first_name;
});

//Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
    if (this.date_of_birth == null && this.date_of_death == null) {
        return 'Lifespan cannot be calculated';
    } else if (this.date_of_birth == null || this.date_of_death == null) {
        return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
    };
    return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString() + ' years';
});

//Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
    return '/catalog/author/' + this._id;
});

//Virtual for formatted date of birth
AuthorSchema
.virtual('date_of_birth_formatted')
.get(function () {
    return this.date_of_birth ? moment(this.date_of_birth).format('MMMM Do, YYYY') : 'Date of Birth Not Available';
});

//Virtual for formatted date of death
AuthorSchema
.virtual('date_of_death_formatted')
.get(function () {
    return this.date_of_death ? moment(this.date_of_death).format('MMMM Do, YYYY') : 'Date of Death Not Available';
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
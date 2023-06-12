const mongoose = require("mongoose");

const personSchema = mongoose.Schema({
  name: {type: String,required:true},
  age: Number,
  favoriteFoods:[String],
});

const Person = mongoose.model('Person', personSchema);
module.exports = Person;
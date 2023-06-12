const express = require("express");
const router = express.Router();
const Person = require("../models/personSchema");

//@DESCRIPTION: Create Many Records with POST Method
//to pass test using Postman choose POST then input exp: http://localhost:5000/api/users
router.post("/users", async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    await newPerson.save();
    res.status(200).json({ msg: "success", newPerson });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//@DESCRIPTION: Use model.find() to Search the Database
//to pass test using Postman choose GET then input exp: http://localhost:5000/api/users

router.get("/users", async (req, res) => {
  try {
    const newPerson = await Person.find();
    res.status(200).json({ msg: "success", newPerson });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//@DESCRIPTION:Using model.findOne() to Return a Single Matching Document from Your Database
//to pass test using Postman choose GET then input exp: http://localhost:5000/api/users/food?favoriteFoods=steak
router.get("/users/food", async (req, res) => {
  try {
    const { favoriteFoods } = req.query; // Assuming the name is passed as a query parameter
    
    const person = await Person.findOne({ favoriteFoods: favoriteFoods });
    if (!person) {
      return res.status(404).json({ msg: "Person not found" });
    }

    res.status(200).json({ msg: "Success", person });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
//@DESCRIPTION:Using model.findById() to Search The Database By _id
//to pass test using Postman choose GET then input exp: http://localhost:5000/api/users/6480895edc539fe639ece75a
router.get("/users/:id", async (req, res) => {
  try {
    const newPerson = await Person.findById(req.params.id);
    if (!newPerson) return res.status(404).json({ msg: "Person not found" });
    res.status(200).json({ msg: "found by id", newPerson });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//@DESCRIPTION: Perform Classic Updates by Running Find, Edit, then Save
//to pass test using Postman choose GET then input exp: http://localhost:5000/api/users/addFood/6480895edc539fe639ece75a

router.get("/users/addFood/:id", async (req, res) => {
  try {

    const newPerson = await Person.findById(req.params.id);
    if (!newPerson) {
      return res.status(404).json({ msg: "Person not found" });
    }

    newPerson.favoriteFoods.push("hamburger");
    newPerson.save();

    res.status(200).json({ msg: "Success", newPerson });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


//@DESCRIPTION:Perform New Updates on a Document Using model.findOneAndUpdate()
router.put("/users/:id", async (req, res) => {
  try {
    const newPerson = await Person.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body }
    );

    res
      .status(200)
      .json({ msg: "updated", newPerson: { ...newPerson._id, ...req.body } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//@DESCRIPTION:Delete One Document Using model.findByIdAndDelete
router.delete("/users/id/:id", async (req, res) => {
  try {
    const newPerson = await Person.findOneAndDelete({ _id: req.params.id });
    if (!newPerson) {
      return res.status(404).json({ msg: "Person not found" });
    }
    res.status(200).json({ msg: "deleted", newPerson });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//@DESCRIPTION: MongoDB and Mongoose - Delete Many Documents with model.remove()
router.delete("/users/delete", async (req, res) => {
  try {
    const { name } = req.query;
    const newPerson = await Person.deleteMany({name: name});;
    if (!newPerson) {
      return res.status(404).json({ msg: "Person not found" });
    }
    res.status(200).json({ msg: "deleted", newPerson });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;

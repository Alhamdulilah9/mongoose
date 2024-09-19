const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected!"))
  .catch(err => console.error("Connection error:", err));


  const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
  });
  
  const Person = mongoose.model('Person', personSchema);

  
  const createAndSavePerson = (done) => {
    const person = new Person({
      name: "John",
      age: 30,
      favoriteFoods: ["Pizza", "Pasta"]
    });
  
    person.save((err, data) => {
      if (err) return done(err);
      done(null, data);
    });
  };

  
  const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, data) => {
      if (err) return done(err);
      done(null, data);
    });
  };

  
  const findPeopleByName = (personName, done) => {
    Person.find({ name: personName }, (err, data) => {
      if (err) return done(err);
      done(null, data);
    });
  };

  
  const findOneByFood = (food, done) => {
    Person.findOne({ favoriteFoods: food }, (err, data) => {
      if (err) return done(err);
      done(null, data);
    });
  };

  
  const findPersonById = (personId, done) => {
    Person.findById(personId, (err, data) => {
      if (err) return done(err);
      done(null, data);
    });
  };

  const findEditThenSave = (personId, done) => {
    Person.findById(personId, (err, person) => {
      if (err) return done(err);
      
      person.favoriteFoods.push("Hamburger");
      
      person.save((err, updatedPerson) => {
        if (err) return done(err);
        done(null, updatedPerson);
      });
    });
  };

  
  const findAndUpdate = (personName, done) => {
    const ageToSet = 20;
    
    Person.findOneAndUpdate(
      { name: personName },
      { age: ageToSet },
      { new: true },
      (err, updatedPerson) => {
        if (err) return done(err);
        done(null, updatedPerson);
      }
    );
  };

  
  const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, removedPerson) => {
      if (err) return done(err);
      done(null, removedPerson);
    });
  };

  
  const removeManyPeople = (done) => {
    Person.remove({ name: "Mary" }, (err, result) => {
      if (err) return done(err);
      done(null, result);
    });
  };

  
  const queryChain = (done) => {
    Person.find({ favoriteFoods: "burritos" })
      .sort({ name: 1 })
      .limit(2)
      .select("-age")
      .exec((err, data) => {
        if (err) return done(err);
        done(null, data);
      });
  };
  
  
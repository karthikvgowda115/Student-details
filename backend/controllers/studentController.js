const Student = require("../models/Student");


// GET students
exports.getStudents = async (req, res) => {

  const students = await Student.find();

  res.json(students);

};


// ADD student
exports.addStudent = async (req, res) => {

  const { name, email, age } = req.body;

  const newStudent = new Student({
    name,
    email,
    age
  });

  const savedStudent = await newStudent.save();

  res.json(savedStudent);

};


// UPDATE student
exports.updateStudent = async (req, res) => {

  const { id } = req.params;

  const { name, email, age } = req.body;

  const updatedStudent = await Student.findByIdAndUpdate(
    id,
    { name, email, age },
    { new: true }
  );

  res.json(updatedStudent);

};


// DELETE student
exports.deleteStudent = async (req, res) => {

  const { id } = req.params;

  await Student.findByIdAndDelete(id);

  res.json({ message: "Student deleted" });

};
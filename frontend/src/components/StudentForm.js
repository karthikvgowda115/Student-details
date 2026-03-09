import React, { useState, useEffect } from "react";

function StudentForm({ addStudent, editStudent, updateStudent }) {

  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: ""
  });

  useEffect(() => {
    if (editStudent) {
      setStudent(editStudent);
    }
  }, [editStudent]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!student.name || !student.email || !student.age) {
      alert("All fields required");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(student.email)) {
      alert("Invalid email");
      return;
    }

    if (editStudent) {
      updateStudent(student);
    } else {
      addStudent(student);
    }

    setStudent({
      name: "",
      email: "",
      age: ""
    });
  };

  return (

    <div className="form-box">

     <h3>{editStudent ? "Edit Student Details" : "Add Student Details"}</h3>

      <form onSubmit={handleSubmit} className="student-form">

        <div className="form-row">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={student.age}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          {editStudent ? "Update Student" : "Submit"}
        </button>

      </form>

    </div>

  );
}

export default StudentForm;
import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import Swal from "sweetalert2";
import "./App.css";

function App() {

  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const API = "https://student-details-backend-hz9x.onrender.com";

  useEffect(() => {
    fetchStudents();
  }, []);

  // GET students
  const fetchStudents = async () => {
    try {
      const res = await axios.get(API);

      // sort by name
      const sorted = res.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setStudents(sorted);

    } catch (error) {
      console.log(error);
    }
  };

  // ADD student
  const addStudent = async (student) => {
    try {
      const res = await axios.post(API, student);
      setStudents([...students, res.data]);

      Swal.fire({
        title: "Success!",
        text: "Student added successfully",
        icon: "success",
        confirmButtonColor: "#4CAF50"
      });

    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE student
  const updateStudent = async (student) => {
    try {

      await axios.put(`${API}/${student._id}`, student);

      setStudents(
        students.map((s) =>
          s._id === student._id ? student : s
        )
      );

      setEditStudent(null);

      Swal.fire({
        title: "Updated!",
        text: "Student details updated successfully",
        icon: "success",
        confirmButtonColor: "#2196F3"
      });


    } catch (error) {
      console.log(error);
    }
  };

  // DELETE student
  const deleteStudent = async (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {

      if (result.isConfirmed) {

        await axios.delete(`${API}/${id}`);

        setStudents(
          students.filter((s) => s._id !== id)
        );

        Swal.fire(
          "Deleted!",
          "Student has been deleted.",
          "success"
        );

      }

    });
  };

  // Pagination logic
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;

  const currentStudents = students.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(students.length / studentsPerPage);

  return (

    <div className="main-container">

      {/* TOP HALF */}
      <div className="top-section">

        <h2 className="main-title">Student Management</h2>

        <StudentForm
          addStudent={addStudent}
          editStudent={editStudent}
          updateStudent={updateStudent}
        />

      </div>

      {/* BOTTOM HALF */}
      <div className="bottom-section">

        <h2>Student List</h2>

        <StudentTable
          students={currentStudents}
          deleteStudent={deleteStudent}
          setEditStudent={setEditStudent}
        />

        {/* Pagination */}
        <div className="pagination">

          {[...Array(totalPages)].map((_, i) => (

            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>

          ))}

        </div>

      </div>

    </div>

  );
}

export default App;

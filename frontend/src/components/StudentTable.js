import React from "react";

function StudentTable({ students, deleteStudent, setEditStudent }) {

  return (

    <table border="1" width="100%">

      <thead>

        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>

      </thead>

      <tbody>

        {students.map((s) => (

          <tr key={s._id}>

            <td>{s.name}</td>
            <td>{s.email}</td>
            <td>{s.age}</td>

            <td>

              <button onClick={() => setEditStudent(s)}>
                Edit
              </button>

              <button
                onClick={() => deleteStudent(s._id)}
                style={{marginLeft:"10px"}}
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  );
}

export default StudentTable; 
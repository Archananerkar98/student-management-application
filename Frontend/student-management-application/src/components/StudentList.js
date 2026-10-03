import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StudentService from "../services/StudentServices";

function StudentList() {

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {

    try {

      const response =
        await StudentService.getStudents();

      setStudents(response.data);

    } catch (error) {

      console.error(
        "Error loading students:",
        error
      );

      alert("Unable to load students.");

    } finally {

      setLoading(false);

    }
  };

  const deleteStudent = async (id) => {

    if (
      !window.confirm(
        "Are you sure you want to delete this student?"
      )
    ) {
      return;
    }

    try {

      await StudentService.deleteStudent(id);

      setStudents((previousStudents) =>
        previousStudents.filter(
          (student) =>
            String(student.id) !== String(id)
        )
      );

    } catch (error) {

      console.error("Delete failed:", error);

      alert("Failed to delete student.");

    }
  };

  return (

    <div className="dashboard-background">

      <nav className="navbar dashboard-navbar">

        <div className="container">

          <Link
            to="/"
            className="navbar-brand text-white fw-bold"
          >
            <span className="brand-icon">
              S
            </span>
            StudentHub
          </Link>

          <Link
            to="/"
            className="btn btn-outline-light btn-sm"
          >
            Dashboard
          </Link>

        </div>

      </nav>


      <div className="container py-5">

        <div className="dashboard-title">

          <div>

            <p className="text-uppercase small fw-bold text-primary mb-1">
              Management
            </p>

            <h1>
              Students
            </h1>

            <p className="text-muted">
              View and manage all registered students.
            </p>

          </div>

          <Link
            to="/add"
            className="btn btn-primary btn-lg"
          >
            + Add Student
          </Link>

        </div>


        <div className="student-card">

          {loading ? (

            <div className="empty-state">

              <div className="spinner-border text-primary" />

              <p className="mt-3">
                Loading students...
              </p>

            </div>

          ) : students.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                👨‍🎓
              </div>

              <h5>
                No students found
              </h5>

              <Link
                to="/add"
                className="btn btn-primary"
              >
                Add Student
              </Link>

            </div>

          ) : (

            <div className="table-responsive">

              <table className="table professional-table">

                <thead>

                  <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th className="text-end">
                      Actions
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {students.map((student) => (

                    <tr key={student.id}>

                      <td>
                        #{student.id}
                      </td>

                      <td>

                        <div className="student-name">

                          <div className="avatar">
                            {student.name
                              ?.charAt(0)
                              .toUpperCase()}
                          </div>

                          <strong>
                            {student.name}
                          </strong>

                        </div>

                      </td>

                      <td>
                        {student.email}
                      </td>

                      <td>

                        <span className="course-badge">
                          {student.course}
                        </span>

                      </td>

                      <td className="text-end">

                        <Link
                          to={`/edit/${student.id}`}
                          className="btn btn-sm btn-outline-primary me-2"
                        >
                          Edit
                        </Link>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            deleteStudent(student.id)
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default StudentList;
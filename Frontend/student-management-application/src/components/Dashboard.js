import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StudentService from "../services/StudentServices";

function Dashboard() {

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {

    try {

      setLoading(true);

      const response = await StudentService.getStudents();

      setStudents(response.data);

      setError("");

    } catch (error) {

      console.error("Error loading students:", error);

      setError(
        "Unable to connect to backend. Make sure Spring Boot is running on port 8080."
      );

    } finally {

      setLoading(false);

    }
  };

  const deleteStudent = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) {
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

  const coursesCount =
    new Set(
      students.map((student) => student.course)
    ).size;

  const activeEnrollments = students.length;

  return (

    <div className="dashboard-background">

      {/* NAVBAR */}

      <nav className="navbar navbar-expand-lg dashboard-navbar">

        <div className="container">

          <Link
            to="/"
            className="navbar-brand text-white fw-bold"
          >
            <span className="brand-icon">S</span>
            StudentHub
          </Link>

          <div className="d-flex gap-2">

            <Link
              to="/"
              className="btn btn-light btn-sm"
            >
              Dashboard
            </Link>

            <Link
              to="/students"
              className="btn btn-outline-light btn-sm"
            >
              Students
            </Link>

          </div>

        </div>

      </nav>


      {/* MAIN */}

      <main className="container py-5">

        {/* HEADER */}

        <div className="dashboard-title">

          <div>

            <p className="text-uppercase small fw-bold text-primary mb-1">
              Student Management
            </p>

            <h1>
              Dashboard
            </h1>

            <p className="text-muted">
              Manage students, courses and enrollments.
            </p>

          </div>

          <Link
            to="/add"
            className="btn btn-primary btn-lg"
          >
            + Add Student
          </Link>

        </div>


        {/* ERROR */}

        {error && (

          <div className="alert alert-danger shadow-sm">

            {error}

          </div>

        )}


        {/* STAT CARDS */}

        <div className="row g-4 mb-5">

          <div className="col-md-4">

            <div className="stat-card">

              <div className="stat-icon primary">
                👨‍🎓
              </div>

              <div>

                <p className="stat-label">
                  Total Students
                </p>

                <h2>
                  {students.length}
                </h2>

              </div>

            </div>

          </div>


          <div className="col-md-4">

            <div className="stat-card">

              <div className="stat-icon success">
                📚
              </div>

              <div>

                <p className="stat-label">
                  Courses Offered
                </p>

                <h2>
                  {coursesCount}
                </h2>

              </div>

            </div>

          </div>


          <div className="col-md-4">

            <div className="stat-card">

              <div className="stat-icon warning">
                ✓
              </div>

              <div>

                <p className="stat-label">
                  Active Enrollments
                </p>

                <h2>
                  {activeEnrollments}
                </h2>

              </div>

            </div>

          </div>

        </div>


        {/* STUDENT TABLE */}

        <div className="student-card">

          <div className="student-card-header">

            <div>

              <h4>
                Recent Students
              </h4>

              <p>
                All registered students
              </p>

            </div>

            <Link
              to="/students"
              className="btn btn-outline-primary"
            >
              View All
            </Link>

          </div>


          {loading ? (

            <div className="empty-state">

              <div className="spinner-border text-primary" />

              <p>
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

              <p>
                Start by adding your first student.
              </p>

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
                        <span className="student-id">
                          #{student.id}
                        </span>
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
                          type="button"
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

      </main>

    </div>
  );
}

export default Dashboard;
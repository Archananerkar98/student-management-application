import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentService from "../services/StudentServices";

function AddStudent() {

  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: ""
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });

  };

  const saveStudent = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      await StudentService.addStudent(student);

      navigate("/");

    } catch (error) {

      console.error("Error adding student:", error);

      setError(
        "Unable to add student. Please check that the backend is running."
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="page-background">

      <div className="container py-5">

        <div className="row justify-content-center">

          <div className="col-lg-7">

            <div className="card professional-card">

              <div className="card-header professional-header">

                <div>
                  <h3 className="mb-1">
                    Add New Student
                  </h3>

                  <p className="mb-0">
                    Enter student information below
                  </p>
                </div>

              </div>

              <div className="card-body p-4">

                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                <form onSubmit={saveStudent}>

                  <div className="mb-3">

                    <label className="form-label">
                      Student Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={student.name}
                      onChange={handleChange}
                      className="form-control form-control-lg"
                      placeholder="Enter student name"
                      required
                    />

                  </div>

                  <div className="mb-3">

                    <label className="form-label">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={student.email}
                      onChange={handleChange}
                      className="form-control form-control-lg"
                      placeholder="student@example.com"
                      required
                    />

                  </div>

                  <div className="mb-4">

                    <label className="form-label">
                      Course
                    </label>

                    <input
                      type="text"
                      name="course"
                      value={student.course}
                      onChange={handleChange}
                      className="form-control form-control-lg"
                      placeholder="Enter course"
                      required
                    />

                  </div>

                  <div className="d-flex gap-2">

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={loading}
                    >

                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Saving...
                        </>
                      ) : (
                        "Save Student"
                      )}

                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-lg"
                      onClick={() => navigate("/")}
                    >
                      Cancel
                    </button>

                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddStudent;
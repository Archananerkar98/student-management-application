import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentService from "../services/StudentServices";

function EditStudent() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: ""
  });

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {

    const loadStudent = async () => {

      try {

        const response =
          await StudentService.getStudentById(id);

        setStudent(response.data);

      } catch (error) {

        console.error(error);

        setError("Unable to load student.");

      } finally {

        setLoading(false);

      }
    };

    loadStudent();

  }, [id]);

  const handleChange = (e) => {

    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });

  };

  const updateStudent = async (e) => {

    e.preventDefault();

    setSaving(true);

    setError("");

    try {

      await StudentService.updateStudent(id, student);

      navigate("/");

    } catch (error) {

      console.error(error);

      setError("Unable to update student.");

    } finally {

      setSaving(false);

    }
  };

  if (loading) {

    return (

      <div className="page-background">

        <div className="text-center py-5">

          <div className="spinner-border text-primary" />

          <p className="mt-3">
            Loading student...
          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="page-background">

      <div className="container py-5">

        <div className="row justify-content-center">

          <div className="col-lg-7">

            <div className="card professional-card">

              <div className="card-header professional-header">

                <div>
                  <h3 className="mb-1">
                    Edit Student
                  </h3>

                  <p className="mb-0">
                    Update student information
                  </p>
                </div>

              </div>

              <div className="card-body p-4">

                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                <form onSubmit={updateStudent}>

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
                      required
                    />

                  </div>

                  <div className="d-flex gap-2">

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={saving}
                    >

                      {saving ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Updating...
                        </>
                      ) : (
                        "Update Student"
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

export default EditStudent;
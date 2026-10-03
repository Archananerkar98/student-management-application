package com.example.student_management_application.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.student_management_application.entity.Student;
import com.example.student_management_application.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    // Get all students
    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    // Get student by ID
    public Student getStudentById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + id));
    }

    // Add student
    public Student addStudent(Student student) {
        return repository.save(student);
    }

    // Update student
    public Student updateStudent(Long id, Student student) {

        Student existingStudent = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Student not found with ID: " + id));

        existingStudent.setName(student.getName());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setCourse(student.getCourse());

        return repository.save(existingStudent);
    }

    // Delete student
    public void deleteStudent(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException("Student not found with ID: " + id);
        }

        repository.deleteById(id);
    }
}
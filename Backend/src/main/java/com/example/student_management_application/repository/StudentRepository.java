package com.example.student_management_application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.student_management_application.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

}
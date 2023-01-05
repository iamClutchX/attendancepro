import React, { useState } from "react";
import {
  labelStyles,
  inputStyles,
  buttonStyles,
  containerStyles,
} from "./style";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    rollNumber: "",
    studentName: "",
    checkInTime: "",
    checkOutTime: "",
  });

  const [students, setStudents] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.rollNumber) {
      newErrors.rollNumber = "Roll number is required";
    }
    if (!formData.studentName) {
      newErrors.studentName = "Student name is required";
    }
    if (
      !formData.checkInTime ||
      !/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(
        formData.checkInTime
      )
    ) {
      newErrors.checkInTime = "Please enter a valid time (HH:MM:SS)";
    }
    if (
      !formData.checkOutTime ||
      !/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(
        formData.checkOutTime
      )
    ) {
      newErrors.checkOutTime = "Please enter a valid time (HH:MM:SS)";
    }
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      console.log(formData);
      setFormData({
        rollNumber: "",
        studentName: "",
        checkInTime: "",
        checkOutTime: "",
      });
      setStudents([...students, formData]);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="App" style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <div style={containerStyles}>
          <h1>Student Attendance</h1>
          <div>
            <label style={labelStyles} htmlFor="rollNumber">
              Roll Number
            </label>
            <input
              style={inputStyles}
              type="text"
              name="rollNumber"
              id="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
            />
            {errors.rollNumber && (
              <p style={{ color: "red" }}>{errors.rollNumber}</p>
            )}
          </div>
          <div>
            <label style={labelStyles} htmlFor="studentName">
              Student Name
            </label>
            <input
              style={inputStyles}
              type="text"
              name="studentName"
              id="studentName"
              value={formData.studentName}
              onChange={handleChange}
            />
            {errors.studentName && (
              <p style={{ color: "red" }}>{errors.studentName}</p>
            )}
          </div>
          <div>
            <label style={labelStyles} htmlFor="checkInTime">
              Check In Time
            </label>
            <input
              style={inputStyles}
              type="time"
              name="checkInTime"
              id="checkInTime"
              value={formData.checkInTime}
              onChange={handleChange}
            />
            {errors.checkInTime && (
              <p style={{ color: "red" }}>{errors.checkInTime}</p>
            )}
          </div>
          <div>
            <label style={labelStyles} htmlFor="checkOutTime">
              Check Out Time
            </label>
            <input
              style={inputStyles}
              type="time"
              name="checkOutTime"
              id="checkOutTime"
              value={formData.checkOutTime}
              onChange={handleChange}
            />
            {errors.checkOutTime && (
              <p style={{ color: "red" }}>{errors.checkOutTime}</p>
            )}
          </div>
          <button style={buttonStyles} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h1>Student List : Total Students {students.length}</h1>
        {students.map((student) => (
          <div>
            <p>Roll Number: {student.rollNumber}</p>
            <p>Student Name: {student.studentName}</p>
            <p>Check In Time: {student.checkInTime}</p>
            <p>Check Out Time: {student.checkOutTime}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentForm;

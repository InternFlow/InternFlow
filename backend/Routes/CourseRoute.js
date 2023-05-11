const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { requireAuth } = require("../middlewares/requireAuth");
const { checkRole } = require("../middlewares/checkRole");

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate("trainer");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ errorMessage: 'Failed to get courses' });
  }
});

//Get the list of courses of a specific trainer by trainerId
router.get('/trainer/:trainerId', async (req, res) => {
  try {
    const courses = await Course.find({ trainer: req.params.trainerId }).populate("trainer");
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Server error" });
  }
});

router.get('/trainer', requireAuth, checkRole('formateur'), async (req, res) => {
  try {
    const courses = await Course.find({ trainer: req.user._id }).populate("trainer");
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Server error" });
  }
});




// Get a course by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id).populate("trainer");
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ errorMessage: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: 'Failed to get course' });
  }
});

// Create a new course
router.post('/', requireAuth, checkRole('formateur'),async (req, res) => {
  const trainer = req.user._id;

  const { name, description, price, enrollmentStartDate, enrollmentEndDate, courseStartDate, courseEndDate, tags, image, maxParticipants } = req.body;
  try {
    const course = new Course({ name, description, price, enrollmentStartDate, enrollmentEndDate, courseStartDate, courseEndDate, tags, image,trainer, maxParticipants });
    const newCourse = await course.save();
    res.json(newCourse);
  } catch (error) {
    res.status(500).json({ errorMessage: 'Failed to create course' });
  }
});

// Create a new course to a specific user
router.post('/:id', requireAuth, checkRole('admin'),async (req, res) => {
  const { name, description, price, enrollmentStartDate, enrollmentEndDate, courseStartDate, courseEndDate, tags, image, maxParticipants} = req.body;
  const trainer = req.params.id;
  try {
    const course = new Course({ name, description, price, enrollmentStartDate, enrollmentEndDate, courseStartDate, courseEndDate, tags, image, trainer, maxParticipants });
    const newCourse = await course.save();
    res.json(newCourse);
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(500).json({ errorMessage: 'Failed to create course' });
  }
});


// Update a course by ID
router.put('/:id', requireAuth, checkRole('formateur'), async (req, res) => {
  const { id } = req.params;
  const { name, description, price, enrollmentStartDate, enrollmentEndDate, courseStartDate, courseEndDate, tags, image, maxParticipants } = req.body;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(id, { name, description, price, enrollmentStartDate, enrollmentEndDate, courseStartDate, courseEndDate, tags, image, maxParticipants }, { new: true });
    if (updatedCourse) {
      res.json(updatedCourse);
    } else {
      res.status(404).json({ errorMessage: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: 'Failed to update course' });
  }
});

// Delete a course by ID
router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (deletedCourse) {
      res.json({ message: 'Course deleted successfully' });
    } else {
      res.status(404).json({ errorMessage: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: 'Failed to delete course' });
  }
});


// Create a class for a course
router.post('/:courseId/classes', requireAuth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ errorMessage: "Course not found" });
    }

    const newClass = {
      name: req.body.name,
      description: req.body.description,
      startDateTime: req.body.startDateTime,
      duration: req.body.duration,
      material: req.body.material
    };

    course.classes.push(newClass);
    await course.save();

    res.json(course.classes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: "Server error" });
  }
});

//Enroll the logged in user in a course by course ID
router.get("/Enroll/:courseId", requireAuth, checkRole("condidat"), async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const studentId = req.user._id;

    // Check if the student is already enrolled in the course
    if (course.students.includes(studentId)) {
      return res.status(400).json({ message: "Student already enrolled in course" });
    }
    else if(course.students.length >= course.maxParticipants){
      return res.status(404).json({ message: "Max umber of participants reached" });
    }

    // Add the current logged in user to the list of students in the course
    course.students.push(studentId);
    await course.save();

    res.status(200).json({ message: "Enrollment successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Unenroll the logged in user in a course by course ID
router.get("/Unenroll/:courseId", requireAuth, checkRole("condidat"), async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    } 

    const studentId = req.user._id;

    // Check if the student is enrolled in the course
    if (!course.students.includes(studentId)) {
      return res.status(400).json({ message: "Student not enrolled in course" });
    }

    // Remove the student from the list of students in the course
    course.students = course.students.filter(id => id.toString() !== studentId.toString());
    await course.save();

    res.status(200).json({ message: "Unenrollment successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Unenroll a user in a course by course ID
router.get("/Unenroll/:courseId/:userId", requireAuth, checkRole("formateur"), async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const studentId = req.params.userId;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    } 


    // Check if the student is enrolled in the course
    if (!course.students.includes(studentId)) {
      return res.status(400).json({ message: "Student not enrolled in course" });
    }

    // Remove the student from the list of students in the course
    course.students = course.students.filter(id => id.toString() !== studentId.toString());
    await course.save();

    res.status(200).json({ message: "Unenrollment successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Check if a student is enrolled in a course
router.get('/checkEnrollment/:courseId', requireAuth, async (req, res) => {
  const courseId = req.params.courseId;
  const userId = req.user._id;

  try {
    const course = await Course.findOne({ '_id': courseId });
    if (!course) {
      console.log(courseId)
      return res.status(404).json({ message: 'Course not found' });
    }

    const studentIndex = course.students.findIndex((id) => id.equals(userId));
    if (studentIndex === -1) {
      return res.json({ enrolled: false });
    } else {
      return res.json({ enrolled: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

//Function to fetch all students enrolled in a course
router.get("/EnrolledList/:courseId", requireAuth, checkRole("formateur"), async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId).populate("students", "-password");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ students: course.students });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Function to fetch the number of all students enrolled in a course
router.get("/EnrolledNumber/:courseId", requireAuth, checkRole("formateur"), async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId).populate("students", "-password");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ studentCount: course.students.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Get the list of courses that a candidate is enrolled in
router.get("/MyCourses/get", requireAuth, checkRole("condidat"), async (req, res) => {
  try {
    const user = req.user;
    const courses = await Course.find({ students: user._id }).populate("trainer");

    res.status(200).json({ courses: courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});



// Read all classes for a course
router.get('/:courseId/classes', async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ errorMessage: "Course not found" });
    }

    res.json(course.classes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: "Server error" });
  }
});

// Read a class for a course
router.get('/:courseId/classes/:classId', async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ errorMessage: "Course not found" });
    }

    const foundClass = course.classes.find(c => c._id.toString() === req.params.classId);
    if (!foundClass) {
      return res.status(404).json({ errorMessage: "Class not found" });
    }

    res.json(foundClass);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: "Server error" });
  }
});

// Update a class for a course
router.put('/:courseId/classes/:classId', async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ errorMessage: "Course not found" });
    }

    const foundClass = course.classes.find(c => c._id.toString() === req.params.classId);
    if (!foundClass) {
      return res.status(404).json({ errorMessage: "Class not found" });
    }

    foundClass.name = req.body.name || foundClass.name;
    foundClass.description = req.body.description || foundClass.description;
    foundClass.startDateTime = req.body.startDateTime || foundClass.startDateTime;
    foundClass.duration = req.body.duration || foundClass.duration;
    foundClass.material = req.body.material || foundClass.material;

    await course.save();

    res.json(foundClass);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: "Server error" });
  }
});
// Delete a class for a course

router.delete('/:id/classes/:classId', requireAuth, async (req, res) => {
  const courseId = req.params.id;
  const classId = req.params.classId;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ errorMessage: 'Course not found' });
    }

    // Find the index of the class to be deleted
    const classIndex = course.classes.findIndex(cls => cls._id.toString() === classId);
    if (classIndex === -1) {
      return res.status(404).json({ errorMessage: 'Class not found' });
    }

    // Remove the class from the array
    course.classes.splice(classIndex, 1);

    // Save the updated course
    await course.save();
    res.status(200).json({ message: 'Class deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: 'Server error' });
  }
});



// GET all materials for a specific class
router.get('/:courseId/classes/:classId/material', async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.courseId });
    if (!course) {
      return res.status(404).json({ errorMessage: 'Course not found' });
    }
    const material = course.classes.id(req.params.classId).material;
    res.json(material);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: 'Server error' });
  }
});

// GET a specific material for a specific class
router.get('/:courseId/classes/:classId/material/:materialId', async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.courseId });
    if (!course) {
      return res.status(404).json({ errorMessage: 'Course not found' });
    }
    const material = course.classes.id(req.params.classId).material.id(req.params.materialId);
    if (!material) {
      return res.status(404).json({ errorMessage: 'Material not found' });
    }
    res.json(material);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: 'Server error' });
  }
});

// POST a new material for a specific class
router.post('/:courseId/classes/:classId/material', async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.courseId });
    if (!course) {
      return res.status(404).json({ errorMessage: 'Course not found' });
    }
    const material = req.body;
    course.classes.id(req.params.classId).material.push(material);
    await course.save();
    res.json(material);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: 'Server error' });
  }
});

// PUT an updated material for a specific class
router.put('/:courseId/classes/:classId/material/:materialId', async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.courseId });
    if (!course) {
      return res.status(404).json({ errorMessage: 'Course not found' });
    }
    const material = course.classes.id(req.params.classId).material.id(req.params.materialId);
    if (!material) {
      return res.status(404).json({ errorMessage: 'Material not found' });
    }
    material.set(req.body);
    await course.save();
    res.json(material);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: 'Server error' });
  }
});

// DELETE a specific material for a specific class
router.delete('/:courseId/classes/:classId/material/:materialId', requireAuth, async (req, res) => {
  try {
    const { courseId, classId, materialId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ errorMessage: 'Course not found' });
    }

    const targetClassIndex = course.classes.findIndex(cls => cls._id.toString() === classId);
    if (targetClassIndex === -1) {
      return res.status(404).json({ errorMessage: 'Class not found' });
    }

    const targetMaterialIndex = course.classes[targetClassIndex].material.findIndex(material => material._id.toString() === materialId);
    if (targetMaterialIndex === -1) {
      return res.status(404).json({ errorMessage: 'Material not found' });
    }

    course.classes[targetClassIndex].material.splice(targetMaterialIndex, 1);

    await course.save();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server error' });
  }
});



module.exports = router;
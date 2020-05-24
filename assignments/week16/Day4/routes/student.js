const express = require("express");
const { check, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

const Student = require("../model/Student");

/**
 * @method - POST
 * @param - /signup
 * @description - Student SignUp
 */

router.post(
  "/signup",
  [
    check("FirstName", "Please Enter a Valid Username")
      .not()
      .isEmpty(),
      check("LastName", "Please Enter a Valid Username")
      .not()
      .isEmpty(),
      check("Email", "Please enter a valid Email").isEmail(),
    check("Password", "Please enter a valid Password").isLength({
      min: 2
    }),
      check("Mobile", "Please Enter a Valid Mobile")
      .not()
      .isEmpty(),
      check("Address", "Please Enter a Valid Username")
      .not()
      .isEmpty(),
      check("Pincode", "Please Enter a Valid Username")
      .not()
      .isEmpty(),
      check("State", "Please Enter a Valid Mobile")
      .not()
      .isEmpty(),
      check("Country", "Please Enter a Valid Mobile")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { FirstName,LastName,Email, Password,Mobile,Address,Pincode,State,Country } = req.body;
    try {
      let student = await Student.findOne({
        Email
      });
      if (student) {
        return res.status(400).json({
          msg: "Student Already Exists"
        });
      }

      student = new Student({
        FirstName,
        LastName,
        Email,
        Password,
        Mobile,
        Address,
        Pincode,
        State,
        Country
      });

      const salt = await bcrypt.genSalt(10);
      student.Password = await bcrypt.hash(Password, salt);

      await student.save();

      const payload = {
        student: {
          id: student.id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

router.post(
  "/login",
  [
    check("Email", "Please enter a valid Email").isEmail(),
    check("Password", "Please enter a valid Password").isLength({
      min: 3
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { Email, Password } = req.body;
    try {
      let student = await Student.findOne({
        Email
      });
      if (!student)
        return res.status(400).json({
          message: "Student Not Exist"
        });

      const isMatch = await bcrypt.compare(Password, student.Password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });

      const payload = {
        student: {
          id: student.id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

/**
 * @method - POST
 * @description - Get LoggedIn Student
 * @param - /student/me
 */

router.get("/me", auth, async (req, res) => {
  try {
    // request.student is getting fetched from Middleware after token authentication
    const student = await Student.findById(req.student.id);
    res.json(student);
  } catch (e) {
    res.send({ message: "Error in Fetching student" });
  }
});

router.get("/student", async (req, res) => {
  const ALLStudent = await Student.find({});

  try {
    res.send(ALLStudent);
  } catch (err) {
    res.status(500).send(err);
  }
});


//Filter students based on same STATE.
router.post('/student/:state', (req, res) => {
  try {
      const Bystate = req.params.state;

      if (Bystate != "") {
          var result = { State: Bystate }
      }

      Student.find(result)
          .then(function (studentFiltered) {
              const count = studentFiltered.length
              res.status(201).json({All_Student: count, Student_By_State: studentFiltered});
          })
  } catch (err) {
      return res.status(403).send({ Error: err.message });
  }
})


module.exports = router;

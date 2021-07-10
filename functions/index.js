const functions = require("firebase-functions");
const express = require("express");
const cors = require("express");
const {getTeachers} = require("./utils/get_teacher");
const {createTeacher} = require("./utils/create_teacher");
const {findTeacherByEmail, updateSatus} = require("./utils/teacher_manager");
const {getTeacherByUid, updateRole} = require("./utils/teacher_manager");
const app = express();
app.use(cors({origin: true}));

app.get("/teachers", getTeachers);
app.post("/teacher/create", createTeacher);
app.get("/teacher/findByEmail", findTeacherByEmail);
app.post("/teacher/update/status", updateSatus);
app.post("/teacher/view", getTeacherByUid);
app.post("/teacher/update/role", updateRole);


exports.app = functions.https.onRequest(app);



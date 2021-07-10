const catchAsyncError = require("../middleware/catchAsyncError");
const {admin, db} = require("./admin");
const Teacher = require("../models/teacher");


exports.createTeacher = catchAsyncError(async (req, res, next)=>{
  try {
    const userRecord = await admin.auth().createUser({
      email: req.body.email,
      emailVerified: false,
      password: req.body.password,
      displayName: req.body.name,
      disabled: false,
    });

    const teacher = new Teacher({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,

      role: req.body.role,
      subject: req.body.subject,
      primary_address: req.body.primary_address,
      present_address: req.body.present_address,
      pincode: req.body.pincode,
      state: req.body.state,
      photo_url: req.body.photoUrl,
      isDisable: false,
      uid: userRecord.uid,

    });

    const isAdmin = !req.body.isAdmin? false: req.body.isAdmin;

    await admin.auth().setCustomUserClaims(userRecord.uid, {admin: isAdmin});

    const result = await db.collection("teachers").
        doc(userRecord.uid).set(teacher.toJSON());

    return res.status(200).json({
      "success": true,
      "message": "Teacher Created!",
      "result": result.name,

    });
  } catch (error) {
    return res.status(500).json({
      "success": true,
      "error": error.message,

    });
  }
});


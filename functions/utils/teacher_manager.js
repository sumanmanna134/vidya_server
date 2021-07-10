const catchAsyncError = require("../middleware/catchAsyncError");
const {admin, db} = require("./admin");
const {isAdmin} = require("./authorization");
const ErrorHandler = require("./errorhandler");

exports.findTeacherByEmail = catchAsyncError(async (req, res, next)=>{
  try {
    const user = await admin.auth().getUserByEmail(req.body.email);
    const myid = await admin.auth().getUser(req.body.myId);


    if (isAdmin(myid)) {
      const getUserDoc = db.collection("teachers").doc(user.uid);
      const item = await getUserDoc.get();
      const response = item.data();

      res.status(200).json(
          {
            "success": true,
            "records": user,
            "personalInfo": response,

          }

      );
    } else {
      console.log(myid);

      return res.status(501).json({
        "success": false,
        "message": "You cannot Access, please contact with administrator"});
    }
  } catch (e) {
    res.status(500).json({
      "success": false,
      "error": e.message,
    });
  }
});


exports.updateSatus = catchAsyncError(async (req, res, next) => {
  try {
    const myid = await admin.auth().getUser(req.body.myId);

    if (isAdmin(myid)) {
      await admin.auth().updateUser(req.body.uid, {
        disabled: req.body.isDisable,
      });

      const getUserDoc = db.collection("teachers").doc(req.body.uid);
      await getUserDoc.update({isDisable: req.body.isDisable});
      const item = await getUserDoc.get();
      const response = item.data();


      return res.status(200).json({
        "success": true,
        "message": "Updated Status",
        "response": response,
      });
    } else {
      return res.status(501).json({
        "success": false,
        "message": "You cannot Access, please contact with administrator"});
    }
  } catch (error) {
    res.status(500).json({
      "success": false,
      "error": error.message,
    });
  }
});

exports.updateRole = catchAsyncError(async (req, res, next)=>{
  if (!req.body.role || !req.body.uid) {
    return next(new ErrorHandler("role and uid should not be empty", 404));
  } else {
    try {

      const getUserDoc = db.collection("teachers").doc(req.body.uid);
      await getUserDoc.update({role: req.body.role});
      const item = await getUserDoc.get();
      const response = item.data();


      return res.status(200).json({
        "success": true,
        "message": "Role Updated!",
        "response": response,
      });
    } catch (error) {
      res.status(500).json({
        "success": false,
        "error": error.message,
      });
    }
  }
});


exports.getTeacherByUid=catchAsyncError(async (req, res, next)=>{

  try {
    const user = await admin.auth().getUser(req.body.uid);
    const getUserDoc = db.collection("teachers").doc(req.body.uid);
    const item = await getUserDoc.get();
    const response = item.data();

    return res.status(200).json(
        {
            "success": true,
            "records": user,
            "personalInfo": response,
        }

    );
  } catch (e) {
    return res.status(500).json({
      "success": false,
      "message": e.message
    });
  }
});

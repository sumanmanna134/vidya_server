const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  uid: {

    type: String,
    required: [true, "Someting went wrong to generate uid"],

  },

  name: {

    type: String,
    required: [true, "please enter your name"],
    maxLength: [30, "your name cannot exceed 30 characters"],

  },
  email: {

    type: String,
    required: [true, "please enter email"],
    unique: true,
    trim: true,
    lowercase: true,


  },

  password: {
    type: String,
    required: [true, "please enter password"],
    minlength: [6, "your password must be longer than 6 characters"],
    select: false,
  },
  phone: {

    type: String,
    required: [true, "please enter your phone"],
    maxLength: [10, "your phone cannot exceed 10 characters"],

  },
  role: {
    type: String,
    default: "teacher",
  },

  subject: {
    type: [String],
    default: [],

  },
  primary_address: {

    type: String,
    required: [true, "please enter your primary address"],
    maxLength: [90, "your address cannot exceed 30 characters"],

  },
  present_address: {

    type: String,
    required: [true, "please enter your present address"],
    maxLength: [90, "your address cannot exceed 30 characters"],

  },

  pincode: {

    type: String,
    required: [true, "please enter your present address"],
    maxLength: [6, "your pincode cannot exceed 30 characters"],
    // validate: {
    //     function(val){
    //         return val.length>=6|| val.length === 0
    //     },
    //     message: ()=> 'Pincode must be at 6 characters '
    // }


  },
  state: {

    type: String,
    required: [true, "please enter your state"],


  },
  photo_url: {

    type: String,
    default: null,


  },
  isDisable: {
    type: Boolean,

  },

}, {_id: false});

module.exports = mongoose.model("TeacherSchema", teacherSchema);

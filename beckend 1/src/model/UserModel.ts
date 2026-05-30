import mongoose from "mongoose";

// _id, _v, createdAt, updatedAt
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 20,
  },
  maidenName: {
    type: String,
    required: false,
    default: null,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 20,
  },
  // birthDate: {
  //   type: Date,
  // // optional
  //  // required: false
  //  // default: null
  // },
  birthDate: Date,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  phone: {
    type: String, // +977 98x-xxx-xxxx
  },
  image: {
    originalName: String,
    filename: String,
    size: Number,
    destination: String,
  },
  address: {
    address: String,
    city: {
      type: String,
    },
    state: String,
    coordinates: {
      lat: mongoose.Types.Double,
      lng: mongoose.Types.Double,
    },
    country: String,
  },
  role: {
    type: String, 
    enum: ["admin", "user"],
    default: "user"
  }
}, {
  autoCreate: true,
  autoIndex: true, 
  timestamps: true        // createdAt, updatedAt
});

// .model("modelName") => modelNames
// .model('User') => table(Collection) => users
const UserModel = mongoose.model("User", UserSchema)

export default UserModel;
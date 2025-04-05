import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfJoining: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: "" },
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;

import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
username: { type: String, required: true, trim: true },
email: { type: String, required: true, unique: true, lowercase: true, trim:true },
password: { type: String, required: true, minlength: 6 }}
, { timestamps: true })

userSchema.pre("save", async function (next) { //uses function since we are getting local this.
if (!this.isModified("password")) return next()
const salt = await bcrypt.genSalt(10)
this.password = await bcrypt.hash(this.password, salt)
next()
})

userSchema.methods.comparePassword = async function (candidate) { //uses function since we are getting local this.
return bcrypt.compare(candidate, this.password)
}

export default mongoose.model("User", userSchema);
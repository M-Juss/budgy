import User from '../models/userModel.js'

export const signup = async (req,res) => {
      try{
        const newUser = new User(req.body)
        const result = await newUser.save()
        res.status(201).json({message: "New user added successfully!", id: result._id})
      } catch (err){
        console.error("Insert error:", err)
        res.status(500).json({ message: "Something went wrong" })
      }
}


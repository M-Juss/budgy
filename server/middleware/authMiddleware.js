import jwt from 'jsonwebtoken'

export const protect = (req,res,next) =>{
    const auth = req.headers.authorization
    if(!auth || !auth.startsWith('Bearer ')){ // Reads the Authorization header from the request.
    return res.status(401).json({message: "No token provided."}) //
    }
    // If there’s no Authorization header, or it doesn’t start with "Bearer " → immediately reject with 401 Unauthorized

    const token = auth.split(" ")[1]
    //Splits "Bearer <token>" into ["Bearer", "<token>"]

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET) // if valid  contains payload like this ex. { id: "64fdcf1234ab56789c0d1234", iat: 1692741890, exp: 1692745490 }
        req.user = {id: decoded.id} // attach the decoded.id to req.user
        next() // Passes control to the next middleware/route handler.
    } catch(err) {
        return res.status(401).json({message: "Invalid or expired token."})
    }
}
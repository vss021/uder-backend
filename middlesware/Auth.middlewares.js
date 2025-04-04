import userModel from "../models/userModel.js";
import BlacklistToken from "../models/blacklistModel.js";
import captainModel from "../models/captainModel.js";

// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlacklisted = await BlacklistToken.findOne({token : token});

  if(isBlacklisted){
    return res.status(401).json({message : "Unauthorized"});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded._id);

    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const authCaptain = async(req, res, next) => {

    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    if(!token){
      return res.status(401).json({message : "Unauthorized"});
    }
    
    const isBlacklisted = await BlacklistToken.findOne({token : token});

    if(isBlacklisted){
      return res.status(401).json({message : "Unauthorized"});
    }

    try {

      const decodedPass = jwt.verify(token, process.env.JWT_SECRET);

      const captain = await captainModel.findById(decodedPass._id);

      req.captain = captain;

      return next();

    } catch (error) {
      return res.status(401).json({message : "Unauthorized"}); 
    }
}

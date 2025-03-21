import userModel from "../models/userModel.js";
import {createUser} from "../services/user.service.js";
import { validationResult } from "express-validator";
import BlacklistToken from "../models/blacklistModel.js";

export const register = async(req, res, next) => {

    const err = validationResult(req);

    if(!err.isEmpty()){
        return res.status(400).json({errors : err.array() });
    }

    const {fullname, email, password} = req.body;

    const hashedPassword = await userModel.hashPassword(password);


    const user = await createUser({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email, 
        password : hashedPassword
    });


    const token = user.generateAuthToken();

    return res.status(201).json({token, user});
}

export const loginUser = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }

        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        if (!user.password) {
            return res.status(500).json({ message: "Password is missing for this user" });
        }

        const match = await user.comparePassword(password);
        if (!match) {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        const token = user.generateAuthToken();

        return res.status(200).json({ token, user });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const userProflie = async (req, res, next) => {

    try {
        res.status(200).json(req.user);
    } catch (error) {
        
    }
}

export const logOutUser = async (req, res, next) => {
    
    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    await BlacklistToken.create({token});

    res.status(200).json({message : "Logout Successfully"});

}

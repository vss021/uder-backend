import captainModel from "../models/captainModel.js";
import { createCaptain } from "../services/captain.service.js";
import { validationResult } from "express-validator";
import BlacklistToken from "../models/blacklistModel.js";

export const registerCaptain = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exist' });
    }


    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    return res.status(200).json({token, captain});
}

export const loginCaptain = async(req, res) => {

    const error = validationResult(req);

    if(!error) {
        return res.status(404).json({error: error.array()});
    }

    const {email, password} = req.body;

    const isCaptainExist = await captainModel.findOne({email}).select('+password');

    if(!isCaptainExist){
        return res.status(401).json({message : 'Invalid Email & Password'});
    }

    const matchPassword = await isCaptainExist.comparePassword(password);


    if(!matchPassword){
        return res.status(401).json({message : 'Invalid Email & Password'});
    }

    const token = isCaptainExist.generateAuthToken();

    res.cookie('token', token);

    return res.status(200).json({token, isCaptainExist});

}

export const getCaptainProfile = async(req, res) => {
    return res.status(200).json({captain : req.captain});
}
export const logOutCaptain = async(req, res) => {

    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    await BlacklistToken.create({token});

    res.clearCookie('token');


    res.status(200).json({message : 'Logout Successfully'});
}

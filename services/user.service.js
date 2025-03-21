
import userModel from "../models/userModel.js";

export const createUser = async( {firstname, lastname, email, password}) => {

    if(!firstname || !email || !password){
        throw new Error("All Field Required!");
    }

    const user = userModel.create({

        fullname :{
            firstname,
            lastname
        },
        email,
        password,
    });

    return user;
}
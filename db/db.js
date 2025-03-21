import mongoose from "mongoose";

console.log(process.env.DB_URL);
function connectToDB() {
    mongoose.connect(process.env.DB_URL)
    .then(() => console.log("DB Connected Successfully!!"))
    .catch(err => console.log("DB Connection Error:", err));
}


export default connectToDB;

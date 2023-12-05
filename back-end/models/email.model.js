import mongoose from "mongoose";

const emailSchema = mongoose.Schema({
    name:{
        type: String,
        default: "",
        required: true
    },
    email: {
        type: String,
        default: "",
        required: true,
    },
    password: {
        type: String,
        default: "",
        required: true
    }
},
{
    timeStamp: true
}
);

export default mongoose.model("new-crud", emailSchema)

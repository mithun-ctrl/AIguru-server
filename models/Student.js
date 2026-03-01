import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({

    name: {
        type: String,
        required: [true, "Name is requried"],
        minlength: 2,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      minlength: 6,
      maxlenght: 16,
    },
});


userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', userSchema);

export default User;
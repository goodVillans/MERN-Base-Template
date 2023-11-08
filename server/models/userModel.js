import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {timestamps: true});

// hash password
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')){
        next();
    }
    // key used to hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
// compare entered passwords for login functionality
userSchema.methods.matchPasswords = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema);

export default User;
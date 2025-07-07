import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        match: [/.+\@../, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
        select: false // Password won't be sent in queries by default
    },
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    // User's macro and water targets
    target_calories: { type: Number, default: 2000 },
    target_protein: { type: Number, default: 150 },
    target_carbs: { type: Number, default: 200 },
    target_fat: { type: Number, default: 70 },
    target_water: { type: Number, default: 3000 },
}, { timestamps: true });

// Middleware to hash password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare entered password with hashed password
UserSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User;

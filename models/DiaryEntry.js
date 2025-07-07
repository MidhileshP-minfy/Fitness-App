import mongoose from 'mongoose'
const DiaryEntrySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food', // Reference to the Food model
        required: true
    },
    quantity: { type: Number, required: true },
    meal_type: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
        required: true
    },
    log_date: { type: Date, required: true }
}, { timestamps: true });

const DiaryEntry = mongoose.model('DiaryEntry', DiaryEntrySchema);
export default DiaryEntry;
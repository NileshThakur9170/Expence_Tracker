import mongoose from 'mongoose';

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://nkthakur2k5_db_user:ExpenseTrack@cluster0.k0zyv7m.mongodb.net/Expense")  
    .then(() => console.log("DB Connected"));
}
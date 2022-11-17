import mongoose from "mongoose";

const productShema = mongoose.Schema({

    user: {
        
    }
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        ddefault: false
    },
}, {
    timestamps: true,
})

const User = mongoose.model('User', userShema)

export default User
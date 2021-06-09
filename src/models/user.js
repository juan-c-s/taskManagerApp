const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email")
            }

        }
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('negative Number Exception')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('can\'t enter that password');
            }
        },

    },
    //We create the list of tokens so that the user can be logged in in multiple devices
    tokens: [
        {
            token: {
                required: true,
                type: String,
            },
        }
    ],
})


//create instance method to create and return the token for login
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = await jwt.sign({ _id: user._id.toString() }, 'tomorrowland')

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

//creating custom functions for the userschema object. 
//LOGIN function
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error("Unable to login")
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match)
        throw new Error("Unable to login")

    return user
}


//middleware functions before saving
//hashing password before saving
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 8)

    next()
})

const User = mongoose.model('User', userSchema)





module.exports = User
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {UserInputError} = require('apollo-server')

const User = require("../../models/User");
const {validateRegisterInput, validateLoginInput} = require('../../utils/validators')

const generateToken = (user) => {
  return jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username
}, "SCREAT_KEY", {expiresIn: '1d'})
}

module.exports = {
  Mutation: {

    async login(_, {email, password}){
      const {errors, valid} = validateLoginInput(email, password)
      
      if(!valid){
        throw new UserInputError("Error", { errors})
    }

      const foundUser = await User.findOne({ email})

      if(!foundUser){
        errors.general = "User Not Found"
        throw new UserInputError("User Not Found", { errors})
      }

      const match = await bcrypt.compare(password, foundUser.password)

      if(!match){
        errors.general = "Email or Password wrong"
        throw new UserInputError("User or Password wrong", { errors})
      }

      const token = generateToken(foundUser)
      
      return {
        ...foundUser._doc,
        id: foundUser._id,
        token 
    }

    },
    //parent, args, context, info
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {

      // validated user data
      const {errors, valid} = validateRegisterInput(username, email, password, confirmPassword)
      if(!valid){
          throw new UserInputError("Error", { errors})
      }

      // if user aleardy exist
      const foundUser = await User.findOne({ email})
      if(foundUser){
          throw new UserInputError('User already taken', {
              errors: {
                  email: "This email already taken"
              }
          })
      }
      // hash password
      password = await bcrypt.hash(password, 12);
      // create user
      const newUser = new User({
        
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save()

      const token = generateToken(user)
      
      return {
          ...res._doc,
          id: res._id,
          token 
      }

    },
  },
};

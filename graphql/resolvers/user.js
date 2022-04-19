const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const {UserInputError} = require('apollo-server')

module.exports = {
  Mutation: {
    //parent, args, context, info
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {

      // validated user data
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

      const token = jwt.sign({
          id: res.id,
          email: res.email,
          username: res.username
      }, "SCREAT_KEY", {expiresIn: '1d'})
      
      return {
          ...res._doc,
          id: res._id,
          token 
      }

    },
  },
};

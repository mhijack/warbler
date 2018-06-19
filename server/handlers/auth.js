const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async () => {
  console.log('hhd')
  try {
    console.log('finding')
    // Find user
    let user = await db
      .User
      .findOne({email: req.body.email});
    // Check if password & username match
    console.log(user);
    let {id, username, profileImageUrl} = user;
    let isMatch = await user.comparePassword(req.body.password);
    // If match:
    if (isMatch) {
      let token = jwt.sign({
        id,
        username,
        profileImageUrl
      }, process.env.SECRET_KEY);
      return res
        .status(200)
        .json({id, username, profileImageUrl, token})
    } else {
      return next({status: 400, message: 'Invalid Email/Password.'})
    }
  } catch (err) {
    return next({status: 400, message: 'Invalid Email/Password.'})
  }
  // Log in user
}

// exports.signin = (req, res, next) => {
//   return res.status(200).json({yep: 'hahsdfsd'})
// }

exports.signup = async(req, res, next) => {
  try {
    // Create user
    let user = await db
      .User
      .create(req.body);
    let {id, username, profileImageUrl} = user;
    // Signing token - process.env.SECRET_KEY
    let token = jwt.sign({
      id,
      username,
      profileImageUrl
    }, process.env.SECRET_KEY);
    return res
      .status(200)
      .json({id, username, profileImageUrl, token})
  } catch (err) {
    // Determine kind of err Respond with username/email already taken Otherwise
    if (err.code === 11000) {
      // If validation fails
      err.message = 'Sorry, the username and/or email is already taken.';
    }
    // send back generic 400
    return next({status: 400, message: err.message})
  }
}
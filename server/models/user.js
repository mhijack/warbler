const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImageUrl: {
    type: String
  }
})

// Pre-hook: hash password right before saving
userSchema.pre('save', async function (next) {
  try {
    // Prevent re-hashing of password if it hasn't been modified
    if (!this.isModified('password')) {
      return next();
    }
    // Wait for encryption and move on
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    console.log(`this is ${this}`)
    return next();
  } catch(err) {
    return next(err);
  }
});

// Next() explicitly tells express when to move on to the next action in asynchronous actions
userSchema.methods.comparePassword = async function (candidatePassword, next){
  try {
    // If password matches, user has logged in
    let isMatch = await bcrypt.compare(candidatePassword, this.password); // 'this' refers to userSchema
    console.log(`this refers to ${this}`)
    return isMatch;
  } catch (error) {
    return next(error);
  }
}

const User = mongoose.model('User', userSchema);

module.exports = User;
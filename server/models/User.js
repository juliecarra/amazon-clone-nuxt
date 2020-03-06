var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
var SALT_WORK_FACTOR = 10;

var userSchema = new Schema({
  name: { type: String },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: { type: String, required: true },
  address: { type: Schema.Types.ObjectId, ref: "Address" }
});

userSchema.pre("save", function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

var User = mongoose.model("User", userSchema);

module.exports = User;

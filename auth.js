// auth.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
  {
    usernameField: 'userName',
    passwordField: 'password'
  },
  async (userName, password, done) => {
    try {
        console.log("Credentials received");
        const user = await Person.findOne({ userName: userName });
        if (!user) {
            console.log("Incorrect username");
            return done(null, false, { message: "incorrect username" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (isMatch) { 
            console.log("Login successful");
            return done(null, user);
        } else {
            console.log("Incorrect password");
            return done(null, false, { message: "incorrect password" });
        }
    } catch (err) {
        console.error("Error during authentication", err);
        return done(err);
    }
  }
));

module.exports = passport;

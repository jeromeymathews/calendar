const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const AppleStrategy = require('passport-apple');
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const User = require('../models/users');

const router = express.Router();

// Passport configuration
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ authProviderId: profile.id, authType: 'google' });
        if (!user) {
            user = new User({
                email: profile.emails[0].value,
                name: profile.displayName,
                authType: 'google',
                authProviderId: profile.id,
                profilePicture: profile.photos[0].value
            });
            await user.save();
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

// Apple and Microsoft strategies would be implemented similarly

// Auth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/signin' }),
    (req, res) => res.redirect('/'));

// Apple and Microsoft routes would be similar

router.post('/email', (req, res, next) => {
    // Implement email/password authentication logic here
    // This should validate the user's credentials and log them in
});

module.exports = router;

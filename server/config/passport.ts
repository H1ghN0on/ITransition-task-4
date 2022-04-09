import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const userDB = {
  id: 136345,
  username: "H1ghN0on_",
  password: "123",
};

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.use(
  new LocalStrategy(function (username, password, done) {
    if (username === userDB.username && password === userDB.password) {
      return done(null, userDB);
    } else {
      return done(null, false);
    }
  })
);

export { passport };

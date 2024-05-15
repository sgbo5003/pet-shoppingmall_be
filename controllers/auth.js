const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
exports.join = async (req, res, next) => {
  const { email, password, name, phoneNumber } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      res.status(400).send("이미 존재하는 회원입니다.");
      return;
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      password: hash,
      name,
      phone: phoneNumber,
    });
    return res.status(200).send("회원가입 성공");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      // 서버 실패
      console.log(authError);
      return next(authError);
    }
    if (!user) {
      // 로직 실패
      res.status(400).send(info.message);
      return;
    }
    return req.login(user, (loginError) => {
      // 로그인 성공
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.status(200).send("로그인 성공");
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

exports.logout = (req, res, next) => {
  req.logout(() => {
    res.redirect("/");
  });
};

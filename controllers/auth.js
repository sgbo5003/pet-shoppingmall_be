const User = require("../models/user");
const UserWallet = require("../models/userWallet");
const bcrypt = require("bcrypt");
const passport = require("passport");
exports.join = async (req, res, next) => {
  const { email, password, name, phoneNumber, address } = req.body;
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
      address,
    });
    const UserId = await User.findOne({ where: { email } });
    await UserWallet.create({
      point: 0,
      UserId: UserId.id,
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
    return req.login(user, async (loginError) => {
      // 로그인 성공
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      const UserPoint = await UserWallet.findOne({ where: { id: user.id } });
      const userRes = {
        id: user.id,
        email: user.email,
        name: user.name,
        adminYn: user.adminYn,
        address: user.address,
        point: UserPoint.point,
      };
      return res.status(200).send(userRes);
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

exports.logout = (req, res, next) => {
  req.logout(() => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send({ message: "로그아웃 실패" });
      }
      res.clearCookie("connect.sid");
      res.status(200).send("로그아웃 성공");
    });
  });
};

exports.modify = async (req, res, next) => {
  const { email, password, newPassword, name, phoneNumber, address } = req.body;
  try {
    if (password) {
      if (newPassword) {
        const exUser = await User.findOne({ where: { email } });
        if (!bcrypt.compare(password, exUser.password)) {
          res.status(400).send("입력하신 현재 비밀번호가 틀렸습니다.");
          return;
        } else {
          const hash = await bcrypt.hash(newPassword, 12);
          if (phoneNumber) {
            await User.update(
              {
                password: hash,
                name,
                phone: phoneNumber,
                address,
              },
              {
                where: { email },
              }
            );
          } else {
            await User.update(
              {
                password: hash,
                name,
                address,
              },
              {
                where: { email },
              }
            );
          }
        }
      }
    } else {
      if (phoneNumber) {
        await User.update(
          { name, phone: phoneNumber, address },
          {
            where: { email },
          }
        );
      } else {
        await User.update(
          { name, address },
          {
            where: { email },
          }
        );
      }
    }
    return res.status(200).send(`회원정보 수정 완료`);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

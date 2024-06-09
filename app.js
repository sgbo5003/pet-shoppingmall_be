const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");
const passport = require("passport");
const { sequelize } = require("./models");

dotenv.config(); // process.env
const pageRouter = require("./routes/page");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const passportConfig = require("./passport");

const app = express();
passportConfig();
app.set("port", process.env.PORT || 8001);
// app.set("view engine", "html");
// {force: true} => 개발시 테이블을 재생성해주는 옵션
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
app.use(
  cors({
    origin: "http://localhost:3000", // or 'http://localhost:3000
    credentials: true, // true일시 origin의 '*'을 사용하지 못한다.
  })
);
app.use(morgan("dev")); // loging 개발 모드, combined : 배포할때 (자세하게 로그를 남기고 안남기고의 차이가 있다. 서버의 용량을 많이 차지하기 때문에 개발시에만 dev로 한다.)
app.use(express.static(path.join(__dirname, "public"))); // public 폴더를 static 폴더로 만들어준다.
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(express.json()); // json 요청 받을 수 있게
app.use(express.urlencoded({ extended: false })); // form 요청 받을 수 있게
app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키 연동 처리
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize()); // req.user, req.login, req.isAuthenticate, req.logout
app.use(passport.session()); // connect.sid라는 이름으로 세션 쿠키가 브라우저로 전송

app.use("/", pageRouter);
app.use("/auth", authRouter);
app.use("/product", productRouter);

app.use((req, res, next) => {
  // 404 NOT FOUND
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  // 에러처리 미들웨어
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {}; // 보안상 개발 모드일때만 에러가 뜨게 한다. 실서비스에서는 에러 로그를 통해 확인한다.
  res.status(err.status || 500);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});

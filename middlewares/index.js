exports.isLoggedIn = (req, res, next) => {
  // console.log("req.isAuthenticated()", req.isAuthenticated());
  if (req.isAuthenticated()) {
    // 패스포트 통해서 로그인 했니
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.status(404).send(message);
  }
};

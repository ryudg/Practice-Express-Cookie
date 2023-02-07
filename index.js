const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser("Secret")); // 문자열이 cookieParser가 쿠키에 사인할 때 사용됨

app.get("/greet", (req, res) => {
  const { name = "No-Name" } = req.cookies;
  console.log(req.cookies);
  res.send(`HEY!!! ${name}`);
});
app.get("/setname", (req, res) => {
  res.cookie("name", "Son");
  res.cookie("aniam", "Dog");
  res.send("Ok, Sent UR Cookie");
});

app.get("/getSignedCookie", (req, res) => {
  res.cookie("fruit", "grape", { signed: true }); // name:fruit, value:s%3Agrape.G6gOmq3cbdzJA9GHDza6JxhtRTpLIukSwK2NEk%2BRz7w
  // 데이터를 감추기 위한것이 아님, 실제로 value값 안에는 grape라는 값이 들어가있음, 무결성과 유효성 확인 등을 위함
  res.send("Ok, Signed Fruit");
});

app.get("/verifyfruit", (req, res) => {
  console.log(req.signedCookies, req.cookies);
  res.send(req.signedCookies);
});

app.listen(3002, () => {
  console.log("serving");
});

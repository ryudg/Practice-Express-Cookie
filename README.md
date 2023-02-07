# Practice-Express-Cookie

cookie-parser 미들웨어 사용과 cookie 서명

# Cookie

- 쿠키는 클라이언트 pc에 간단한 데이터들을 저장하기 위한 기능

# Cookie 데이터의 보안성

<img width="188" alt="스크린샷 2023-02-07 오후 1 02 24" src="https://user-images.githubusercontent.com/103430498/217145475-bc911cce-c6a1-4f82-ae52-28134a8759f8.png">

- 데이터의 값이 공개적이다.

# Cookie 데이터 서명

- Cookie에서 서명은 쿠키가 가진 데이터의 정확성과 무결성을 확인하기 위해 사용되는 기술이다.
- 서명은 쿠키의 값을 입력으로 받아 서명이 포함된 새로운 쿠키 문자열을 반환한다.

# Cookie 서명 방법

- Cookie에 서명을 하는 이유는 쿠키의 정확성을 확인하고, 전송 과정에서 쿠키가 수정되지 않았음을 보장하기 위해서이다.
- 쿠키 서명을 통해 클라이언트에서 쿠키가 위조되거나 수정되지 않았음을 보증할 수 있고, 서버는 쿠키를 수신할 때 서명을 검증하여 쿠키가 정상적으로 수신되었는지 확인할 수 있다.
- `cookie-parser` 미들웨어를 사용할 때, 이 메소드는 서명된 쿠키를 지원한다.
- 아래의 예시와 같이 `{ signed: true }` signed 옵션의 값을 true로 해주면 된다.

```javascript
app.get("/getSignedCookie", (req, res) => {
  res.cookie("fruit", "grape", { signed: true }); // name:fruit, value:s%3Agrape.G6gOmq3cbdzJA9GHDza6JxhtRTpLIukSwK2NEk%2BRz7w
  res.send("Ok, Signed Fruit");
});
```

- 그 후에 `res.cookie()`는 `app.use(cookieParser(secret));`에 전달된 암호를 사용하여 값을 서명한다.
  - `app.use();`를 통해 `cookieParser()` 객체를 사용 선언할 때 암호를 인자로 넣으면 서버와 클라이언트 간 쿠키 정보 통신에 있어서 데이터를 변조 처리하여 작업.
- `req.signedCookie` 객체를 통해 값에 접근할 수 있다.
  - `cookie-parser` 미들웨어를 사용하는 경우 `req.signedCookie` 속성은 요청에 의해 서명되지 않고 사용할 준비가 된 쿠키를 보낼 때 서명을 포함.
  - 서명된 쿠키는 다른 객체에 속해있다.
- 쿠키에 서명하는 것은 숨기거나 암호화하는 것이 아니라 간섭을 간단하게 방지하는것.(서명에 사용하는 비밀 키는 비공개)
- 쿠키에 서명을하게될 경우 서버에서 요청에 의해 쿠키 데이터에 접근하기 위해서는 `req.signedCookie`를 사용하고,
- 서명하지 않은 쿠키의 데이터에 접근하는 경우 `req.cookie`를 사용

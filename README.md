# Music Licensing Platform

뮤지션들을 위한 포트폴리오 및 음원 판매 사이트입니다.

# Log

## 230926

### 메인 페이지 생성

<img width="1173" alt="스크린샷 2023-09-26 오후 11 06 42" src="https://user-images.githubusercontent.com/138586629/270684235-47f2aa57-d642-4b11-9ace-4bd028d78e8d.png">

html, css, js 구성 및 Spring 정적 파일 서빙하도록 구현함.

<img width="326" alt="스크린샷 2023-09-26 오후 11 10 03" src="https://user-images.githubusercontent.com/138586629/270684612-28fa6f23-02b3-4053-ae83-83c90bf37c31.png">

#### 오디오 재생

카드 클릭 시 오디오 재생 가능하도록 클릭 이벤트 등록함

```javascript
// static/js/index.js

const audio = new Audio("./mp3/audio1.mp3");
const handlePlayBtn = () => {
    if (audio.paused) {
        void audio.play();
        console.log("audio played");
    } else {
        audio.pause();
        console.log("audio paused");
        audio.currentTime = 0;
    }
};

const cards = document.querySelectorAll(".cards .card");
cards[0].addEventListener("click", handlePlayBtn);
cards[0].appendChild(audio);
```

### 로그인 페이지 생성

로그인 버튼 클릭 시 templates/signin.html로 이동

<img width="360" alt="스크린샷 2023-09-26 오후 11 12 08" src="https://user-images.githubusercontent.com/138586629/270685324-4f625643-4623-4265-9090-740ceb9a1379.png">

Spring에서 Controller를 생성해 signin 파일 서빙하도록 구현

```java
// controller.SigninController
package qkrwogk.musiclicensing.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SigninController {
    @GetMapping("signin")
    public String signin(Model model) {
        return "signin";
    }
}
```




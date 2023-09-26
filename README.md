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

### 회원(Member) 클래스 추가

김영한님의 강의를 참고하여 로그인/로그아웃 기능을 위한 Member 클래스와
MemberRepository 인터페이스, 메모리를 사용하는 MemoryMemberRepository 
클래스를 만들고 CRUD 메소드를 구현해줬다.

```java
// domain.Member
package qkrwogk.musiclicensing.domain;

public class Member {

    private Long id;
    private String name;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}
```

```java
// repository.MemberRepository
package qkrwogk.musiclicensing.repository;

import qkrwogk.musiclicensing.domain.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {
    Member save(Member member);
    Optional<Member> findById(Long id);
    Optional<Member> findByName(String name);
    List<Member> findAll();

}
```

```java
// repository.MemoryMemberRepository
package qkrwogk.musiclicensing.repository;

import qkrwogk.musiclicensing.domain.Member;

import java.util.*;

public class MemoryMemberRepository implements MemberRepository {

    private static Map<Long, Member> store = new HashMap<>();
    private static long sequence = 0L;

    @Override
    public Member save(Member member) {
        member.setId(++sequence);
        store.put(member.getId(), member);
        return member;
    }

    @Override
    public Optional<Member> findById(Long id) {
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public Optional<Member> findByName(String name) {
        return store.values().stream()
                .filter(member -> member.getName().equals(name))
                .findAny();
    }

    @Override
    public List<Member> findAll() {
        return new ArrayList<>(store.values());
    }

    public void clearStore() {
        store.clear();
    }
}
```

---

관련하여 테스트 코드도 만들어줬다.

```java
// repository.MemoryMemberRepository
package qkrwogk.musiclicensing.repository;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import qkrwogk.musiclicensing.domain.Member;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

class MemoryMemberRepositoryTest {

    MemoryMemberRepository repository = new MemoryMemberRepository();

    @AfterEach
    public void afterEach() {
        repository.clearStore();
    }

    @Test
    public void save() {
        Member member = new Member();
        member.setName("spring");

        repository.save(member);

        Member result = repository.findById(member.getId()).get();
        assertThat(member).isEqualTo(result);
    }

    @Test
    public void findByName() {
        Member member1 = new Member();
        member1.setName("spring1");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("spring2");
        repository.save(member2);

        Member result = repository.findByName("spring1").get();

        assertThat(result).isEqualTo(member1);
    }

    @Test
    public void findAll() {
        Member member1 = new Member();
        member1.setName("spring1");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("spring2");
        repository.save(member2);

        List<Member> result = repository.findAll();

        assertThat(result.size()).isEqualTo(2);
    }
}
```

<img width="604" alt="스크린샷 2023-09-27 오전 2 35 33" src="https://user-images.githubusercontent.com/138586629/270745483-dd41edde-6073-4fa3-82bd-a8deb90c2331.png">

테스트 모두 통과! 

---

지금은 스프링이 처음이라 코드를 다 옮겼지만 다음부터는 필요한 부분만 담아야 겠다.


### CSS 개선

<img width="1146" alt="스크린샷 2023-09-27 오전 2 26 56" src="https://user-images.githubusercontent.com/138586629/270743426-b988a175-fb5c-49a0-a6cc-eeec47570884.png">

balenciaga 사이트를 참고하여 CSS를 개선해 보았다. 이제 좀 맘에 든다 굳!




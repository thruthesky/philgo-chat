# Philgo Chat

## 목표

* 필리핀 로컬 앱.
  * 필고 연동 + 필리핀에 있는 외국인들을 대상 + 채팅 커뮤니티 앱.
  * 명칭 소너브
  * 회사 주소가 Withcenter, Inc. Pamapanga 이므로 필리핀 앱이 맞다.

## TODO

* @done 홈페이지 주소 https://chat.philgo.com/room/마닐라 와 같이 접속 하도록 할 것.

* 앱 배포.
  * 새로운 핸드폰 Galaxy wide 에서, cordova 로 인식 못하는 것 같음. 그래서 push token 이 없음.
  * @done API 타겟이 26 이상이야 한다고 함. Ionic Pro 에서 어떻게 변경하지?
  * @done com.philgo.www 는 이미 사용중이라고 함. com.sonub.www 로 사용 할 것.

* 배포 후, 채팅 방 목록 페이지에서 push 알림을 거절했으면 앱 다운로드 URL 링크.

* 언어 translation
  * ngx-translate 하지 말 것. 도저히 이해 할 수 없다.
  * 지금현재 ~/app/site 의 소스와 https://github.com/thruthesky/firelibrary/blob/3237b8b22cc227e8c3acf82e3f87bdc425b9acd4/providers/etc/base.ts 의 소스를 보고,
  * angular-translate 이라는 독립 서브 repo 를 만들어서 사용한다.
  * 카메라 선택을
    '카메라로 사진찍기', '갤러리에서 선택하기' 로 이해하기 쉽게 할 것.
  * push notification 에서 allow 를 허용으로 번역할 것.
  * 앱 명칭.

* 필고 홈페이지에 단톡방 링크는 이미 걸려져 있음. 방을 생성해야 함.

* @done 필고 아이디, 닉네임 으로 로그인 할 수 있도록 할 것.
* 필고 기존 단톡방 링크를 모두 변경하거나, 기존의 단톡방 페이지에, philgo-chat 이 부팅되도록 함. in-page booting 은 ionic app 을 필고 루트에 저장해야 하기 때문에, 어려 울 듯.
  * 그냥 chat.philgo.com 으로 연결하는 것이 가장 좋을 듯.

* 필고 메뉴 로그인 연계 (웹 에서 만)
  * 필고에서 모든 서브 메뉴에 idx, session_id, nickname 이 전달 된다. 이것은 정확히 app 에서 필요 한 것이고 로그인을 할 수 있는 것이다.
  * 필고에 로그인을 한 상태에서 chat.philgo.com 으로 접속하면 그냥 바로 로그인 상태를 유지 할 것. nickname 을 그대로 사용 할 것.
  * Angular 에서 cookie 를 읽을 수 있는 매우 간단한 자바스크립트를 넣는다.

* @done 로그인을 했으면, 무조건 내방 목록 페이지부터 방문을 하도록 한다. 플래그 변수를 두어서 처리를 한다. 그렇지 않으면 아래와 같은 문제가 발생한다.
  * '내 방 목록 페이지' 접속하지 않고, 방이나 전체 방에 먼저 들어가면, 내 방 목록을 listen 하지 않는다. 이와 같은 경우,
    * 내가 채팅 방안이나, 전체 방 목록 페이지 있으면, 새 메세지가 와도 못받는다. 왜냐하면 내 방 목록을 listen 하지 않았기 때문이다.
    * 내가 먼저 채팅 방 (A) 안에 접속 했다가 '내 방 목록 페이지'로 가면, 채팅 방 (A) 는 Navigation Stack 안에서 계속 살아 있다.
      따라서, 내가 '내 방 목록 페이지'에 있지만, 여전히 채팅방 (A)에 있는 것과 마찬가지가 되며 새 메시지가 오면 채팅방(A) 가 받는다. 왜냐하면 채팅방 (A) 가 살아 있기 때문이다.
      이 상황에서 채팅방 (B) 로 들어가면, 예상치 못한 문제가 발생할 수 있다. 왜냐하면 채팅방 두 개에 동시 접속을 하는것이 되니까.

  * [해결] 이건 아래와 같이 두가지 문제로 해결 했음.
    * 웹 인경우만 처리 하면 됨
    * (방 목록에 들어자 않고) 방에 바로 들어가면 나의 모든 방을 listen.
    * 해당 방을 나가면, (방 목록에 들어가지 않은 경우) 웹을 리프레시해서, 메인으로 이동.

* cordova 에서 백 버튼 클릭하면 뒤로 안감. 수정 할 것.

* sonub 알파 0.2 버전 발표.

## Todo later after publish

* 다른 카톡 단톡방에 광고
  * 강사들의 안쓰는 카톡 아이디를 하나 내 컴으로 연결
  * 필고 chat.philgo.com 링크 붙여넣기를 하면, 채팅 방에 멋진 광고 로고가 멋지게 떠서,
    필고 광고가 아닌 것 처럼 광고를 한다.

* 상단 메뉴에 [필고 챗 앱 설치] 메뉴를 두며, 여러 페이지에 앱 설치를 표시 할 것.

* topic 푸시 알림이 확실히 좀 문제 있어 보임. 확실히. 확실히. 체크를 할 것.
  * 크롬이 새로운 방을 만들고, 크롬만 입장하고, 채팅을 하면, 아무도 푸시를 아직 받으면 안되는데, 카나리가 푸시를 받음.
    * 이론적으로는 로컬컴에서 테스트 할 때, 방번호, 회원 번호가 실제 서버와 섞이면 그럴 수 있다.
    * 또는 하나의 아이디로 웹브라우저를 번갈아가면서 사용했다면 그럴 수 있다.
    * 이 경우, DB 에서 푸시 토큰을 다 지우고, 채팅방을 다 지우고 해야 가능 할 수 있다.
  무엇보다 topic 에 누가 들어가 있는지를 알수 없음. 컨트롤이 안됨. PHP ADMIN SDK 로 한번에 여러 토큰으로 보내는 기능이 없다.
  그래서 그냥 Multi CURL 로, 눈으로 직접 회원번호,방번호,token 을 확인하고 보내는 것이 현명한 방법인 것 같다.
  한번에 255 개씩 보냄. 1천개라도 금방 보냄.

* 채팅방 상단 메뉴에, 설정 옆에, 알림 표시를 하는 종 아이콘, 그리고 토글 아이콘을 두어서, 알림 켬/끔을 표시 할 것.
* 각 방 목록 상단에 필고 로고와 링크 표시.
* 메뉴에 필고 홈/장터/질문/자유게시판 링크.

* 설정에
  api 주소, file 서버 주소, 새 파일 서버 주소를 관리자 인 경우에만 표시를 한다.

* Follow [Git issus board](https://github.com/thruthesky/philgo-chat/issues/new#issue-sh-boards)

* 필고 운영자 페이지 필터링 단어 필터링. 필고와 동일한 알고리즘.
* 관리자의 채팅방 설정 페이지. 별 레벨 제한과 사용자 별 허가. 레벨을 높게하면, 모두 채팅 차단하는 효과가 있고, 원하는 사용자만 허가 할 수 있음.

* 공지
  서버에서 php 로 공지를 하면,
  ion-card 로 방목록위에 보여 준다. 클릭하면 전체 공지 보기.

* 공지 푸시.
  필고/tests/messaging-topic-send-all.php 를 보고, 필고 관리자 페이지에서 간단히 푸시를 할 수 있도록 할 것.

* 누가 새로운 방을 생성하면, 전체 공지.

* 싸움이 발생하면 공지.
  * 회원들이 싸우는 다고 신고를 하면, 아래와 같이 공지를 한다.
  * xxxx 채팅방에서 싸움이 발생했습니다.

* 사진을 업로드하면, ... 안드로이드 앱에서는 반응이 느리다. 그래서, 사진을 선택하자 마자, 뭔가 좀 바로 보여 줄 수 있도록 한다.

* 일반 파일 업로드 기능. 업로드는 잘 된다. 사진과 다르게 보여주면됨.

* 않읽은 채팅이 있는 방만 따로 모아서 보기. 카톡에는 이게 없어서 불편했다. 그리고 천체 읽음으로 표시하기 기능.

* 사진 삭제 기능이 필요한가?
  * 그렇다면 메시지 삭제 기능도 똑 같이 삭제 할 수 있어야 하지 않나?

* 카톡처럼
  채팅 창 옆에 [+] 를 누르면 사진선택, 카메라, 이모티콘, 게시판, 파일 전송 등을 먼저 보여주고, 다음 옵션을 진행하도록 한다.

* 메시지 별로 몇명이 읽었는지는 채팅 방의 메시지 목록에서 [실시간 업데이트](.)가 되어야 의미가 있다.
  * 지금 현 상태로도 가능하지 않나?
    내 방목록에서, 새로운 메시지가 있으면, 전달 받고, 토스트한다.
      그 토스트를 하고, 해당 방의 숫자를 1 증가시키면 되낟.
    누가 들어오고 나가고 하는 것도, 마찬가지로 메시지가 전달된다. 따라서 해당 숫자를 방안이나, 전체 방 목록에서 업데이트하면된다.
    * socket.io 를 구현하면 DB 와 연동이 어려워 문제다.
    * Firebase 로 하면, 비싸 질 수 있지만, value_changed 이벤트로 최소한의 필드만 받을 수 있도록 해야 한다.
  * 꼭 필요하지만, 성공적으로 운영되면 한다.
  * 방 인원수 ( 전체 방, 내가 들어 있는 방 업데이트 )
  * 새로운 채팅 수 증가. 내 방 목록.

* rooms 페이지에 읽지 않은 메세지 표시. ( 각 채팅방 별 읽지 않은 메세지 구현 )
  * Ionic Badge 로 표시.
  * 먼저 채팅방에서 읽은 맨 마지막 메세지의 글 번호를 기록한다.
  * 방 목록을 할 때, "각 방의 마지막 메세지 확인 글 번호" 다음 부터의 총 메세지 수를 구하면 된다.
  * 그리고 실시간으로 메세지가 오면 수를 증가시키면 된다.
  * 총 읽지 않은 메세지의 수를 메뉴 맨 상단에 표시한다.

* 채팅방 채팅 메세지 검색. ==> 채팅 방안에 보여주지 말고, 별도의 창을 열어서 검색 결과를 보여준다. 사용자 아이디별 검색 가능하도록 할 것.
* 이전 채팅 글 보기. ==> 채팅 방안에 보여주지 말고, 별도의 창을 열어서 보여 줄 것. ( 두번, 세번 생각했음. 그냥 새창에 이전 내용 보여 줄 것. )

* 새 메세지 알림 토스트 클릭시 방 이동
  * [->] 클릭하면 해당 채팅방으로 가기
  * 또는 [x] 표시 클릭하면 닫기.
  * 그런데, toast 는 닫기만 할 수 있다.
  * 해킹을 해야지만 가능.

* 카톡 처럼 채팅창 엽에 [+] 버튼을 둘 것. 전송 버튼은 사실 필요하나?

* 새 메세지 소리 알림 옵션

* All rooms 는 기본적으로 사용자 수가 많은 3백 개의 방을 가져오고 나머지는 검색하도록 한다.

* 필고 홈페이지 공개 옵션. 더 많은 사용자가 볼 수 있고. 더 많은 채팅 유저를 확 볼 수 있음.
  * 자유게시판, 질문답변 게시판은 기본 연동.
    * 질문답변 방을 클릭하면, 서브 방 목록으로, 각 질문글이 하나의 방이 됨.
      * 질문 글 방으로 접속. 대화를 하면 코멘트로 기록 됨.
      * 단, 질문/자유 게시판은 48시간이 지나면 더 이상 채팅이 불가능해 짐. 방장이 방 종료 할 수 있음.
      * 단, 홈페이지에서는 코멘트가 여전히 가능.
      * 이렇게 하려면 채팅 할 때, api_chat_message, firebase, qna 게시판 코멘트에 기록을 해야 한다.
      * 홈페이지에서 코멘트를 할 때, api_chat_message, firebase, qna 코멘트 에 기록을 해야 한다.

    * 하나의 글을 자동으로 채팅방으로 된며, 질문글 또는 자유게시판 글을 클릭하면 자동으로 api_chat_room 이 생성되는 등의 절차가 진행된다.

  * 나머지 채팅방은 방장이 공개 할 지 선택하며, 공개된 채팅방은
    채팅 앱 내에서, '채팅 기록' 별도의 메뉴에 게시판 처럼 분류 별로 볼 수 있다.
    이것은 필고 홈페이지에서 채팅방 로그인 또는 채팅방에 입장하지 않고 볼 수 있는 것이다.
    따라서 채팅 쓰기는 안됨.

* 필고 자유게시판, 질문게시판을 메뉴에 추가 할 것.

* 방장 기능. 방장이 접속 차단(쫒아내기), 글 입력 차단을 할 수 있음.
  * 방장이 불법 광고 글을 막지 못하면, 방 자체를 블럭 시킴.

* 누구나 신고 할 수 있는 기능. 신고를 하면, 5레벨 이상의 사용자가 차단을 할 수 있음.

* 방 홍보 기능. 포인트로 하며 1 포인트당 1 뷰를 필고 홈페이지에 함.

* 백그라운드 설정을 할 수 있도록 할 것. 특히, 제목 부분에 방 이름 대신 이미지로 할 수 있도록 할 것.


## Done and Finished list

* @done 푸시 아이콘 변경.
  * 웹과 앱 모두 바꾸어야 함.

* @done 앱 아이콘 및 splash 작업.

* @done 푸시 클릭시 chat.philgo.com 으로 이동.
  * 앱은 필요 없음. 앱에서는 앱이 완전히 종료되어도 푸시가 오고, 푸시를 클릭하면 자동으로 앱이 실행됨.

* @done 웹앱을 chat.philgo.com 으로 배포 해서 테스트.
  * 크롬과 카나리가 푸시가 섞인 것 같다. 윈도우즈, 맥, 모바일 웹, 앱, 여러 컴퓨터로 테스트 해 볼 것.
  * v8.philgo.com 에 chat.philgo.com 을 호스팅한다.

* @done 회원 가입 시 이메일/닉네임 앞뒤 공백 제거.

* @done 사진 업로드시, 푸시 알림에. 사진을 업로드했습니다로 변경.

* @done push notificatoin for web and app
  * https://beta.ionicframework.com/docs/native/firebase-messaging
  * 한 사용자 당 push token 이 수십개 일 수 있다.
    * 필고 push_tokens 테이블에 domain 필드를 추가해서, chat 으로 기록을 한다.
  * 웹브라우저에서 알림을 허용해야지 채팅방에 입장 가능하다고 한다.
  * 모든 사용자는 전체 토픽에 참여를 해서, 공지를 할 수 있도록 한다.
  * 각 방마다 토픽을 만든다.

* @done app 에서 push notificatoin
  * 앱은 별도 허가를 받지 않는다.

* @done 누가 입장한 것은 푸시 알림 하지 말 것.
  * 단, Firebase Realtime DB 로 전송해서, 전체 알림을 한다.

* @done 파일 업로드 in cordova.
  * 채팅 파일은 가장 단하게 [DO Valume 추가와 File Server](https://docs.google.com/document/d/1mJrvlq_TxH_t9K0_32mgjJW29djeoWY40261jHVYXjc/edit#heading=h.o1vnfl7avheq) 로 한다.
  * do it with cordova file upload. capacitor 는 아직 불완전해서, 급하게 앱 개발해야하는데, 애로점이 많아 보인다. 그래서 그냥 cordova 로 한다.
  * use phone camera to upload file.

* @done Profile 사진 업로드
  * 채팅 파일 전송과 동일하게 할 것.

* @done 로그인을 하지 않아도, 방에 들어 갈 수 있다. 단, 쪽지 전송은 방 생성 등은, 로그인을 해야만 한다.

* @ok Race condition test.
  * 확실히 테스트를 해 보지는 않았지만, 100 개의 메세지를 루프로 돌려본 결과 오류가 없이모두 전달 되는 것 같았다.
  * Firebase readtime database 에 1개의 node 에 update 만으로 새로운 채팅 메세지를 알림하는데,
    동시에 여러명이서 정말 동시에 채팅해도, 잘 되는가?
    웹브라우저에서 /room/3?test=run 와 같이 입력하면, 1부터 1천까지 데이터를 전송하고 올바로 받았는지 확인을 한다.
    즉, 자신의 웹브라우저에서 자신의 대화만 체크를 하는 것이다.
    서로 다른 컴퓨터 또는 동일한 컴퓨터에서 서로 다른 브라우저로 테스트를 한다.

* @done My rooms 는 내 방만 가져오고

* @done 기본적으로 내가 속한 모든 채팅 방을 다 listen 한다. 그래서 톡이 있으면 메인이나 푸시로 알려준다.

* @done 채팅방 개설한 후 자동으로 방으로 들어 갈 것.

* @done my rooms | all rooms | create room 을 메뉴로 옮김.
* @done seaerch box all rooms 에만 보여 줌.
* @done 방나가기 기능.
  * 방으로 들어가서, 메뉴에서 방 나가기 버튼을 클릭해야 함.
* @done 누가 들어오고 나가면, 그 방 안에 사람만 안내. 메세지에 특별한 옵션을 지정해야 함.

* @done 마지막 사용자가 방을 나가면, 방을 삭제한다.
* @done 전체 방 목록에서 클릭하고 방에 들어가거나, 직접 방에 들어가도, 각 방에서 enter 를 하고 각 방의 새로운 메시지를 listen 한다.


* @done 내가 들어가 있는 방은 전체 목록에서 보여주지 말 것.

* @done 로그인을 하지 않았으면, 자동으로 All room 을 보여준다.

* @done 여기서 부터. DB 에 favorite 필드를 추가 해 놓았다.
  PHP 에 chatRoomFavoriteAdd()/delete() 부터 만드는 것 부터 해야 할 것.

* @done 방 별 인원수 - 전체 방에만.

* @done 방 별 새 메세지 개 수 - 내 방 목록 페이지에만.
  api_chat_my_room 에 각 방별로 맨 마지막에 확인한 메세지의 idx 를 적어야, 새 메세지 개수를 구 할 수 있다.
  * 채팅방에서 메시지가 오면(읽으면), 해당 idx 를 api_chat_my_room.idx_last_read 에 기록해서, 내가 특정 방에서 몇 번째 메시지 까지 읽었는지 기록한다.
    * 이를 통해서, 특정 방에 총 몇개의 새로운 메시지가 있는지 알 수 있다.
    * 문제. 너무 많이 자주, PHP 로 MariaDB 를 업데이트 해야하지만, 그래도 하자.

* @done 북마크에 추가한 채팅방이 맨 위로, 그 다음으로 읽지지 않은 채팅방들 목록, 그 다음으로 무작위 나머지 목록.
  * 북마크이며 내 방인 경우, 내방 표시 아이콘이 보인다.
    * 하지만, 북마크 된 것이므로, 맨 위에 보인다.
    * 북마크 안된 내 방은, 그냥 보인다.

* @done 로그인을 하지 않은 경우, 방 입장시...
  * help.html 참고

* @done 내가 속한 방에서 사진이 업로드되면, 다른 방에 있을 때, 새 메시지 알림 창이 공백이 된다.
  * ' .... 방에 사진이 업로드되었습니다.' 라고 표시 할 것.

* @done 사진을 보여 줄 때, 스크롤이 먼저되고 나서, 사진을 보여주므로, 사진이 밑에 보이거나, 스크롤이 끝까지 안된다.
  사진이 완전히 보여지면 스크롤을 한번 더 해야한ㄴ다.
    사진이 완뢰는 이벤트는 찾을 것.

## 개발

$ ionic s ; 웹 serve
$ ionic cordova run android -l ; 앱 serve

## 빌드 및 배포

### 웹사이트로 배포

* 웹 사이트로 빌드와 배포를 하려면 아래와 같이 하면 된다.

```` sh
npm run publish
````

## 개발 환경, 정보 및 각종 서버 환경 및 정보

* [Ionic Pro 의 philgo-chat 프로젝트](https://dashboard.ionicframework.com/app/1c4a1ca7/deploy/builds)에서 앱 빌드 및 Deploy.
* 웹은 chat.philgo.com 에 배포. v8.philgo.com 과 동일한 서버이다.
* file_server 는 아래와 같이 file.philgo.com 서버에 설치했다.
  * $ git clone https://github.com/thruthesky/file-server public_html
  * 접속 URL: https://file.philgo.com/~file_server/index.php

* config.xml 의 package name 은 com.sonub.chat
  * 이에 따라서 Android keystoer information 을 작성하고 루트폴더에 저장.
  * firebase Project 에도 package name 을 com.sonub.chat 으로 작성.

```` sh
keytool -genkey -v -keystore com.sonub.chat.keystore -alias sonubchat -keyalg RSA -keysize 2048 -validity 10000
Enter keystore password:  
What is your first and last name?
  [Unknown]:  JaeHo Song
What is the name of your organizational unit?
  [Unknown]:  Withcenter IT Dept
What is the name of your organization?
  [Unknown]:  Withcenter
What is the name of your City or Locality?
  [Unknown]:  Clark
What is the name of your State or Province?
  [Unknown]:  Pampanga
What is the two-letter country code for this unit?
  [Unknown]:  PH

````

## 필리핀 단톡방 운영

## Resources

* 디자인 원본 파일은 tmp 폴더에 있다.
* 아이콘과 스플래시는 문서를 보고 한다.
* 앱 로고는 필고/etc/resources/sonub 폴더에 저장했다.
  * 경로: https://www.philgo.com/etc/resources/sonub/logo.png
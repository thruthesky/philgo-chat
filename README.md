# Philgo Chat

## TODO

* bug:
  채팅을 하면,  ==> RoomPage::constructor() => Got new message in the room: you should see it on chat box.  메세지가
    너무 많이 콘솔로그에 나옴.
    여러 방을 옮기면 특히 많이 나옴.

* 채팅방 개설한 후 자동으로 방으로 들어 갈 것.
* 내가 들어가 있는 방은 전체 목록에서 보여주지 말 것.
* 전체 방 목록에서 클릭하고 방에 들어가면 listen 이 안됨. 왜냐하면, listen 을 안했기 때문이다.
* 채팅방 검색이 안 됨.
* 방나가기 기능.
  * 방으로 들어가서, 메뉴에서 방 나가기 버튼을 클릭해야 함.
  * 카톡 처럼 채팅창 엽에 [+] 버튼을 둘 것. 전송 버튼은 사실 필요하나?

* 필고 로그인 연계
  * 필고에서 메뉴로 session id 를 전달해서 로그인을 할 수 있도록 한다.
  * for philgo login user, they can use chat. meaning, they can login with google in philgo and can use chat.

* user primary photo file upload uses philgo file server.
  * 실제 테스트 환경에서 테스트를 해 봐야 한다.

* while chat photo upload uses DO volumn.
  * 파일 업로드를 가장 단하게 [DO Valume 추가와 Wordpress API](https://docs.google.com/document/d/1mJrvlq_TxH_t9K0_32mgjJW29djeoWY40261jHVYXjc/edit#heading=h.o1vnfl7avheq) 로 한다.
  * do it with capacitor file upload.
  * use phone camera to upload file.

* @done 기본적으로 내가 속한 모든 채팅 방을 다 listen 한다. 그래서 톡이 있으면 메인이나 푸시로 알려준다.


* 새 메세지 알림 토스트
  * [->] 클릭하면 해당 채팅방으로 가기
  * 또는 [x] 표시 클릭하면 닫기.
  * 그런데, toast 는 닫기만 할 수 있다.

* 새 메세지 소리 알림 옵션

* rooms 페이지에 읽지 않은 메세지 표시. ( 각 채팅방 별 읽지 않은 메세지 구현 )
  * Ionic Badge 로 표시.
  * 먼저 채팅방에서 읽은 맨 마지막 메세지의 글 번호를 기록한다.
  * 방 목록을 할 때, "각 방의 마지막 메세지 확인 글 번호" 다음 부터의 총 메세지 수를 구하면 된다.
  * 그리고 실시간으로 메세지가 오면 수를 증가시키면 된다.
  * 총 읽지 않은 메세지의 수를 메뉴 맨 상단에 표시한다.

* 북마크에 추가한 채팅방이 맨 위로, 그 다음으로 읽지 않은 채팅방들 목록, 그 다음으로 무작위 나머지 목록.

* 로그인을 하지 않아도, 방에 들어 갈 수 있다. 단, 쪽지 전송은 방 생성 등은, 로그인을 해야만 한다.

* Ionic 앱 개발.

* push notificatoin for web and app
  * https://beta.ionicframework.com/docs/native/firebase-messaging
  * 한 사용자 당 push token 이 수십개 일 수 있다.
  * 웹브라우저에서 알림을 허용해야지 채팅방에 입장 가능하다고 한다.
  * api_chat_push_tokens 테이블을 만들어서 각 사용자별 모든 push token 을 관리한다.
  * 모든 사용자는 전체 토픽에 참여를 해서, 공지를 할 수 있도록 한다.
  
* platform 을 통해서 cordova 인지 아닌지를 분별한다.

* @done My rooms 는 내 방만 가져오고
* All rooms 는 기본적으로 사용자 수가 많은 3백 개의 방을 가져오고 나머지는 검색하도록 한다.

* 필고 홈페이지 공개 옵션. 더 많은 사용자가 볼 수 있고. 더 많은 채팅 유저를 확 볼 수 있음.
  * 자유게시판, 질문답변 게시판을 연동.
    * 하나의 글을 자동으로 채팅방으로 생성되게 할 것.
    * 게시판에 글을 쓸 때, 실시간 대화방으로 연결 옵션을 둔다. 기본 선택.
    * 글 쓴이가 채팅방 종료 할 수 있음.

* 필고 자유게시판, 질문게시판을 메뉴에 추가 할 것.

* 방장 기능. 방장이 접속 차단(쫒아내기), 글 입력 차단을 할 수 있음.
  * 방장이 불법 광고 글을 막지 못하면, 방 자체를 블럭 시킴.

* 누구나 신고 할 수 있는 기능. 신고를 하면, 5레벨 이상의 사용자가 차단을 할 수 있음.

* 방 홍보 기능. 포인트로 하며 1 포인트당 1 뷰를 필고 홈페이지에 함.

* 백그라운드 설정을 할 수 있도록 할 것. 특히, 제목 부분에 방 이름 대신 이미지로 할 수 있도록 할 것.

## 필리핀 단톡방 운영

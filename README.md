# Philgo Chat

## TODO

* firebase 에 php sdk 로 실시간으로 채팅 저장까지 했음. 나의 모든 방에 .on() 으로 해야한다. .off() 는 방 나가기를 클릭했을 때만 한다.

* no google, facebook login in chat app itself.
  * for philgo login user, they can use chat. meaning, they can login with google in philgo and can use chat.

* user primary photo file upload and chat photo upload.
  * do it with capacitor file upload.
  * use phone camera to upload file.

* 기본적으로 내가 속한 모든 채팅 방에 다 listen 해야한다. 그래서 톡이 있으면 메인이나 푸시로 알려주어야 한다.

* 채팅에 파일 첨부는 file.philgo.com 에 새로운 코드를 만들어서 할 것.
* 자유게시판, 질문답변 게시판의 하나의 글을 자동으로 채팅방으로 생성되게 할 것.
  * 게시판에 글을 쓸 때, 실시간 대화방으로 연결 옵션을 둔다. 기본 선택.
  * 글 쓴이가 채팅방 종료 할 수 있음.

* 로그인을 하지 않아도, 방에 들어 갈 수 있다. 단, 쪽지 전송은 방 생성 등은, 로그인을 해야만 한다.

* push notificatoin for app
  * https://beta.ionicframework.com/docs/native/firebase-messaging
  * 한 사용자 당 push token 이 수십개 일 수 있다.
  * 웹브라우저에서 알림을 허용해야지 채팅방에 입장 가능하다고 한다.
  * api_chat_push_tokens 테이블을 만들어서 각 사용자별 모든 push token 을 관리한다.
  * 모든 사용자는 전체 토픽에 참여를 해서, 공지를 할 수 있도록 한다.
  
* platform 을 통해서 cordova 인지 아닌지를 분별한다.

* My rooms 는 내 방만 가져오고
* All rooms 는 방이 1천개, 1만개 이상 될 수 있으므로 페이징을 해야 한다.

* @todo my room 에서 내가 마지막으로 채팅한 방 목록 5개.
* @todo my room 에서 내 방의 마지막으로 채팅이 있는 방들 중 가장 최근 5개.
* @todo rooms페이지에서 footer 에 최근 채팅을 방이름 - 채팅 으로 보여 줄 것.

* 필고 홈페이지 공개 옵션. 더 많은 사용자가 볼 수 있고. 더 많은 채팅 유저를 확 볼 수 있음.
* 방장 기능. 방장이 접속 차단(쫒아내기), 글 입력 차단을 할 수 있음.
* 방 홍보 기능. 포인트로 하며 1 포인트당 1 뷰를 필고 홈페이지에 함.

* 백그라운드 설정을 할 수 있도록 할 것. 특히, 제목 부분에 방 이름 대신 이미지로 할 수 있도록 할 것.

## 필리핀 단톡방 운영

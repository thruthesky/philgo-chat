# Philgo Chat

## Documents and Resources

* Ionic v4 핵심가이드 참고.
* Philgo Chat App is using these git modules.
  * [PhilGo Api](https://github.com/thruthesky/philgo-api)
  * [Angular Library](https://github.com/thruthesky/angular-library)
  * [Language Translate](https://github.com/thruthesky/language-translate)
  * [PhilGo Api Component](https://github.com/thruthesky/components)

* [PhilGo Api Example](https://github.com/thruthesky/philgo-api-example)
* [PhilGo API v4 Document](https://docs.google.com/document/d/1E_IxnMGDPkjOI0Fl3Hg07RbFwYRjHq89VlfBuESu3BI/edit#)

## 목표

* 필리핀 로컬 앱.
  * 필고 연동 + 필리핀에 있는 외국인들을 대상 + 채팅 커뮤니티 앱 + 여행 앱.
  * 명칭 소너브
  * 회사 주소가 Withcenter, Inc. Pamapanga 이므로 필리핀 앱이 맞다.
  * 하나의 프로젝트에 multi-app 으로 해서 메인페이지/메뉴만 다르게 해서 여러 웹/앱을 찍어 낸다.

## TODO

* 2018년 9월 1일 업데이트 발표
  * @done 모든 컴포넌트를 components, philgo-api-chat-component git repo 에 저장하고, subtree 로 작업을 한다.
    로그인, 로그아웃, 회원 정보, 회원 탈퇴, 각종 채팅 페이지 등등.
      각 페이지는 별도의 모듈로 한다.
      등등...
    그래서, 컴포넌트 별 관리가 편하게 하고 확장이 쉽게 한다.
    내방 목록과 전체 방 목록 페이지를 분리한다.

    * 글/채팅글 을 클릭하고 오래 있으면, 글 내용을 복사 할 것.

  * @done 전체 방 검색 버그 수정.

  * @done 전체 방 목록으로 돌아가기하면,
    방부터 접속한 경우, 무조건 홈으로가야하는데, 잘 안된다.
    수정할 것.
    room.page.ts::onClickLeaveButton()
  * @done 나의 채팅방 목록 페이지에서 실시간
    새 메시지 수,
    총 메시지 수 업데이트.

  * @done 나의 채팅방 목록 => '...'님의 대화방 목록으로 변경.

  * @done 채팅 방 인원 목록

* @done 않읽은 채팅이 있는 방만 따로 모아서 보기. 카톡에는 이게 없어서 불편했다.

* @done 방 목록/입장 로딩 타임을 빠르게 할 것.
  ==> philgo api readme 확인.

  방목록, 방입장, 방나가기 등을 할 때, 각 방마다 마지막 글 30개씩 로드해서 캐시에 보관하고 philgo.myRooms 에 업데이트한다.
  각 방마다 맨 마지막 글을 밑에 보여 준다.
  방 입장시 캐시된 정보를 먼저 보여준다.
  또한 다른 위치에 있을 때, 메시지가 전달되면, philgo.myRooms 에 업데이트를 한다.

  * @done 필고 관리자가 필고 관리자 페이지 채팅방 관리 메뉴에서
    * 채팅방 선택 후 삭제.


  * @done 설정에
    앱정보 버튼을 두고, 클릭하면, 팝업으로
    api 주소, file 서버 주소, 새 파일 서버 주소를 표시를 한다.

  * @done 언어 설정.
    * 설정에 언어 추가 philgo-chat 에서는 기본 언어를 한글로 한다.
    * 앱이 서로 접속 할 때 항상 ?lang=ko 로 해서 접속한다. 로그인한 사용자의 경우 회원 정보의 language code 를 우선한다.
    * 그래서 PHP 에서 항상 한글로 리턴하게 한다.

 * @done $ node doctor.js 를 해서 언어 설정 중 몇개가 빠져 있거나 안되었거나 이미지 크기가 크거나 등의 에러를 찾아낸다.

  * @done 방장 기능. 글 입력 차단을 할 수 있음.
    => 방 이름 변경 가능.
    => 방 설명 변경 가능.
    => 방장이 공지를 설정하면, 누구든지 방에 들어오면 공지가 팝업으로 뜬다.
      => 일주일 동안 보여주지 않기 버튼을 클릭 할 수 있으며,
      => 방장이 공지 사항을 바꾸면 새로 공지가 뜬다.

  *@done  넓은 화면에서는 보다 자세한 정보를 보여 줄 수 있도록 한다. 총 사용자 수: 등.

* @done 로그아웃을 하면 전체 방으로 이동. 내 방으로 이동 못하게 할 것.

* @done 로그인을 하면, 전체 방 목록을 새로 읽는다. (이전 사용자의 방 목록이 보임)

* @done 웹브라우저 파비콘 변경.

* @done 사진 파일 업로드 및 채팅 메시지 업로드

* @done 채팅방 상단 메뉴에, 설정 옆에, 알림 표시를 하는 종 아이콘, 그리고 토글 아이콘을 두어서, 알림 켬/끔을 표시 할 것.
  => 이거 꼭 필요한가? 꼭 필요하다.
  => 카톡도 알림을 안받으려면 그냥 방을 나가버거나 알림을 끈다.
  => 1:1 개인톡이나 지인과의 톡은 괜찮지만, 수천명이 들어가는 장터 톡은 반드시 알림을 끈다.
    안그러면 그 톡방에는 들어갈 수가 없다.
  => 토글을 하면, 회원 토큰을 모두 unusbscribe 한다. 그리고 chat_my_room 표시를 해 놓고, 다음 입장때, subscribe 를 하지 않는다.
  
* done 채팅방 목록에 알림 받는 상태이면 종 표시.

* 채팅 방에 들어 갈 때, 서버로 부터 새로운 정보(채팅 메시지)를 받아오는데, 로더 표시를 ion-loading 으로 한다.

* 일반 파일 업로드 기능. 업로드는 잘 된다. 사진과 다르게 보여주면됨.

* 몇 몇 URL 은 새 창으로 열기를 한다.
  필고 URL, Facebook URL, URL 에 naver, daum, blog 가 들어가는 URL 등.

* 채팅방 채팅 메세지 목록 및 검색
  => 채팅 방안에 보여주지 말고, 별도의 페이지로 열어서 검색 결과를 보여준다.
  => 검색어 입력 및 사용자 아이디별 검색 가능하도록 할 것.
  => 별도의 페이지로 만들어서, 필고에서 메뉴에 링크를 걸고 https://chat.philgo.com/search 와 같이 접속 할 수 있도록 한다.
  => 메뉴에 채팅 검색을 두어서 바로 전체 채팅 검색을 할 수 있도록 한다.
  => 그리고 각 방에서는 modal 로 열어서 보고, 창 닫으면 이전 채팅 방에 그대로 남을 수 있도록 한다.
  
* 필고 홈페이지에 채팅 메뉴 링크
  => 필고 홈페이지에서 채팅 내용을 검색하지 않도록 한다. 별 쓸모 없어 보인다.

* 버그
  앱 부팅 => 앙헬 방 입장 => 도움말 => 내방목록 => 앙헬방목록을 하면, 앙헬방이 ionic life cycle 에 의해서 맨 밑에 살아 있다. 이 같은 경우 문제가 된다.
  이 문제는 전체방 => 앙헬 방 => 도움말 => 내방 목록과 같이 할 때에 에러가 발생한다.
  뿐만아니라 실제로 여러가지 상황에서 동일한 에러가 발생한다.
  따라서, 앱 부팅시 무조건 맨 처음 내방/전체방 목록으로 가는 것도 문제를 해결하지 못한다.

  해결 방법은 내방 목록 또는 전체 방 목록을 할 때, 채팅방이, ionic life cycle 에서, nav stack 아래에 있으면 앱을 리프레시 한다.
  즉, 방 목록에서 refresh 를 해야하는 것이다.


  * 필고 메인 메뉴/모바일/데스크톱에 등록.


* 모든 부분 언어 번역
* 구글 플레이 스토어 앱 정보 업데이트 할 것.

* 발표

### 2018년 9월 10일 업데이트 뱔표


* URL preview 를 한다.

* 카톡처럼
  채팅 창 옆에 [+] 를 누르면 사진선택, 카메라, 이모티콘, 게시판, 파일 전송 등을 먼저 보여주고, 다음 옵션을 진행하도록 한다.

* 공지
  서버에서 php 로 공지를 하면,
  ion-card 로 방목록위에 보여 준다. 클릭하면 전체 공지 보기.


* 공지 푸시.
  필고/tests/messaging-topic-send-all.php 를 보고, 필고 관리자 페이지에서 간단히 푸시를 할 수 있도록 할 것.

  * 앱에 게시판 기능을 넣는다. (글/코멘트) 목록/읽기/쓰기/업데이트

  * 메뉴에 필고 홈/장터/질문/자유게시판 링크.


  * 질문게시판, 자유게시판에 새 글이 올라오면,
    => '질문게시판: xxxx 는 어디가면 살 수 있나요?' => 답변하기
     와 같이 전체 채팅방에 채팅으로 입력을 해 준다.
    => 클릭을 하면 해당 게시물을 보여준다.


  * chat info 에서 채팅 방 전체 설정을 가져와서, 회원 전용, 채팅 레벨, 파일 첨부 레벨을 미리 읽어,
    서버로 (특히 파일을 서버로) 전송하기 전에, 미리 점검해서 에러를 내도록 한다.



  * 방장 기능 강화
    => 방장은 글쓰기 레벨 설정 할 수 있음. 200 레벨 이상으로 해서, 아무도 글 쓰지 못하게 할 수 있음.
    => 또한 글쓰기 권한을 기본적으로 막을 수 있음.
    => 방장은 방회원 별로 글쓰기 차단 또는 허용 할 수 있음.

  * 사용자가 특정 방 배경 색깔을 변경 할 수 있도록 한다.

  * 누구나 신고 할 수 있는 기능. 총 2명 이상 그리고 총 10 레벨이 되면 해당 글은 자동 차단.

* 전체 채팅방 검색. 공개 채팅방이어서, 채팅 테이블 전체를 검색 할 수 있도록 해서, 결과를 보여 줄 수 있다.

* 핵심 내용.
  * 신 장터. 기존 장터를 놔 두고, 새로 장터 만들기.
    1 업체 1 광고. 즉, 중복 광고는 안된다. 다만, 점프를 해서 24시간 동안 맨 위로 올릴 수 있음.
    * 즉, 글 쓴다고 해서, 바로 맨 위에 나오지 않음.
    * 필고에 공지 할 것.

### 2018 년 9월 중반. sonub.com 발표. Todo for Next version and Sonub

* 필리핀 커뮤니티 앱. 소너브. 별도 제작.
  * 필고 chat 에 껍데기만 바꿔서, sonub 제작.
  * 채팅방을 그룹으로 분리해서, 필고 채팅 그룹. sonub 채팅 그룹. 화상영어 채팅 그룹으로 분리해야 한다.
  * 사이트와 앱을 sonub.com 도메인으로 제작. 단, 필고 dB 와 firebase 를 사용한다.
  * 완전한 각종 게시판과 채팅을 중점
  * 한국인을 제외한 외국인을 위한 필리핀 커뮤니티 앱.
  * 언어 변환. 영어/한국어/일본어/중국어로 둔다.
* 자동으로 chrome 에서 add icon home screen 뜨도록 pwa 를 조정한다.
* 게시판을 위주로하는 실시간 업데이트 커뮤니티.
* 중고 장터.
* 필리핀 구인구직 게시판.
* 실시간 채팅.



* 앱에서 푸시 소리 커스터마이징
  /resources/res/bird.mp3 로 저장 해 놓았음.

* Follow [Git issus board](https://github.com/thruthesky/philgo-chat/issues/new#issue-sh-boards)

* 채팅방 한달 이상 오래된 사진 삭제 자동 삭제 기능?

### 기타 해야 할 목록

* [재검토] 채팅 스피드 개선
  [문제] 그냥 spinner 만 안보여줘도 사용자는 빠르게 느낄 것이다. 아래 설명과 같은 방식으로 하면 결국은 메시지를 다른 사용자에게 전송하는 것이 더 느려진다.

  현재 채팅을 하면, php 에서
    firebase realtime database 로 전송하고,
    fcm 서버로 방 topic 으로 push 를 해야하기 때문에,
    채팅을 한번 할 때 마다 spinner 가 오래 표시된다.

  이 문제를 해결하기 위해서는
    먼저, 채팅을 하면, DB 에 기록하고 곧 바로 리턴한다.
      즉, firebase realtime database 와 fcm topic 으로 push 를 하지 않으므로 속도가 매우 개선된다.
      
      대신, DB 에 기록하는 것은 채팅메시지 뿐이지만 'realtime' 필드를 empty 로 한다.

    그리고 클라이언트에서 응답을 받으면, 그 때 method=chat.realtime&idx=xxxx 를 호출해서, 메시지 테이블에서 'realtime' = '' 인 것들을 찾아서 'Y' 로 바꾸고 그 때서야, 필요한 firebase realtime db 업데이트, 해당 방 topic 으로 push 등을 한다.

    한번 realtime 할 때, 채팅 idx 를 입력 받아서, 내가 금방 채팅한 것을 먼저 realtime 으로 보내고,
      추가로 'realtime' = '' 인 것을 3개 더 찾아서 보낸다. 혹시나 실수로 기존의 것이 전송이 안되었을 경우가 있을 수 있으니 추가로 더 보낸다.


## Done and Finished list

* @done 필고 운영자 페이지 필터링 단어 필터링. 필고와 동일한 알고리즘.

* @done cordova 에서 백 버튼 클릭하면 뒤로 안감. 수정 할 것.

* @done 앱 실행이 안됨.

* @done 앱 푸시 테스트
  * 은수 및 다른 여러 핸드폰으로 해 볼 것.
* @done desktop 에서는 메뉴 숨기기 표시하지 않음.
* @done 채팅방 검색.
  * 단어가 입력되면, 기존 목록을 따로 변수에 저장하고, 기존 목록에서 매치되는 단어가 있는 채팅방을 목록해서 보여줌.

* @done 필고 홈페이지에 단톡방 링크는 이미 걸려져 있음. 방을 생성해야 함.

* @done 필고 기존 단톡방 링크를 모두 변경하거나, 기존의 단톡방 페이지에, philgo-chat 이 부팅되도록 함. in-page booting 은 ionic app 을 필고 루트에 저장해야 하기 때문에, 어려 울 듯.
  * 그냥 chat.philgo.com 으로 연결하는 것이 가장 좋을 듯.

* @done 배포 후, 채팅 방 목록 페이지에서 push 알림을 거절했으면 앱 다운로드 URL 링크.
  앱 설치, 하루동안 안보기, 일주일동안 안보기 옵션.

* @done 필고 메뉴 추가 및 로그인 연계 (웹 에서 만)
  * 필고에서 모든 서브 메뉴에 idx, session_id, nickname 이 전달 된다. 이것은 정확히 app 에서 필요 한 것이고 로그인을 할 수 있는 것이다.
  * 필고에 로그인을 한 상태에서 chat.philgo.com 으로 접속하면 그냥 바로 로그인된다.
  * 이미 로그인을 했거나, 필고 자동 로그인 후, 로그아웃하고, 다시 다른 아이디로 로그인을 할 수 있다.

* @done 언어 translation
  * ngx-translate 하지 말 것. 도저히 이해 할 수 없다.
  * src/app/modules/language-translate 로 작업 중. 템플릿에서 바로 변환을 한다.
  * 카메라 선택을
    '카메라로 사진찍기', '갤러리에서 선택하기' 로 이해하기 쉽게 할 것.
  * push notification 에서 allow 를 허용으로 번역할 것.
  * 앱 명칭.

* @done 홈페이지 주소 https://chat.philgo.com/room/마닐라 와 같이 접속 하도록 할 것.

* @done 앱 배포.
  * 새로운 핸드폰 Galaxy wide 에서, cordova 로 인식 못하는 것 같음. 그래서 push token 이 없음.
  * @done API 타겟이 26 이상이야 한다고 함. Ionic Pro 에서 어떻게 변경하지?
  * @done com.philgo.www 는 이미 사용중이라고 함. com.sonub.www 로 사용 할 것.

* @done 마지막 채팅 100개 가져오고. enter, leave 는 가죠오지 않기.

* @done 필고 아이디, 닉네임 으로 로그인 할 수 있도록 할 것.

* @done 로그인을 했으면, 무조건 내방 목록 페이지부터 방문을 하도록 한다. 플래그 변수를 두어서 처리를 한다. 그렇지 않으면 아래와 같은 문제가 발생한다.
  '내 방 목록 페이지' 접속하지 않고, 방이나 전체 방에 먼저 들어가면, 내 방 목록을 listen 하지 않는다. 이와 같은 경우,
    내가 채팅 방안이나, 전체 방 목록 페이지 있으면, 새 메세지가 와도 못받는다. 왜냐하면 내 방 목록을 listen 하지 않았기 때문이다.
    내가 먼저 채팅 방 (A) 안에 접속 했다가 '내 방 목록 페이지'로 가면, 채팅 방 (A) 는 Navigation Stack 안에서 계속 살아 있다.
      따라서, 내가 '내 방 목록 페이지'에 있지만, 여전히 채팅방 (A)에 있는 것과 마찬가지가 되며 새 메시지가 오면 채팅방(A) 가 받는다. 왜냐하면 채팅방 (A) 가 살아 있기 때문이다.
      이 상황에서 채팅방 (B) 로 들어가면, 예상치 못한 문제가 발생할 수 있다. 왜냐하면 채팅방 두 개에 동시 접속을 하는것이 되니까.
  ==> [해결] 이건 아래와 같이 두가지 문제로 해결 했음.
    웹 인경우만 처리 하면 됨
    (방 목록에 들어지 않고) 방에 바로 들어가면 나의 모든 방을 listen.
    해당 방을 나가면, (내 방 목록에 들어가지 않은 경우) 웹을 리프레시해서, 메인으로 이동.

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

* @done deploy 안됨.
  * 그래서 '## 앱 업데이트' 를 참고한다.

## 실행

$ ionic s ; 웹 serve. HMR 이 기본 동작한다. 기본적으로 사무실 서버 office.philgo.com 의 테스트 서버로 이용한다.
$ sl ; 웹 serve. HMR 이 기본 동작한다. 로컬 컴퓨터 깔리 philgo 작업 서버를 사용한다. 내부 IP 192.168.0.254 를 이용하여 모바일에서 접속 가능하게 한다.
$ ionic cordova run android -l ; 앱 serve. ionic serve 동시에 실행을 해도 된다.
$ node doctor.js ; 에러 체크. 번역이 안된 부분 등을 체크한다. 빌드전에 한번 실행을 해야 한다.

* 접속

```` html
http://cookie.philgo.com:8100/my-rooms ; for cookie login
````

## 빌드 및 배포

### 웹사이트로 배포

* 웹 사이트로 빌드와 배포를 하려면 아래와 같이 하면 된다.

```` sh
npm run publish
````

### 앱 빌드 및 배포

* 아래와 같이 release 바이너리를 빌드하면 philgo-chat.apk 파일이 생성된다. 이 파일을 구글 플레이스토어에 업로드하면된다.

```` sh
npm run cordova:build:install
````

* 아래와 같이하면 자동으로 release 바이너리 빌드 후, 핸드폰에 설치한다.

```` sh
npm run cordova:build:install
````

## 개발 환경, 정보 및 각종 서버 환경 및 정보 Development Environment

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

## 앱 업데이트

Ionic Pro v5 와 Ionic v4 를 함께 사용해서 Ionic Pro Deploy 를 하니 crash(앱로딩 스플래시 화면에서 멈춤)이 발생하여,

그냥 서버의 버전과 클라이언트의 버전을 비교해서 서버 버전이 크면 클라이언트에서 앱 업데이트를 하도록 했다.

### 업데이트 방법

* 앱이 새로운 버전으로 업데이트되었으면,

1. app.service::version 을 YYYYMMDDHH 로 업데이트를 한다.
2. api-library::CHAT_APP_VERSION 에 위 버전 값을 지정한다.

해설.

* 사용자가 먼저 앱을 설치 할 때, CLIENT 버전이 1111223344 와 같이 업데이트를 하고
* SERVER PHP 버전에도 같은 버전 값으로 업데이트 한다.
* 만약, 앱에서 업데이트를 안했으면, CLIENT 버전이 현재 서버 버전의 값 보다 작을 것이다.
  * 그러면 업데이트를 하라고 표시한다.
  * 업데이트를 했으면, 아무런 표시를 하지 않는다.

## 필리핀 단톡방 운영

## Resources

* bootstrap v4 utilities 를 포함학 있다.
* 디자인 원본 파일은 tmp 폴더에 있다.
* 아이콘과 스플래시는 문서를 보고 한다.
* 앱 로고는 필고/etc/resources/sonub 폴더에 저장했다.
  * 경로: https://www.philgo.com/etc/resources/sonub/logo.png
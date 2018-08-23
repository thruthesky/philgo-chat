import { Component, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';


import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AppService } from '../../../providers/app.service';
import { ApiChatRoomEnter, ApiChatMessage, PhilGoApiService } from '../../philgo-api/philgo-api.service';

@Component({
    selector: 'app-chat-room-input-component',
    templateUrl: './chat-room-input.component.html',
    styleUrls: ['./chat-room-input.component.scss']
})
export class ChatRoomInputComponent implements OnInit {

    @Output() send = new EventEmitter<ApiChatMessage>();
    @Output() removeMessageByRetvar = new EventEmitter<any>();

    countMessageSent = 0;
    roomInfo: ApiChatRoomEnter = <any>{};
    form: ApiChatMessage = <any>{};
    // messages: Array<ApiChatMessage> = [];

    // subscriptionNewMessage = null;
    constructor(
        private router: Router,
        // private activatedRoute: ActivatedRoute,
        public actionSheetController: ActionSheetController,
        private alertController: AlertController,
        private camera: Camera,
        public a: AppService,
        public philgo: PhilGoApiService
    ) {
        this.resetForm();
    }

    ngOnInit() {
    }

    resetForm() {
        this.form.message = '';
        this.form.url = '';
        this.form.type = '';
        this.form.retvar = '';
        this.form.percentage = 0;
    }

    onClickSendMessage() {
        if (!this.form.message) {
            // console.log('empty form.message. return');
            return;
        }
        // console.log('form: ', this.form);
        this.sendMessage();
    }

    sendMessage() {
        this.form.idx_chat_room = this.philgo.currentRoom.idx;
        this.form.idx_member = this.philgo.idx().toString();
        this.form.retvar = ++this.countMessageSent;

        /**
         * Assign to a new Object.
         */
        const m = Object.assign({}, this.form);
        this.send.emit(m);

        this.resetForm();

        this.philgo.chatSendMessage(m).subscribe(res => {
            /**
             * Update the new Object by reference.
             */
            m.idx = res.idx;
        }, e => this.a.toast(e));
    }



    onChangeFile(event: Event) {
        if (this.a.platform === 'cordova') {
            // console.log('Running in cordova. return in onChangeFile()');
            return;
        }
        // console.log('onChangeFile()');
        const files = event.target['files'];
        if (files === void 0 || !files.length || files[0] === void 0) {
            return this.a.toast('Please select a file');
        }

        // const message: ApiChatMessage = <any>{
        //   idx_member: this.philgo.myIdx(),
        //   message: ''
        // };
        // message['percentage'] = 33;
        // this.displayMessage(message);

        this.doFile(files);
    }


    /**
     * It does everything for file upload.
     * @param files FileList
     * @param dataUrl data url if it has. Cordova Camera returns base64, so it can have data url.
     */
    doFile(files, dataUrl = '') {
        if (!dataUrl) {
            // console.log('No dataUrl. Going to create an object!');
            dataUrl = URL.createObjectURL(files[0]);
        } else {
            // console.log('Got dataUrl already. no create object');
        }
        // console.log('url: ', url);
        const message: ApiChatMessage = <any>{ url: this.a.safeUrl(dataUrl), retvar: ++this.countMessageSent };
        this.displaySendingFile(message);
        this.philgo.fileUpload(files, {
            uid: this.philgo.myIdx(),
            secret: this.philgo.myIdx()
        }).subscribe(res => {
            if (typeof res === 'number') {
                // console.log('percentage', res);
                message['percentage'] = res;
            } else {
                // console.log('result ', res);
                // @todo 여기서 부터. 파일을 업로드하기 전에 먼저, 디스크의 파일을 보여주고,
                // 파일이 업로드 완료되고, 다른 사람들에게 채팅으로 모두 전달했으면,
                // 그 때, loader 를 없애고, percentage 를 없앤다.
                // message['percentage'] = 0;
                // message['message'] = `<img src="${res['url']}">`;
                // message.percentage = 0;
                this.removeMessageByRetvar.emit(message.retvar);

                this.form.type = res.type;
                this.form.url = res.url;
                this.sendMessage();
            }
        }, e => this.a.toast(e));
    }
    displaySendingFile(message: ApiChatMessage) {
        message.type = 'sending-file';
        // console.log('displaySendingFile: ', message);
        // this.displayMessage(message);
        this.send.emit(message);
    }

    /**
   * File upload button has been clicked.
   *
   * If it is cordova, then do camera.
   * If not, simply return.
   *
   * @param event click event
   */
    async onClickCordovaCameraIcon(event: Event) {
        // console.log('onClickFile()');
        if (this.a.platform === 'web') {
            // console.log('it is web. return.');
            return;
        }

        // console.log('cordova camera....');

        const alert = await this.alertController.create({
            header: this.a.tr.t({ ko: '사진', en: 'Photo' }),
            subHeader: this.a.tr.t({ ko: '사진 전송을 합니다.', en: 'Sending a photo.' }),
            message: this.a.tr.t({
                ko: '카메라로 사진을 찍어서 전송 할 수 있으며 갤러리에서 사진을 선택 할 수도 있습니다.',
                en: 'You can take a picture from Camera or select a photo from gallery.'
            }),
            buttons: [
                { role: 'camera', text: this.a.tr.t({ ko: '카메라로 사진 찍기', en: 'Take a photo using Camera' }) },
                { role: 'gallery', text: this.a.tr.t({ ko: '갤러리에서 선택하기', en: 'Select a photo from Gallery' }) },
                { role: 'cancel', text: this.a.tr.t({ ko: '취소', en: 'Cancel' }) }
            ]
        });


        await alert.present();
        const re = await alert.onDidDismiss();


        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.CAMERA
        };

        if (re.role === 'cancel') {
            return;
        }
        if (re.role === 'gallery') {
            options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
        }
        /**
         * 문제의 핵심은 Cordova Camera 로 받은 base64 데이터를 어떻게 <input type='file'> 과 같은 FileList 형의 데이터를 가져오는 것인가이다.
         * FileList 로 값을 가져오면 그냥 HTML 의 <input type='file'> 과 똑 같은 코드로 Angular 로 업로드하면 되기 때문이다.
         */
        const base64 = await this.camera.getPicture(options).then((imageData) => {
            return imageData;
        }, (e) => {
            // console.log(e);
            // console.log('Camera/Gallery cancelled');
            return '';
        });
        if (!base64) {
            // console.log('No data path or base64. just return');
        }
        // console.log('path: ', data);
        const blob = this.b64toBlob(base64);
        /**
         * File 와 FileList 타입의 변수를 만든다.
         * 그리고 그냥 일반 HTML FORM <input type='file'> 에서 파일 정보를 받아 업로드하는 것과 똑 같이 하면 된다.
         */
        const d = new Date();
        const name = d.getFullYear() + (d.getMonth() + 1) + d.getDate() + '-' + d.getHours() + d.getMinutes() + d.getSeconds() +
            '-' + this.philgo.myIdx();
        const file = new File([blob], name + '.jpg', { type: 'image/jpeg' });
        const files: FileList = <any>[file];

        const dataUrl = 'data:image/jpg;base64,' + base64;
        this.doFile(files, dataUrl);
    }


    /**
     *
     * Base64 데이터를 바이너리로 변경해서 리턴한다.
     *
     */
    b64toBlob(b64Data, contentType = 'image/jpeg', sliceSize = 512): Blob {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

}

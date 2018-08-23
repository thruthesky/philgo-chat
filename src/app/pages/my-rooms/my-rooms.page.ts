import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { PhilGoApiService } from '../../modules/philgo-api/philgo-api.service';
import { LanguageTranslate } from '../../modules/language-translate/language-translate';

@Component({
  selector: 'app-my-rooms',
  templateUrl: './my-rooms.page.html',
  styleUrls: ['./my-rooms.page.scss'],
})
export class MyRoomsPage implements OnInit {

  title = 'Loading...';
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService,
    public tr: LanguageTranslate
  ) {
    const name = philgo.name();
    this.title = tr.t({
      ko: `${name}님의 대화방 목록`,
      en: `Chat rooms of ${name}`
    });
  }

  ngOnInit() {
  }

}

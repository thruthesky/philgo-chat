import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { MyRoomsPage } from '../my-rooms/my-rooms.page';


@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.page.html',
  styleUrls: ['./../../modules/components/scss/index.scss', './all-rooms.page.scss']
})
export class AllRoomsPage implements OnInit {

  constructor(
    public a: AppService
  ) {
    console.log('AllRoomsPage::constructor()');
  }

  ngOnInit() {
  }

  onClickGoBack() {
    this.a.setRoot( this.a.home() );
  }
}

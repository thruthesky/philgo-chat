import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['../../modules/components/scss/index.scss', './forum.page.scss'],
})
export class ForumPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    console.log('ionview did enter');
  }
}

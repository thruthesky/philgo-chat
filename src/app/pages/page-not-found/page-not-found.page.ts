import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.page.html',
  styleUrls: ['./../../modules/components/scss/index.scss', './page-not-found.page.scss'],
})
export class PageNotFoundPage implements OnInit {

  constructor(
    public a: AppService
  ) { }

  ngOnInit() {
  }

}


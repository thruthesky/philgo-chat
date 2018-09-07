import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.page.html',
  styleUrls: ['./hub.page.scss'],
})
export class HubPage implements OnInit {

  constructor(
    public a: AppService
  ) { }

  ngOnInit() {
  }

}

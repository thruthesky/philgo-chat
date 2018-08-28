import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html'
})
export class HelpPage implements OnInit {

  constructor(
    public a: AppService
  ) { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { PhilGoApiService } from '../../../modules/philgo-api/philgo-api.service';
import { AppService } from '../../../providers/app.service';

@Component({
  selector: 'app-reminder-popover',
  templateUrl: './reminder-popover.component.html',
  styleUrls: ['./reminder-popover.component.scss']
})
export class ReminderPopoverComponent implements OnInit {

  constructor(
    public a: AppService,
    public philgo: PhilGoApiService
  ) { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { PhilGoApiService } from '../../modules/philgo-api/philgo-api.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})
export class JobPage implements OnInit {

  constructor(
    public philgo: PhilGoApiService
  ) { }

  ngOnInit() {
  }

}


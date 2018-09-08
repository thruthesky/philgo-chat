import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PhilGoApiService } from '../../modules/philgo-api/philgo-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})
export class JobPage implements OnInit, AfterViewInit {

  category;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    public philgo: PhilGoApiService
  ) {
    activatedRoute.paramMap.subscribe( params => this.category = params.get('category') );
    // console.log( philgo.pc );
  }

  ngOnInit() {
    // this.category = 'init';
  }


  ngAfterViewInit() {
    // setTimeout(() => this.category = 'after view init');
  }

}


import { Component, OnInit } from '@angular/core';
import { PhilGoApiService } from '../../modules/philgo-api/philgo-api.service';

@Component({
  selector: 'app-housemaid',
  templateUrl: './housemaid.page.html',
  styleUrls: ['./housemaid.page.scss'],
})
export class HousemaidPage implements OnInit {

  constructor(
    public philgo: PhilGoApiService
  ) { }

  ngOnInit() {
  }

}

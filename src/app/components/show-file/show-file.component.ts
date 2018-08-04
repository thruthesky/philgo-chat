import { Component, OnInit, Input } from '@angular/core';
import { ApiChatMessage } from '../../modules/philgo-api-v3/philgo-api.service';

@Component({
  selector: 'app-show-file',
  templateUrl: './show-file.component.html',
  styleUrls: ['./show-file.component.scss']
})
export class ShowFileComponent implements OnInit {

  @Input() message: ApiChatMessage;
  clicked = false;
  constructor() { }

  ngOnInit() {
  }

  onClickPhoto() {
    this.clicked = !this.clicked;
  }
}

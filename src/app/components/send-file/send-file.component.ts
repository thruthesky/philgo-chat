import { Component, OnInit, Input } from '@angular/core';
import { ApiChatMessage } from '../../modules/philgo-api-v3/philgo-api.service';

@Component({
  selector: 'app-send-file',
  templateUrl: './send-file.component.html',
  styleUrls: ['./send-file.component.scss']
})
export class SendFileComponent implements OnInit {

  @Input() message: ApiChatMessage;
  constructor() { }

  ngOnInit() {
  }

}

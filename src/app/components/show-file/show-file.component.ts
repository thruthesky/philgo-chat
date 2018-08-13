import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiChatMessage } from '../../modules/philgo-api-v3/philgo-api.service';

@Component({
  selector: 'app-show-file',
  templateUrl: './show-file.component.html'
})
export class ShowFileComponent implements OnInit {

  @Input() message: ApiChatMessage;
  @Output() load = new EventEmitter<any>();
  clicked = false;
  constructor() { }

  ngOnInit() {
  }

  onClickPhoto() {
    this.clicked = !this.clicked;
  }
  onImageLoad() {
    // alert('image loaded');
    this.load.emit();
  }
}

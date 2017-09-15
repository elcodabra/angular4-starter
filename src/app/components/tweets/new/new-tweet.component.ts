import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {BackendService} from "../../../services/backend.service";

@Component({
  selector: 'app-new-tweet',
  templateUrl: './new-tweet.component.html'
})
export class NewTweetComponent implements OnInit {
  @Input() placeholder: string = "";
  @Output() add = new EventEmitter<any>();
  model = {content: ''};

  constructor() { }

  ngOnInit() {
  }

  onAdd() {
    return this.add.emit(this.model)
  }
}

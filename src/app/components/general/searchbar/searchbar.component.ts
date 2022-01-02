import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  @Output() keyboardEventEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onKeyPressed(event: any): void {
    this.keyboardEventEmitter.emit(event.target.value);
  }
}

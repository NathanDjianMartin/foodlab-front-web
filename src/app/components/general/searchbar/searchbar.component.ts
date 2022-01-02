import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();
  @Input() title = '';

  constructor() { }

  ngOnInit(): void {
  }

  onKeyPressed(event: any): void {
    this.searchEvent.emit(event.target.value.toLowerCase().trim());
  }
}

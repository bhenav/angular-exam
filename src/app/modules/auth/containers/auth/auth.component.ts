import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'exam-auth',
  templateUrl: './auth.component.html',
  styleUrls: [ './auth.component.sass' ],
})
export class AuthComponent implements OnInit {
  @Input()
  back: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}

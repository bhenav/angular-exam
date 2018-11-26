import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'exam-block-container',
  templateUrl: './block-container.component.html',
  styleUrls: ['./block-container.component.sass']
})
export class BlockContainerComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  wrapperClasses: string;

  @Input()
  titleClasses: string;

  constructor() { }

  ngOnInit() {
  }

}

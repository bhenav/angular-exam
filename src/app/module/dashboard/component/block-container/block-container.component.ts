import { Component, Input } from '@angular/core';

@Component({
  selector: 'exam-block-container',
  templateUrl: './block-container.component.html',
  styleUrls: [ './block-container.component.sass' ],
})
export class BlockContainerComponent {
  @Input()
  title: string;

  @Input()
  description: string;

  @Input()
  wrapperClasses: string;

  @Input()
  titleClasses: string;

  @Input()
  descriptionClasses: string;
}

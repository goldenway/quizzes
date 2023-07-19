import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'q-modal-window',
  templateUrl: './modal-window.component.html'
})
export class ModalWindowComponent {
  @Input() modalId: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() cancelBtnText: string = '';
  @Input() okBtnText: string = '';
  @Output() okButtonClicked: EventEmitter<void> = new EventEmitter<void>();

  onOkClicked() {
    this.okButtonClicked.emit();
  }
}

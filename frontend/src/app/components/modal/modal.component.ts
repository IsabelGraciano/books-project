import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})

export class Modal {
  @Output() modalConfirmed = new EventEmitter<void>();
  @Output() modalClosed = new EventEmitter<void>();

  title: string = 'Modal Title';

  closeModal() {
    this.modalClosed.emit();
  }

  confirmModal() {
    this.modalConfirmed.emit();
    this.closeModal();
  }
}

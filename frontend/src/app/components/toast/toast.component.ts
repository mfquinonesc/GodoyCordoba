import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Toaster } from 'src/app/models/toaster';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent extends Toaster{ 

  @Input() override isActive: boolean = false;
  @Input() override message:string = '';
  @Input() override title:string = 'Mensaje';

  @Input() hasCancel:boolean = false;

  @Output() onClose = new EventEmitter<boolean>(false);
  @Output() onAccept = new EventEmitter<boolean>(false);

  accept(){
    this.onAccept.emit(true);
  }

  override close(): void {
    this.close();
    this.onClose.emit(true);
  }
  
}

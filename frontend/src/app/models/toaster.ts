export class Toaster {
  title: string = '';
  message: string = '';
  isActive: boolean = false;
  isLoading: boolean = false;

  close() {
    this.isActive = false;
    this.message = '';
    this.title = '';
  }

  dialog(message: string, title?: string) {
    this.isActive = true;
    this.message = message;
    this.title = title ? title : 'Mensaje';
  }
}

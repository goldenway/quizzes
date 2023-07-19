import { NgModule } from "@angular/core";

import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { ModalWindowComponent } from "./modal_window/modal-window.component";

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ModalWindowComponent
  ],
  exports: [
    LoadingSpinnerComponent,
    ModalWindowComponent
  ]
})
export class SharedModule {}

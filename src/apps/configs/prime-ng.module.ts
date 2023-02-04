import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [],
  exports: [
    InputTextModule,
    CardModule,
    ButtonModule,
    MenubarModule,
    ToastModule,
  ],
})
export class PrimeNgModule {}

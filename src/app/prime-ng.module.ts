import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [],
  exports: [InputTextModule, CardModule, ButtonModule, MenubarModule],
})
export class PrimeNgModule {}

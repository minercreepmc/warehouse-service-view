import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCreateFormComponent } from './product-create-form';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: 'create', component: ProductCreateFormComponent },
  { path: '', component: ProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

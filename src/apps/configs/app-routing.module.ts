import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ProductCreateFormComponent,
  ProductDetailComponent,
  ProductsComponent,
} from '../components';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:name', component: ProductDetailComponent },
  { path: 'create', component: ProductCreateFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

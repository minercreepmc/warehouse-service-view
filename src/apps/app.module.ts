import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NavBarComponent,
  ProductCreateFormComponent,
  ProductDetailComponent,
  ProductsComponent,
} from './components';
import { AppRoutingModule, PrimeNgModule } from './configs';
import { warehouseMiddlewareDiToken } from './middlewares/warehouse';
import { WarehouseHttpMiddleware } from './middlewares/warehouse/http';

const middlewares: Provider[] = [
  { provide: warehouseMiddlewareDiToken, useClass: WarehouseHttpMiddleware },
];

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductCreateFormComponent,
    NavBarComponent,
    ProductDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    //GraphQLModule,
  ],
  providers: [...middlewares],
  bootstrap: [AppComponent],
})
export class AppModule {}

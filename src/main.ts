import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { enableProdMode } from '@angular/core';
import { checkDEV } from '@apollo/client/utilities/globals';
import { AppModule } from './apps/app.module';

enableProdMode();
checkDEV();

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

//pociblemente agregar cors
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

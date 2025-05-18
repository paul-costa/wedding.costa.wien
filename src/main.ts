import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeApp } from 'firebase/app';
import { environment } from './config/environment.config';
import { AppModule } from './modules/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

const app = initializeApp(environment.firebase);
// const analytics = getAnalytics(app);
// authEmailFirebase();

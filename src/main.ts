import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../src/config/firebase.config';
import { AppModule } from './modules/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

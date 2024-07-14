import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app/app.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: AppComponent },
  { path: 'location', component: AppComponent },
  { path: 'timetable', component: AppComponent },
  { path: 'dresscode', component: AppComponent },
  { path: 'dos-donts', component: AppComponent },
  { path: 'gift', component: AppComponent },
  { path: 'gallery', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

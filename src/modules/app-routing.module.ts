import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app/app.component';
import { NavLinks } from '../app/constants/app.constants';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: NavLinks.Home, component: AppComponent },
  { path: NavLinks.Location, component: AppComponent },
  { path: NavLinks.Timetable, component: AppComponent },
  { path: NavLinks.Dresscode, component: AppComponent },
  { path: NavLinks.DosDonts, component: AppComponent },
  { path: NavLinks.Gifts, component: AppComponent },
  { path: NavLinks.Gallery, component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withComponentInputBinding } from '@angular/router';
import { DosDontsComponent } from 'src/app/components/content/dos-donts/dos-donts.component';
import { DresscodeComponent } from 'src/app/components/content/dresscode/dresscode.component';
import { GalleryComponent } from 'src/app/components/content/gallery/gallery.component';
import { GiftsComponent } from 'src/app/components/content/gifts/gifts.component';
import { HomeComponent } from 'src/app/components/content/home/home.component';
import { LocationComponent } from 'src/app/components/content/location/location.component';
import { TimetableComponent } from 'src/app/components/content/timetable/timetable.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'location', component: LocationComponent },
  { path: 'timetable', component: TimetableComponent },
  { path: 'dresscode', component: DresscodeComponent },
  { path: 'dos-donts', component: DosDontsComponent },
  { path: 'gifts', component: GiftsComponent },
  { path: 'gallery', component: GalleryComponent },
  {
    path: '*',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes, withComponentInputBinding()), Location, { provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule {}

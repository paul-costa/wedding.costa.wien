import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withComponentInputBinding } from '@angular/router';
import { DosAndDontsComponent } from 'src/app/components/content/dos-and-donts/dos-and-donts.component';
import { DresscodeComponent } from 'src/app/components/content/dresscode/dresscode.component';
import { GalleryComponent } from 'src/app/components/content/gallery/gallery.component';
import { GiftsComponent } from 'src/app/components/content/gifts/gifts.component';
import { HomeComponent } from 'src/app/components/content/home/home.component';
import { LocationJourneyComponent } from 'src/app/components/content/location-journey/location-journey.component';
import { TimetableComponent } from 'src/app/components/content/timetable/timetable.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'location-journey', component: LocationJourneyComponent },
  { path: 'timetable', component: TimetableComponent },
  { path: 'dresscode', component: DresscodeComponent },
  { path: 'dos-and-donts', component: DosAndDontsComponent },
  { path: 'gifts', component: GiftsComponent },
  { path: 'gallery', component: GalleryComponent },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes, withComponentInputBinding())],
})
export class AppRoutingModule {}

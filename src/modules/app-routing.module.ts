import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponents } from '../app/constants/app.constants';

const routes: Routes = [{ path: '', redirectTo: '/home', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor() {
    for (let contentComponent of Object.values(ContentComponents)) {
      routes.push({
        path: contentComponent.url,
        component: contentComponent.component,
      });
    }
  }
}

import { Component, inject, Input } from '@angular/core';
import { NavbarLink, NavbarLinks } from '../../constants/app.constants';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  @Input()
  activeNav?: NavbarLink;

  ngOnChanges() {
    console.log(this.activeNav);
  }
}

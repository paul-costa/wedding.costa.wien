import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreakpointObserverService {
  private readonly isBreakpointXs = new BehaviorSubject<boolean>(false);
  private readonly breakpointObserver = inject(BreakpointObserver);

  constructor() {
    this.breakpointObserver.observe([Breakpoints.XSmall]).subscribe((state: BreakpointState) => {
      this.isBreakpointXs.next(state.matches);
    });
  }

  observeIsBreakpointXs(): Observable<boolean> {
    return this.isBreakpointXs.asObservable();
  }
}

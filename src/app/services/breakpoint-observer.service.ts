import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreakpointObserverService {
  private readonly $isSm = new BehaviorSubject<boolean>(false);
  private readonly $isXs = new BehaviorSubject<boolean>(false);
  private readonly breakpointObserver = inject(BreakpointObserver);

  constructor() {
    combineLatest([this.breakpointObserver.observe([Breakpoints.Small]), this.breakpointObserver.observe([Breakpoints.XSmall])]).subscribe(
      ([isSm, isXs]) => {
        this.$isSm.next(isSm.matches);
        this.$isXs.next(isXs.matches);
      },
    );
  }

  get isSm(): boolean {
    return this.$isSm.value;
  }

  get isXs(): boolean {
    return this.$isXs.value;
  }

  observeIsSm(): Observable<boolean> {
    return this.$isSm.asObservable();
  }

  observeIsXs(): Observable<boolean> {
    return this.$isXs.asObservable();
  }
}

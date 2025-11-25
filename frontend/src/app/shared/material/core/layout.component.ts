import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav: any;
  
  constructor(private observer: BreakpointObserver, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.observer.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
      this.cdr.detectChanges();
    });
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }

}

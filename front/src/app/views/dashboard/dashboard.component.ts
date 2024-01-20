import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../html/header/header.component';
import { MenuComponent } from '../html/menu/menu.component';
import { FooterComponent } from '../html/footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    RouterOutlet,
    RouterLinkActive,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  title = 'Dashboard';
}

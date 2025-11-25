import { Component, Input } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Router } from '@angular/router';
import { SHARED_MODULES } from '../../core/common/shared-module';

interface Notification {
  id: number;
  message: string;
  time: string;
  unread: boolean;
}

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [SHARED_MODULES],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent {
  // Inputs to match the React version
  @Input() title = 'Dashboard';
  @Input() icon = 'bi-speedometer2'; // pass a bootstrap-icon class like "bi-speedometer2"
  @Input() colorClass = 'bg-gradient-primary'; // css gradient class (define in global styles)

  // UI state
  showMobileMenu = false;
  showNotifications = false;
  showUserMenu = false;

  // Dummy notifications (same data as React)
  notifications: Notification[] = [
    { id: 1, message: 'New booking received', time: '5 min ago', unread: true },
    { id: 2, message: 'Room 304 cleaned', time: '12 min ago', unread: true },
    {
      id: 3,
      message: 'Maintenance completed',
      time: '1 hour ago',
      unread: false,
    },
  ];

  // Hotel name map
  hotelNames: Record<string, string> = {
    'grand-plaza-ny': 'Grand Plaza Hotel',
    'ocean-view-miami': 'Ocean View Resort',
    'royal-london': 'Royal London Hotel',
    'maple-toronto': 'Maple Leaf Grand Hotel',
    'manhattan-suite': 'Manhattan Suite Hotel',
    'beach-paradise': 'Beach Paradise Hotel',
    'thames-view': 'Thames View Inn',
    'cn-tower-hotel': 'CN Tower Hotel',
  };

  constructor(public apiService: ApiService) {}

  // Getter for current user (from auth service)
  get user() {
    return this.apiService.user;
  }

  // Derived values (no logic in template)
  get unreadCount(): number {
    return this.notifications.filter((n) => n.unread).length;
  }

  get hotelName(): string {
    const h = this.user?.hotel;
    return h ? this.hotelNames[h] || h : 'Hotel';
  }

  get locationInfo(): string {
    if (!this.user) return '';
    return `${this.user.city}, ${this.user.state}, ${this.user.country}`;
  }

  get today(): string {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  // Actions
  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    // close user menu if open
    if (this.showNotifications) this.showUserMenu = false;
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
    // close notifications if open
    if (this.showUserMenu) this.showNotifications = false;
  }

  logout() {
    this.apiService.logout();
  }

  // Mark a notification as read (example helper)
  markRead(id: number) {
    const n = this.notifications.find((x) => x.id === id);
    if (n) n.unread = false;
  }
}

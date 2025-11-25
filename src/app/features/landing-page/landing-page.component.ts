import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SHARED_MODULES } from '../../core/common/shared-module';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [SHARED_MODULES],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  constructor(private router: Router) {}

  navigateLogin() {
    this.router.navigate(['/login']);
  }

  features = [
    {
      icon: 'bi bi-person-vcard',
      title: 'Reception & Front Desk',
      description:
        'Manage check-ins, bookings, room assignments, and guest services seamlessly.',
      color: 'linear-gradient(to bottom right, #3b82f6, #2563eb)',
    },
    {
      icon: 'bi bi-bucket',
      title: 'Housekeeping Management',
      description:
        'Real-time room status updates, task scheduling, and inventory tracking.',
      color: 'linear-gradient(to bottom right, #22c55e, #15803d)',
    },
    {
      icon: 'bi bi-tools',
      title: 'Maintenance & SLA',
      description:
        'Track maintenance tickets, SLA timers, and equipment status monitoring.',
      color: 'linear-gradient(to bottom right, #fb923c, #ea580c)',
    },
    {
      icon: 'bi bi-person-gear',
      title: 'Manager Analytics',
      description:
        'Comprehensive dashboard with KPIs, revenue tracking, and forecasting.',
      color: 'linear-gradient(to bottom right, #a855f7, #7e22ce)',
    },
    {
      icon: 'bi bi-door-open',
      title: 'Guest Portal',
      description:
        'Mobile-friendly portal for service requests, billing, and digital check-in.',
      color: 'linear-gradient(to bottom right, #ec4899, #be185d)',
    },
    {
      icon: 'bi bi-shop',
      title: 'POS & F&B',
      description:
        'Integrated point of sale system with room charging and KOT management.',
      color: 'linear-gradient(to bottom right, #ef4444, #b91c1c)',
    },
  ];

  benefits = [
    {
      label: 'Real-time Updates',
      value: 'Instant notifications across all departments',
    },
    {
      label: 'Multi-Hotel Support',
      value: 'Manage multiple properties from one system',
    },
    {
      label: 'Role-Based Access',
      value: 'Secure dashboards for each department',
    },
    { label: 'Mobile Optimized', value: 'Works perfectly on any device' },
  ];
}

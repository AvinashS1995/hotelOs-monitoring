import { Component } from '@angular/core';
import { SHARED_MODULES } from '../../core/common/shared-module';

interface ServiceRequest {
  id: string;
  type: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  requestedAt: string;
  icon: string; // bootstrap icon class
}

interface BillItem {
  date: string;
  description: string;
  amount: number;
}

type Tab = 'overview' | 'services' | 'requests' | 'billing';

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [SHARED_MODULES],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.scss',
})
export class GuestComponent {
  activeTab: Tab = 'overview';
  showNewRequest = false;
  selectedService = '';

  guestInfo = {
    name: 'Robert Wilson',
    room: '304',
    checkIn: 'Nov 18, 2025',
    checkOut: 'Nov 25, 2025',
    roomType: 'Deluxe Suite',
    guestsCount: 2,
  };

  tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: 'bi-person' },
    { id: 'services', label: 'Services', icon: 'bi-bell' },
    { id: 'requests', label: 'My Requests', icon: 'bi-chat-square' },
    { id: 'billing', label: 'Billing', icon: 'bi-receipt' },
  ];

  services = [
    {
      id: 'housekeeping',
      name: 'Housekeeping',
      icon: 'bi-wind',
      description: 'Request room cleaning or extra amenities',
    },
    {
      id: 'food',
      name: 'Room Service',
      icon: 'bi-cup-straw',
      description: 'Order food & beverages to your room',
    },
    {
      id: 'laundry',
      name: 'Laundry Service',
      icon: 'bi-droplet',
      description: 'Send items for washing & ironing',
    },
    {
      id: 'maintenance',
      name: 'Maintenance',
      icon: 'bi-cup',
      description: 'Report issues or request repairs',
    },
  ];

  requests: ServiceRequest[] = [
    {
      id: '1',
      type: 'Housekeeping',
      description: 'Extra towels requested',
      status: 'completed',
      requestedAt: '10:30 AM',
      icon: 'bi-wind',
    },
    {
      id: '2',
      type: 'Room Service',
      description: 'Breakfast order - Pancakes & Coffee',
      status: 'completed',
      requestedAt: '8:15 AM',
      icon: 'bi-cup-straw',
    },
    {
      id: '3',
      type: 'Maintenance',
      description: 'AC temperature adjustment',
      status: 'in-progress',
      requestedAt: '2:00 PM',
      icon: 'bi-cup',
    },
  ];

  billItems: BillItem[] = [
    { date: 'Nov 18', description: 'Room Charge', amount: 156.0 },
    { date: 'Nov 18', description: 'Breakfast', amount: 24.5 },
    { date: 'Nov 19', description: 'Room Charge', amount: 156.0 },
    { date: 'Nov 19', description: 'Minibar', amount: 18.0 },
    { date: 'Nov 19', description: 'Room Service', amount: 45.0 },
    { date: 'Nov 20', description: 'Room Charge', amount: 156.0 },
    { date: 'Nov 20', description: 'Laundry', amount: 22.0 },
  ];

  get totalBill(): number {
    return this.billItems.reduce((sum, item) => sum + item.amount, 0);
  }

  getStatusColor(status: string) {
    switch (status) {
      case 'pending':
        return 'bg-warning text-dark';
      case 'in-progress':
        return 'bg-info text-dark';
      case 'completed':
        return 'bg-success text-white';
      default:
        return 'bg-secondary text-white';
    }
  }

  openNewRequest(serviceId: string = '') {
    this.selectedService = serviceId;
    this.showNewRequest = true;
  }

  submitNewRequest(description: string) {
    if (this.selectedService) {
      const service = this.services.find((s) => s.id === this.selectedService);
      if (service) {
        const newRequest: ServiceRequest = {
          id: (this.requests.length + 1).toString(),
          type: service.name,
          description,
          status: 'pending',
          requestedAt: 'Just now',
          icon: service.icon,
        };
        this.requests = [newRequest, ...this.requests];
        this.showNewRequest = false;
        this.selectedService = '';
      }
    }
  }

  closeModal() {
    this.showNewRequest = false;
    this.selectedService = '';
  }
}

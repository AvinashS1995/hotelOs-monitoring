import { Component } from '@angular/core';
import { SHARED_MODULES } from '../../core/common/shared-module';

type RoomStatus = 'available' | 'occupied' | 'cleaning' | 'maintenance';

interface Room {
  id: string;
  number: string;
  type: string;
  status: RoomStatus;
  guest?: string;
  checkIn?: string;
  checkOut?: string;
}

interface Booking {
  id: string;
  guestName: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  status: 'arriving' | 'checked-in' | 'checked-out';
  isVIP: boolean;
  specialRequests?: string;
}

@Component({
  selector: 'app-reception',
  standalone: true,
  imports: [SHARED_MODULES],
  templateUrl: './reception.component.html',
  styleUrl: './reception.component.scss',
})
export class ReceptionComponent {
  // UI state
  activeTab: 'overview' | 'arrivals' | 'departures' | 'rooms' = 'overview';
  searchQuery = '';
  // Room status classes for cards
  selectedRoom: Room | null = null;

  // Stats
  stats = [
    {
      label: 'Total Rooms',
      value: '120',
      subtext: '85% occupancy',
      colorClass: 'stat-blue',
    },
    {
      label: "Today's Arrivals",
      value: '18',
      subtext: '3 VIP guests',
      colorClass: 'stat-green',
    },
    {
      label: "Today's Departures",
      value: '15',
      subtext: '12 checked out',
      colorClass: 'stat-orange',
    },
    {
      label: 'Pending Check-ins',
      value: '6',
      subtext: '2 arriving soon',
      colorClass: 'stat-purple',
    },
  ];

  // Sample rooms
  rooms: Room[] = [
    {
      id: '1',
      number: '101',
      type: 'Standard',
      status: 'occupied',
      guest: 'John Smith',
      checkIn: '2025-11-18',
      checkOut: '2025-11-22',
    },
    { id: '2', number: '102', type: 'Standard', status: 'available' },
    { id: '3', number: '103', type: 'Deluxe', status: 'cleaning' },
    {
      id: '4',
      number: '104',
      type: 'Deluxe',
      status: 'occupied',
      guest: 'Sarah Johnson',
      checkIn: '2025-11-19',
      checkOut: '2025-11-21',
    },
    { id: '5', number: '105', type: 'Suite', status: 'maintenance' },
    { id: '6', number: '201', type: 'Standard', status: 'available' },
    {
      id: '7',
      number: '202',
      type: 'Deluxe',
      status: 'occupied',
      guest: 'Michael Brown',
      checkIn: '2025-11-17',
      checkOut: '2025-11-23',
    },
    { id: '8', number: '203', type: 'Suite', status: 'available' },
  ];

  // Sample bookings
  arrivals: Booking[] = [
    {
      id: '1',
      guestName: 'Robert Wilson',
      roomNumber: '301',
      checkIn: '2025-11-20 14:00',
      checkOut: '2025-11-25',
      status: 'arriving',
      isVIP: true,
      specialRequests: 'Late check-in, airport pickup',
    },
    {
      id: '2',
      guestName: 'Emily Davis',
      roomNumber: '205',
      checkIn: '2025-11-20 15:30',
      checkOut: '2025-11-22',
      status: 'arriving',
      isVIP: false,
    },
    {
      id: '3',
      guestName: 'James Anderson',
      roomNumber: '108',
      checkIn: '2025-11-20 12:00',
      checkOut: '2025-11-24',
      status: 'checked-in',
      isVIP: false,
    },
  ];

  departures: Booking[] = [
    {
      id: '4',
      guestName: 'Linda Martinez',
      roomNumber: '402',
      checkIn: '2025-11-17',
      checkOut: '2025-11-20 11:00',
      status: 'checked-out',
      isVIP: false,
    },
    {
      id: '5',
      guestName: 'David Lee',
      roomNumber: '310',
      checkIn: '2025-11-18',
      checkOut: '2025-11-20 12:00',
      status: 'checked-in',
      isVIP: true,
    },
    {
      id: '6',
      guestName: 'Maria Garcia',
      roomNumber: '215',
      checkIn: '2025-11-16',
      checkOut: '2025-11-20 10:30',
      status: 'checked-out',
      isVIP: false,
    },
  ];

  // Tabs list (keeps template clean)
  tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'arrivals', label: "Today's Arrivals" },
    { id: 'departures', label: "Today's Departures" },
    { id: 'rooms', label: 'Room Status' },
  ] as const;

  // Helpers / actions
  setTab(id: any) {
    this.activeTab = id;
  }

  openRoom(room: Room) {
    this.selectedRoom = room;
  }

  closeRoom() {
    this.selectedRoom = null;
  }

  // Simulate check-in / check-out actions
  checkIn(bookingId: string) {
    const b = this.arrivals.find((x) => x.id === bookingId);
    if (b) b.status = 'checked-in';
  }

  checkOut(bookingId: string) {
    const d = this.departures.find((x) => x.id === bookingId);
    if (d) d.status = 'checked-out';
  }

  getStatusClass(status?: RoomStatus) {
    if (!status) return 'bg-secondary-subtle text-secondary';

    switch (status) {
      case 'available':
        return 'bg-success-subtle text-success';
      case 'occupied':
        return 'bg-primary-subtle text-primary';
      case 'cleaning':
        return 'bg-warning-subtle text-warning';
      case 'maintenance':
        return 'bg-danger-subtle text-danger';
    }
  }

  // Filter helpers used in template (keeps expressions light)
  get checkedInArrivals() {
    return this.arrivals.filter((a) => a.status === 'checked-in');
  }

  get arrivingArrivals() {
    return this.arrivals.filter((a) => a.status === 'arriving');
  }

  get filteredArrivals() {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return this.arrivals;
    return this.arrivals.filter(
      (a) => a.guestName.toLowerCase().includes(q) || a.roomNumber.includes(q)
    );
  }

  get filteredDepartures() {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return this.departures;
    return this.departures.filter(
      (d) => d.guestName.toLowerCase().includes(q) || d.roomNumber.includes(q)
    );
  }

  // Small utility to format status strings (capitalize)
  capitalize(s: string) {
    if (!s) return s;
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}

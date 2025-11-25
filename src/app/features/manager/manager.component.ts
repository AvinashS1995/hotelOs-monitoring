import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SHARED_MODULES } from '../../core/common/shared-module';
import { Router } from '@angular/router';
Chart.register(...registerables);

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [SHARED_MODULES],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
})
export class ManagerComponent {
  constructor(private router: Router) {}

  // KPI Stats
  kpiStats = [
    {
      label: 'Total Revenue',
      value: '$125,400',
      change: '+12.5%',
      trend: 'up',
      icon: 'bi-currency-dollar',
      gradient: 'stat-green',
    },
    {
      label: 'Occupancy Rate',
      value: '85%',
      change: '+5.2%',
      trend: 'up',
      icon: 'bi-house-door',
      gradient: 'stat-blue',
    },
    {
      label: 'ADR (Avg Daily Rate)',
      value: '$156',
      change: '+8.1%',
      trend: 'up',
      icon: 'bi-graph-up',
      gradient: 'stat-purple',
    },
    {
      label: 'Guest Satisfaction',
      value: '4.7/5',
      change: '+0.3',
      trend: 'up',
      icon: 'bi-star-fill',
      gradient: 'stat-yellow',
    },
  ];

  revenueLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  revenueDataset = [85000, 92000, 105000, 118000, 125000, 142000];
  bookingsDataset = [245, 268, 302, 335, 358, 398];

  occupancyLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  occupancyDataset = [78, 82, 85, 88, 92, 95, 90];

  roomTypeLabels = ['Standard', 'Deluxe', 'Suite', 'Presidential'];
  roomTypeDataset = [45, 30, 15, 10];

  deptLabels = ['Rooms', 'F&B', 'Spa', 'Laundry', 'Other'];
  deptDataset = [125400, 45800, 18200, 6500, 4100];

  upcomingArrivals = [
    { date: 'Nov 21', count: 22, vip: 4 },
    { date: 'Nov 22', count: 18, vip: 2 },
    { date: 'Nov 23', count: 25, vip: 5 },
    { date: 'Nov 24', count: 20, vip: 3 },
  ];

  keyMetrics = [
    { label: 'RevPAR', value: '$132.60', note: '+10.2% vs last month' },
    { label: 'Total Bookings', value: '1,245', note: '+8.5% vs last month' },
    {
      label: 'Avg Length of Stay',
      value: '3.2 days',
      note: 'Same as last month',
    },
    { label: 'Repeat Guests', value: '34%', note: '+5% vs last month' },
  ];

  COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  ngAfterViewInit(): void {
    // Revenue (line with secondary axis)
    new Chart('revenueChart', {
      type: 'line',
      data: {
        labels: this.revenueLabels,
        datasets: [
          {
            label: 'Revenue ($)',
            data: this.revenueDataset,
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59,130,246,0.08)',
            tension: 0.3,
            yAxisID: 'yRevenue',
            pointRadius: 3,
            borderWidth: 2,
          },
          {
            label: 'Bookings',
            data: this.bookingsDataset,
            borderColor: '#10B981',
            backgroundColor: 'rgba(16,185,129,0.08)',
            tension: 0.3,
            yAxisID: 'yBookings',
            pointRadius: 3,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        interaction: { mode: 'index', intersect: false },
        scales: {
          yRevenue: {
            type: 'linear',
            position: 'left',
            title: { display: true, text: 'Revenue' },
          },
          yBookings: {
            type: 'linear',
            position: 'right',
            grid: { drawOnChartArea: false },
            title: { display: true, text: 'Bookings' },
          },
        },
        plugins: { legend: { display: true } },
      },
    });

    // Occupancy bar
    new Chart('occupancyChart', {
      type: 'bar',
      data: {
        labels: this.occupancyLabels,
        datasets: [
          {
            label: 'Occupancy Rate (%)',
            data: this.occupancyDataset,
            backgroundColor: '#3B82F6',
          },
        ],
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true, max: 100 } },
        plugins: { legend: { display: false } },
      },
    });

    // Room type pie
    new Chart('roomTypeChart', {
      type: 'pie',
      data: {
        labels: this.roomTypeLabels,
        datasets: [
          {
            data: this.roomTypeDataset,
            backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
      },
    });

    // Dept revenue horizontal bar (using bar with indexAxis)
    new Chart('deptRevenueChart', {
      type: 'bar',
      data: {
        labels: this.deptLabels,
        datasets: [
          {
            label: 'Revenue',
            data: this.deptDataset,
            backgroundColor: '#10B981',
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: { legend: { display: false } },
      },
    });
  }

  // icon gradient helper
  getGradientClass(idx: number) {
    switch (idx) {
      case 0:
        return 'stat-green';
      case 1:
        return 'stat-blue';
      case 2:
        return 'stat-purple';
      default:
        return 'stat-yellow';
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}

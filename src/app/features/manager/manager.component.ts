import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SHARED_MODULES } from '../../core/common/shared-module';
Chart.register(...registerables);

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [SHARED_MODULES],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
})
export class ManagerComponent {
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

  // Upcoming arrivals
  upcomingArrivals = [
    { date: 'Nov 21', count: 22, vip: 4 },
    { date: 'Nov 22', count: 18, vip: 2 },
    { date: 'Nov 23', count: 25, vip: 5 },
    { date: 'Nov 24', count: 20, vip: 3 },
  ];

  // Key metrics
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

  // Gradient helper for KPI icons
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

  ngAfterViewInit(): void {
    // Revenue Line Chart
    new Chart('revenueChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Revenue ($)',
            data: [85000, 92000, 105000, 118000, 125000, 142000],
            borderColor: '#3B82F6',
            backgroundColor: '#3B82F6',
            tension: 0.3,
            fill: false,
          },
          {
            label: 'Bookings',
            data: [245, 268, 302, 335, 358, 398],
            borderColor: '#10B981',
            backgroundColor: '#10B981',
            tension: 0.3,
            fill: false,
            yAxisID: 'y1',
          },
        ],
      },
      options: {
        responsive: true,
        interaction: { mode: 'index', intersect: false },
        // stacked: false,
        scales: {
          y: { beginAtZero: false, title: { display: true, text: 'Revenue' } },
          y1: {
            beginAtZero: true,
            position: 'right',
            grid: { drawOnChartArea: false },
            title: { display: true, text: 'Bookings' },
          },
        },
        plugins: { legend: { display: true } },
      },
    });

    // Occupancy Bar Chart
    new Chart('occupancyChart', {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Occupancy Rate (%)',
            data: [78, 82, 85, 88, 92, 95, 90],
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

    // Room Type Pie Chart
    new Chart('roomTypeChart', {
      type: 'pie',
      data: {
        labels: ['Standard', 'Deluxe', 'Suite', 'Presidential'],
        datasets: [
          {
            data: [45, 30, 15, 10],
            backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
      },
    });

    // Department Revenue Bar Chart
    new Chart('deptRevenueChart', {
      type: 'bar',
      data: {
        labels: ['Rooms', 'F&B', 'Spa', 'Laundry', 'Other'],
        datasets: [
          {
            label: 'Revenue',
            data: [125400, 45800, 18200, 6500, 4100],
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
}

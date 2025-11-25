import { Component } from '@angular/core';
import { SHARED_MODULES } from '../../core/common/shared-module';

type AuditStatus = 'pending' | 'running' | 'completed';

@Component({
  selector: 'app-night-audit',
  standalone: true,
  imports: [SHARED_MODULES],
  templateUrl: './night-audit.component.html',
  styleUrl: './night-audit.component.scss',
})
export class NightAuditComponent {
  auditStatus: AuditStatus = 'pending';
  progress = 0;

  auditData = {
    date: new Date().toLocaleDateString(),
    roomRevenue: 12450.0,
    fnbRevenue: 3280.5,
    otherRevenue: 890.0,
    totalRevenue: 16620.5,
    totalPayments: 15850.0,
    pendingPayments: 770.5,
    occupancy: {
      total: 120,
      occupied: 98,
      vacant: 22,
      percentage: 81.67,
    },
    transactions: 156,
    checkIns: 18,
    checkOuts: 15,
  };

  folioSummary = [
    {
      room: '101',
      guest: 'John Smith',
      charges: 450.0,
      payments: 450.0,
      balance: 0.0,
      status: 'closed',
    },
    {
      room: '102',
      guest: 'Sarah Johnson',
      charges: 680.5,
      payments: 680.5,
      balance: 0.0,
      status: 'closed',
    },
    {
      room: '103',
      guest: 'Michael Brown',
      charges: 520.0,
      payments: 500.0,
      balance: 20.0,
      status: 'open',
    },
    {
      room: '201',
      guest: 'Emily Davis',
      charges: 890.0,
      payments: 0.0,
      balance: 890.0,
      status: 'open',
    },
    {
      room: '304',
      guest: 'Robert Wilson',
      charges: 1250.0,
      payments: 1250.0,
      balance: 0.0,
      status: 'closed',
    },
  ];

  revenuByDepartment = [
    { department: 'Rooms', revenue: 12450.0, percentage: 74.9 },
    { department: 'Restaurant', revenue: 2180.5, percentage: 13.1 },
    { department: 'Bar', revenue: 1100.0, percentage: 6.6 },
    { department: 'Spa', revenue: 650.0, percentage: 3.9 },
    { department: 'Laundry', revenue: 240.0, percentage: 1.5 },
  ];

  runAudit() {
    if (this.auditStatus === 'running') return;
    this.auditStatus = 'running';
    this.progress = 0;
    const step = () => {
      this.progress = Math.min(100, this.progress + 10);
      if (this.progress >= 100) {
        clearInterval(timer);
        this.auditStatus = 'completed';
      }
    };
    const timer = setInterval(step, 300);
  }

  // Actions placeholders
  downloadReport() {
    // implement real download logic
    console.log('Download report');
  }

  emailManagement() {
    // implement real email logic
    console.log('Email to management');
  }

  exportAccounting() {
    // implement real export logic
    console.log('Export to accounting');
  }
}

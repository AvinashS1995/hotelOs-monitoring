import { Component } from '@angular/core';
import { SHARED_MODULES } from '../../core/common/shared-module';

type TicketStatus = 'pending' | 'assigned' | 'in-progress' | 'resolved';
type TicketPriority = 'critical' | 'high' | 'medium' | 'low';
type TicketCategory =
  | 'electrical'
  | 'plumbing'
  | 'hvac'
  | 'furniture'
  | 'other';

interface Ticket {
  id: string;
  title: string;
  room: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTo?: string;
  reportedBy: string;
  reportedAt: string;
  slaDeadline: string;
  timeRemaining: string;
  description: string;
}

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [SHARED_MODULES],
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.scss',
})
export class MaintenanceComponent {
  tickets: Ticket[] = [
    {
      id: 'MT-001',
      title: 'AC not cooling',
      room: '304',
      category: 'hvac',
      priority: 'critical',
      status: 'in-progress',
      assignedTo: 'John Smith',
      reportedBy: 'Reception',
      reportedAt: '10:30 AM',
      slaDeadline: '12:30 PM',
      timeRemaining: '45 min',
      description:
        'Guest reported AC not cooling properly. Temperature at 28°C.',
    },
    {
      id: 'MT-002',
      title: 'Leaking faucet',
      room: '215',
      category: 'plumbing',
      priority: 'high',
      status: 'assigned',
      assignedTo: 'Mike Johnson',
      reportedBy: 'Housekeeping',
      reportedAt: '9:15 AM',
      slaDeadline: '2:15 PM',
      timeRemaining: '3h 20min',
      description: 'Bathroom sink faucet dripping continuously.',
    },
    {
      id: 'MT-003',
      title: 'TV remote not working',
      room: '108',
      category: 'electrical',
      priority: 'medium',
      status: 'pending',
      reportedBy: 'Guest',
      reportedAt: '11:00 AM',
      slaDeadline: '5:00 PM',
      timeRemaining: '5h 15min',
      description: 'TV remote batteries dead, needs replacement.',
    },
    {
      id: 'MT-004',
      title: 'Broken chair',
      room: '412',
      category: 'furniture',
      priority: 'low',
      status: 'pending',
      reportedBy: 'Housekeeping',
      reportedAt: '8:45 AM',
      slaDeadline: 'Tomorrow',
      timeRemaining: '1 day',
      description: 'Dining chair leg loose, needs repair or replacement.',
    },
    {
      id: 'MT-005',
      title: 'Water heater issue',
      room: '520',
      category: 'plumbing',
      priority: 'high',
      status: 'resolved',
      assignedTo: 'Mike Johnson',
      reportedBy: 'Guest',
      reportedAt: '7:30 AM',
      slaDeadline: '12:30 PM',
      timeRemaining: 'Resolved',
      description: 'No hot water in bathroom. Heater reset completed.',
    },
  ];

  showNewTicket = false;
  selectedTicket: Ticket | null = null;

  // Simple stats derived from tickets (used in template)
  get stats() {
    return [
      {
        label: 'Open Tickets',
        value: String(
          this.tickets.filter((t) => t.status !== 'resolved').length
        ),
        icon: 'bi-exclamation-circle',
        colorClass: 'stat-orange',
      },
      {
        label: 'In Progress',
        value: String(
          this.tickets.filter((t) => t.status === 'in-progress').length
        ),
        icon: 'bi-clock',
        colorClass: 'stat-blue',
      },
      {
        label: 'Resolved Today',
        value: String(
          this.tickets.filter((t) => t.status === 'resolved').length
        ),
        icon: 'bi-check-circle',
        colorClass: 'stat-green',
      },
      {
        label: 'Critical Issues',
        value: String(
          this.tickets.filter(
            (t) => t.priority === 'critical' && t.status !== 'resolved'
          ).length
        ),
        icon: 'bi-graph-up-arrow',
        colorClass: 'stat-red',
      },
    ];
  }

  // Update status helper
  updateTicketStatus(ticketId: string, newStatus: TicketStatus) {
    const t = this.tickets.find((x) => x.id === ticketId);
    if (t) t.status = newStatus;
  }

  // UI helpers for template classes
  getPriorityClass(priority: TicketPriority) {
    switch (priority) {
      case 'critical':
        return 'priority-critical';
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  }

  getStatusClass(status: TicketStatus) {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'assigned':
        return 'status-assigned';
      case 'in-progress':
        return 'status-inprogress';
      case 'resolved':
        return 'status-resolved';
      default:
        return '';
    }
  }

  // small mapping for emoji/category icon
  getCategoryEmoji(cat: TicketCategory) {
    const map: Record<TicketCategory, string> = {
      electrical: '⚡',
      plumbing: '💧',
      hvac: '❄️',
      furniture: '🪑',
      other: '🔧',
    };
    return map[cat] ?? '🔧';
  }

  // New ticket form model (for the create modal)
  newTicket = {
    title: '',
    room: '',
    category: 'other' as TicketCategory,
    priority: 'medium' as TicketPriority,
    description: '',
    reportedBy: 'Reception',
  };

  createTicket() {
    const id = `MT-${Math.floor(100 + Math.random() * 900)}`;
    const ticket: Ticket = {
      id,
      title: this.newTicket.title || 'Untitled',
      room: this.newTicket.room || '000',
      category: this.newTicket.category,
      priority: this.newTicket.priority,
      status: 'pending',
      reportedBy: this.newTicket.reportedBy,
      reportedAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      slaDeadline: 'TBD',
      timeRemaining: 'TBD',
      description: this.newTicket.description || '',
    };
    this.tickets = [ticket, ...this.tickets];
    // reset form & close
    this.newTicket = {
      title: '',
      room: '',
      category: 'other',
      priority: 'medium',
      description: '',
      reportedBy: 'Reception',
    };
    this.showNewTicket = false;
  }
}

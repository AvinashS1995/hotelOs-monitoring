import { Component } from '@angular/core';
import { SHARED_MODULES } from '../../core/common/shared-module';

type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'inspected';
type Priority = 'high' | 'medium' | 'low';

interface Task {
  id: string;
  roomNumber: string;
  type: 'checkout' | 'stayover' | 'arrival';
  priority: Priority;
  status: TaskStatus;
  assignedTo?: string;
  time?: string;
  specialNotes?: string;
}

interface InventoryItem {
  name: string;
  current: number;
  min: number;
  unit: string;
}

@Component({
  selector: 'app-housekeeping',
  standalone: true,
  imports: [SHARED_MODULES],
  templateUrl: './housekeeping.component.html',
  styleUrl: './housekeeping.component.scss',
})
export class HousekeepingComponent {
  // UI state
  selectedFilter: 'all' | 'pending' | 'in-progress' | 'completed' = 'all';

  tasks: Task[] = [
    {
      id: '1',
      roomNumber: '101',
      type: 'checkout',
      priority: 'high',
      status: 'pending',
      time: '10:30 AM',
      specialNotes: 'VIP guest',
    },
    {
      id: '2',
      roomNumber: '205',
      type: 'arrival',
      priority: 'high',
      status: 'in-progress',
      assignedTo: 'Maria',
      time: '2:00 PM',
    },
    {
      id: '3',
      roomNumber: '308',
      type: 'stayover',
      priority: 'medium',
      status: 'pending',
      assignedTo: 'John',
    },
    {
      id: '4',
      roomNumber: '412',
      type: 'checkout',
      priority: 'medium',
      status: 'completed',
      assignedTo: 'Sarah',
      time: '11:00 AM',
    },
    {
      id: '5',
      roomNumber: '115',
      type: 'stayover',
      priority: 'low',
      status: 'pending',
      assignedTo: 'Maria',
    },
    {
      id: '6',
      roomNumber: '203',
      type: 'arrival',
      priority: 'high',
      status: 'inspected',
      assignedTo: 'John',
      time: '3:00 PM',
    },
  ];

  inventory: InventoryItem[] = [
    { name: 'Towels', current: 145, min: 100, unit: 'pcs' },
    { name: 'Bed Sheets', current: 85, min: 80, unit: 'sets' },
    { name: 'Cleaning Supplies', current: 35, min: 50, unit: 'units' },
    { name: 'Toiletries', current: 210, min: 150, unit: 'sets' },
  ];

  stats = [
    {
      label: 'Pending Tasks',
      value: () =>
        this.tasks.filter((t) => t.status === 'pending').length.toString(),
      icon: 'bi-clock-fill',
      gradientClass: 'g-orange',
    },
    {
      label: 'In Progress',
      value: () =>
        this.tasks.filter((t) => t.status === 'in-progress').length.toString(),
      icon: 'bi-stars',
      gradientClass: 'g-blue',
    },
    {
      label: 'Completed Today',
      value: () =>
        this.tasks
          .filter((t) => t.status === 'completed' || t.status === 'inspected')
          .length.toString(),
      icon: 'bi-check-circle-fill',
      gradientClass: 'g-green',
    },
    {
      label: 'High Priority',
      value: () =>
        this.tasks
          .filter((t) => t.priority === 'high' && t.status === 'pending')
          .length.toString(),
      icon: 'bi-exclamation-triangle-fill',
      gradientClass: 'g-red',
    },
  ];

  // actions
  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks = this.tasks.map((t) =>
      t.id === taskId ? { ...t, status: newStatus } : t
    );
  }

  setFilter(filter: 'all' | 'pending' | 'in-progress' | 'completed') {
    this.selectedFilter = filter;
  }

  get filteredTasks() {
    if (this.selectedFilter === 'all') return this.tasks;
    if (this.selectedFilter === 'completed')
      return this.tasks.filter(
        (t) => t.status === 'completed' || t.status === 'inspected'
      );
    return this.tasks.filter((t) => t.status === this.selectedFilter);
  }

  // helpers
  getStatusClass(status: TaskStatus) {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'in-progress':
        return 'status-inprogress';
      case 'completed':
        return 'status-completed';
      case 'inspected':
        return 'status-inspected';
      default:
        return '';
    }
  }

  getPriorityClass(priority: Priority) {
    switch (priority) {
      case 'high':
        return 'p-high';
      case 'medium':
        return 'p-medium';
      case 'low':
        return 'p-low';
      default:
        return '';
    }
  }

  getTypeLabel(type: Task['type']) {
    switch (type) {
      case 'checkout':
        return 'Check-out Clean';
      case 'arrival':
        return 'Arrival Prep';
      case 'stayover':
        return 'Stayover Service';
    }
  }

  inventoryPercent(item: InventoryItem) {
    // visualize current vs (min*2) as in your design
    const pct = Math.min((item.current / (item.min * 2)) * 100, 100);
    return Math.round(pct);
  }
}

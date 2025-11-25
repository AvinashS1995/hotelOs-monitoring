import { Component } from '@angular/core';
import { SHARED_MODULES } from '../../core/common/shared-module';

interface Device {
  id: string;
  room: string;
  type: string;
  status: 'online' | 'offline' | 'warning';
  value: string;
  lastUpdate: string;
  trend?: 'up' | 'down' | 'stable';
}

@Component({
  selector: 'app-iot-monitoring',
  standalone: true,
  imports: [SHARED_MODULES],
  templateUrl: './iot-monitoring.component.html',
  styleUrl: './iot-monitoring.component.scss',
})
export class IotMonitoringComponent {
  selectedRoom: string | null = null;

  stats = [
    {
      label: 'Total Devices',
      value: '156',
      status: 'online',
      icon: 'bi-activity',
      color: 'blue',
    },
    {
      label: 'Warnings',
      value: '3',
      status: 'warning',
      icon: 'bi-exclamation-triangle',
      color: 'orange',
    },
    {
      label: 'Offline Devices',
      value: '2',
      status: 'offline',
      icon: 'bi-power',
      color: 'red',
    },
    {
      label: 'Energy Usage',
      value: '245 kWh',
      status: 'today',
      icon: 'bi-lightning-charge',
      color: 'green',
    },
  ];

  devices: Device[] = [
    {
      id: '1',
      room: '101',
      type: 'AC',
      status: 'online',
      value: '22°C',
      lastUpdate: '2 min ago',
      trend: 'stable',
    },
    {
      id: '2',
      room: '101',
      type: 'Door Lock',
      status: 'online',
      value: 'Locked',
      lastUpdate: '5 min ago',
    },
    {
      id: '3',
      room: '101',
      type: 'Energy',
      status: 'online',
      value: '2.4 kWh',
      lastUpdate: '1 min ago',
      trend: 'up',
    },
    {
      id: '4',
      room: '102',
      type: 'AC',
      status: 'warning',
      value: '28°C',
      lastUpdate: '1 min ago',
      trend: 'up',
    },
    {
      id: '5',
      room: '102',
      type: 'Temperature',
      status: 'warning',
      value: '28°C',
      lastUpdate: '1 min ago',
      trend: 'up',
    },
    {
      id: '6',
      room: '103',
      type: 'Water',
      status: 'online',
      value: 'Normal',
      lastUpdate: '3 min ago',
    },
    {
      id: '7',
      room: '104',
      type: 'Motion Sensor',
      status: 'online',
      value: 'Occupied',
      lastUpdate: 'Just now',
    },
    {
      id: '8',
      room: '105',
      type: 'AC',
      status: 'offline',
      value: 'N/A',
      lastUpdate: '15 min ago',
    },
    {
      id: '9',
      room: '201',
      type: 'Energy',
      status: 'online',
      value: '1.8 kWh',
      lastUpdate: '2 min ago',
      trend: 'down',
    },
    {
      id: '10',
      room: '202',
      type: 'Door Lock',
      status: 'online',
      value: 'Unlocked',
      lastUpdate: '1 min ago',
    },
  ];

  rooms = ['101', '102', '103', '104', '105', '201', '202'];

  filterDevices() {
    return this.selectedRoom
      ? this.devices.filter((d) => d.room === this.selectedRoom)
      : this.devices;
  }

  getDeviceIcon(type: string) {
    switch (type) {
      case 'AC':
        return 'bi-thermometer-half';
      case 'Door Lock':
        return 'bi-door-closed';
      case 'Motion Sensor':
        return 'bi-broadcast';
      case 'Temperature':
        return 'bi-thermometer-sun';
      case 'Water':
        return 'bi-droplet';
      case 'Energy':
        return 'bi-lightning';
      default:
        return 'bi-question-circle';
    }
  }

  getStatusClass(status: string) {
    return {
      online: 'status-online',
      warning: 'status-warning',
      offline: 'status-offline',
    }[status];
  }

  getTrendIcon(trend?: string) {
    return {
      up: 'bi-arrow-up text-danger',
      down: 'bi-arrow-down text-success',
      stable: 'text-muted',
    }[trend ?? 'stable'];
  }
}

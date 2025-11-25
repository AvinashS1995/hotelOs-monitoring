import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { LoginComponent } from './features/login/login.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { ReceptionComponent } from './features/reception/reception.component';
import { HousekeepingComponent } from './features/housekeeping/housekeeping.component';
import { MaintenanceComponent } from './features/maintenance/maintenance.component';
import { ManagerComponent } from './features/manager/manager.component';
import { PosComponent } from './features/pos/pos.component';
import { GuestComponent } from './features/guest/guest.component';
import { IotMonitoringComponent } from './features/iot-monitoring/iot-monitoring.component';
import { NightAuditComponent } from './features/night-audit/night-audit.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: DashboardLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'reception',
        component: ReceptionComponent,
        data: { allowedRoles: ['reception'] },
      },
      {
        path: 'housekeeping',
        component: HousekeepingComponent,
        data: { allowedRoles: ['housekeeping'] },
      },
      {
        path: 'maintenance',
        component: MaintenanceComponent,
        data: { allowedRoles: ['maintenance'] },
      },
      {
        path: 'manager',
        component: ManagerComponent,
        data: { allowedRoles: ['manager'] },
      },
      {
        path: 'iot-monitoring',
        component: IotMonitoringComponent,
        data: { allowedRoles: ['manager'] },
      },
      {
        path: 'night-audit',
        component: NightAuditComponent,
        data: { allowedRoles: ['manager'] },
      },
      { path: 'pos', component: PosComponent, data: { allowedRoles: ['pos'] } },
      {
        path: 'guest',
        component: GuestComponent,
        data: { allowedRoles: ['guest'] },
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

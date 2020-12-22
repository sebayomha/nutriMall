import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SalesContainerComponent } from './components/salesGeneral/sales-container/sales-container.component';
import { AuthGuardService } from './services/authGuard/auth-guard.service';

const app_routes: Routes = [
    { path: 'login', component: LoginComponent, data: {isLoginPage: true}, canActivate:[AuthGuardService] },
    { path: 'sales', component: SalesContainerComponent, canActivate:[AuthGuardService] },
    { path: '', pathMatch: 'full', redirectTo: 'sales' },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }
  ];

export const app_routing = RouterModule.forRoot(app_routes, { relativeLinkResolution: "legacy" });

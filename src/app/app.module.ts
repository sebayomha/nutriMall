import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { app_routing } from './app.routes';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptorService } from './services/interceptor/request-interceptor.service';
import { LOCALE_ID } from '@angular/core';

/*Components*/
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SalesComponent } from './components/salesGeneral/sales/sales.component';
import { SalesContainerComponent } from './components/salesGeneral/sales-container/sales-container.component';
import { TodaySalesComponent } from './components/salesGeneral/today-sales/today-sales.component';
import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { ProductListComponent } from './components/salesGeneral/product-list/product-list.component';
import { SnackbarComponent } from './components/snackbar/snackbar/snackbar.component';
import { LoaderComponent } from './components/loader/loader.component';

/*Angular material modules*/
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatRippleModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

/* Pipes */
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { BarcodePipe } from './pipes/barcode.pipe';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoaderService } from "../app/services/loader/loader-service.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SalesComponent,
    ProductListComponent,
    NavBarComponent,
    SalesContainerComponent,
    TodaySalesComponent,
    CapitalizePipe,
    BarcodePipe,
    SnackbarComponent,
    LoaderComponent,
    ProductListComponent,
  ],
  imports: [
    BrowserModule,
    app_routing,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatRippleModule,
    MatDividerModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatTableModule,
    MatTabsModule,
    MatBottomSheetModule,
    MatRadioModule,
    MatExpansionModule,
    MatStepperModule,
    MatCardModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true }, LoaderService],
  bootstrap: [AppComponent],
  entryComponents: [ProductListComponent, SnackbarComponent]
})

//{provide: LOCALE_ID, useValue: "es-AR"}, LoaderService
export class AppModule { }

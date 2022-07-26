import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//import { AccordionControlModule } from '../../../partials/content/general/accordion-control/accordion-control.module';
//import { MaterialPreviewModule } from '../../../partials/content/general/material-preview/material-preivew.module';
import { SWComponent } from './eoh.component';
//import { AccordionComponent } from './accordion/accordion.component';
//import { StickyFormActionsComponent } from './sticky-form-actions/sticky-form-actions.component';
//import { FormsComponent } from './forms/forms.component'; 
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartialsModule } from '../../../partials/partials.module';

import {
	MatIconRegistry,
	MatIcon,
	MatInputModule,
	MatDatepickerModule,
	MatFormFieldModule,
	MatAutocompleteModule,
	MatSliderModule,
	MatListModule,
	MatCardModule,
	MatSelectModule,
	MatButtonModule,
	MatIconModule,
	MatNativeDateModule,
	MatSlideToggleModule,
	MatCheckboxModule,
	MatMenuModule,
	MatTabsModule,
	MatTooltipModule,
	MatSidenavModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatSnackBarModule,
	MatGridListModule,
	MatTableModule,
	MatExpansionModule,
	MatToolbarModule,
	MatSortModule,
	MatDividerModule,
	MatStepperModule,
	MatChipsModule,
	MatPaginatorModule,
	MatDialogModule,
	MatRadioModule,

    MatTreeModule,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE
} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../../../core/core.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import { NgxPermissionsGuard } from 'ngx-permissions';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AuthGuard } from '../../auth/guards';
import { ServiceComponent } from './service/service.component'; 
import { ServicesService } from './service/services.service';
import { EOCSliderComponent } from './shared/slider/slider.component';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { InterceptService } from '../apps/e-commerce/_core/utils/intercept.service';
import { CreateServicelComponent } from './service/create-service.component';
import { IpRangesComboComponent } from './shared/ip-ranges-combo.component';
import { IpRangesService } from './iprange/ipranges.service';
import { MY_DATE_FORMATS } from '../../../../core/constans/constans';
import { ServicePlansComponent } from './serviceplans/serviceplans.component';
import { ServicesPlanService } from './serviceplans/serviceplans.service';
import { CreateOrEditServicePlansModalComponent } from './serviceplans/create-or-edit-serviceplans-modal.component';



const routes: Routes = [
	{
		path: '',
		component: SWComponent,
		children: [
			{
				path: 'services',
				component: ServiceComponent,
				canActivate: [AuthGuard],
				data: {
					permissions: {
						only: ['Services.Services.Administracion'],
						redirectTo: '/login'
					}
				},
			},
			{
				path: 'serviceplans',
				component: ServicePlansComponent,
				canActivate: [AuthGuard],
				data: {
					permissions: {
						only: ['Services.Services.Administracion'],
						redirectTo: '/login'
					}
				},
			},
			{
				path: 'serviceplans/add',
				component: CreateOrEditServicePlansModalComponent,
				canActivate: [AuthGuard],
				data: {
					permissions: {
						only: ['Services.Services.Agregar'],
						redirectTo: '/login'
					}
				},
			},
			{
				path: 'serviceplans/edit',
				component: CreateOrEditServicePlansModalComponent,
				canActivate: [AuthGuard],
				data: {
					permissions: {
						only: ['Services.Services.Agregar'],
						redirectTo: '/login'
					}
				},
			},
			{
				path: 'serviceplans/edit/:id',
				component: CreateOrEditServicePlansModalComponent,
				canActivate: [AuthGuard],
				data: {
					permissions: {
						only: ['Services.Services.Agregar'],
						redirectTo: '/login'
					}
				},
			},
			{
				path: 'services/add',
				component: CreateServicelComponent,
				canActivate: [AuthGuard],
				data: {
					permissions: {
						only: ['Services.Services.Agregar'],
						redirectTo: '/login'
					}
				},
			},
			{
				path: 'services/edit',
				component: CreateServicelComponent,
				canActivate: [AuthGuard],
				data: {
					permissions: {
						only: ['Services.Services.Modificar'],
						redirectTo: '/login'
					}
				},
			},
			{
				path: 'services/edit/:id',
				component: CreateServicelComponent,
				canActivate: [AuthGuard],
				data: {
					permissions: {
						only: ['Services.Services.Modificar'],
						redirectTo: '/login'
					}
				},
			}
			
		]
	}
];



@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		CoreModule,
		RouterModule.forChild(routes),
		//MaterialPreviewModule,
		PartialsModule,
		CoreModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatFormFieldModule,
		MatDatepickerModule,
		MatAutocompleteModule,
		MatListModule,
		MatSliderModule,
		MatCardModule,
		MatSelectModule,
		MatButtonModule,
		MatIconModule,
		MatNativeDateModule,
		MatSlideToggleModule,
		MatCheckboxModule,
		MatMenuModule,
		MatTabsModule,
		MatTooltipModule,
		MatSidenavModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTableModule,
		MatGridListModule,
		MatToolbarModule,
		MatExpansionModule,
		MatDividerModule,
		MatSortModule,
		MatStepperModule,
		MatChipsModule,
		MatPaginatorModule,
		MatDialogModule,
		MatRadioModule,
		MatTreeModule,
		HttpClientModule,
		PartialsModule,
		RouterModule.forChild(routes),
		PerfectScrollbarModule,
		IonRangeSliderModule

	],
	exports: [RouterModule],
	entryComponents: [
		CreateOrEditServicePlansModalComponent,
		CreateServicelComponent
	],
	providers: [
		ServicesService,
		ServicesPlanService,
		InterceptService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
			multi: true
		},
		{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
		{ provide: MAT_DATE_LOCALE, useValue: 'es-ar' },
		IpRangesService
	],
	declarations: [
		SWComponent,
        ServiceComponent,
		EOCSliderComponent,
		CreateServicelComponent,
		IpRangesComboComponent,
		CreateOrEditServicePlansModalComponent,
		CreateServicelComponent,
		ServicePlansComponent,
        EOCSliderComponent
	]
})
export class SWModule { }

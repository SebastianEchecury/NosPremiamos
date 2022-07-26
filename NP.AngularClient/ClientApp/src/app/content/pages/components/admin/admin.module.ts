import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//import { AccordionControlModule } from '../../../partials/content/general/accordion-control/accordion-control.module';
//import { MaterialPreviewModule } from '../../../partials/content/general/material-preview/material-preivew.module';
import { AdminComponent } from './admin.component';
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
    MatTreeModule
} from '@angular/material';
import { UsersComponent } from './users/users.component';
import { CreateOrEditUserModalComponent } from './users/create-or-edit-user-modal.component';
import { UserService } from './users/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../../../core/core.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { RoleComboComponent } from './shared/role-combo.component';
import { RolesService } from './roles/roles.service';
import { RolesComponent } from './roles/roles.component';
import { CreateOrEditRolModalComponent } from './roles/create-or-edit-rol-modal.component';
import { EditUserPermissionsModalComponent } from './users/edit-user-permissions-modal.component';
import { PermissionTreeComponent } from './shared/permission-tree.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { EditRolPermissionsModalComponent } from './roles/edit-rol-permissions-modal.component';
import { AuthGuard } from '../../auth/guards';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { InterceptService } from '../apps/e-commerce/_core/utils/intercept.service';



const routes: Routes = [
	{
		path: '',
		component: AdminComponent,
		children: [
			{
				path: 'users',
				component: UsersComponent,
				canActivate: [AuthGuard],
				data: {
					permissions: {
						only: ['Admin.User.Administracion'],						
						redirectTo: '/login'
					}
				},
			},			

			{
				path: 'users/add',
				component: CreateOrEditUserModalComponent,
				canActivate: [AuthGuard],
				data: {
					permissions: {
						only: ['Admin.User.Agregar'],
						redirectTo: '/login'
					}
				},
			},
			{
				path: 'users/edit',
				component: CreateOrEditUserModalComponent,
				canActivate: [AuthGuard],
				data: {
					permissions: {
						only: ['Admin.User.Modificar'],
						redirectTo: '/login'
					}
				},
			},			
			{
				path: 'users/edit/:id',
				component: CreateOrEditUserModalComponent,
				canActivate: [AuthGuard],
				data: {
					permissions: {
						only: ['Admin.User.Modificar'],
						redirectTo: '/login'
					}
				},
			},
			{
				path: 'roles',
				component: RolesComponent,
				canActivate: [AuthGuard],
				data: {
					permissions: {
						only: ['Admin.Rol.Administracion'],
						redirectTo: '/login'
					}
				},
			},
			{
				path: 'roles/add',
				component: CreateOrEditRolModalComponent,
				canActivate: [AuthGuard],
				data: {
					permissions: {
						only: ['Admin.Rol.Agregar'],
						redirectTo: '/login'
					}
				},
			},
			{
				path: 'roles/edit',
				component: CreateOrEditRolModalComponent,
				canActivate: [AuthGuard],
				data: {
					permissions: {
						only: ['Admin.Rol.Modificar'],
						redirectTo: '/login'
					}
				},
			},  
			{
				path: 'roles/edit/:id',
				component: CreateOrEditRolModalComponent,
				canActivate: [AuthGuard],
				data: {
					permissions: {
						only: ['Admin.Rol.Modificar'],
						redirectTo: '/login'
					}
				},
			},
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

	],
	exports: [RouterModule],
	entryComponents: [
		CreateOrEditUserModalComponent,
		CreateOrEditRolModalComponent,
		EditUserPermissionsModalComponent,
		EditRolPermissionsModalComponent
	],
	providers: [UserService, RolesService,

		InterceptService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
			multi: true
		},

	],
	declarations: [
		AdminComponent,
		UsersComponent,
		RolesComponent,
		CreateOrEditUserModalComponent,
		CreateOrEditRolModalComponent,
		EditUserPermissionsModalComponent,
		PermissionTreeComponent,
		RoleComboComponent,
		EditRolPermissionsModalComponent
	]
})
export class AdminModule { }

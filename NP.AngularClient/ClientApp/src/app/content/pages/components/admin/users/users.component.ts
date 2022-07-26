import { Component, Type, ViewContainerRef, ComponentFactoryResolver, OnInit, ViewEncapsulation, AfterViewInit, Injector, ViewChild, ElementRef } from '@angular/core';


import { CrudComponent, BaseCrudComponent } from '../../../../../core/shared/manager/crud.component';
import { UserService } from './user.service';
import { CreateOrEditUserModalComponent } from './create-or-edit-user-modal.component';


declare let mApp: any;
//import { LazyLoadEventData } from '../../../../shared/helpers/PrimengDatatableHelper';
//import { LocatorService } from '../../../../shared/common/services/locator.service';
//import { EditUserPermissionsModalComponent } from './edit-user-permissions-modal.component';
import { UserDto, UserFilter } from '../model/user.model';
import { IDetailComponent } from '../../../../../core/shared/manager/detail.component';
import { QueryParamsModel } from '../../../../../core/models/query-params.model';
import { tap, catchError, finalize } from 'rxjs/operators';
import { QueryResultsModel } from '../../../../../core/models/query-results.model';
import { of, merge, fromEvent } from 'rxjs';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { SubheaderService } from '../../../../../core/services/layout/subheader.service';
import { LayoutUtilsService } from '../../apps/e-commerce/_core/utils/layout-utils.service';
import { EditUserPermissionsModalComponent } from './edit-user-permissions-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { EditUserLineasModalComponent } from './edit-user-lineas-modal.component';





@Component({
    templateUrl: "./users.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class UsersComponent extends BaseCrudComponent<UserDto, UserFilter> implements OnInit {
	 

	@ViewChild('editUserPermissionsModal') editUserPermissionsModal: EditUserPermissionsModalComponent;

	onTest(): void{
		 
		//this.notificationService.info('aca', 'algo');

		//this.layoutUtilsService.showActionNotification('Guardado exitosamente');

		this.notify.info('a', 'b');

	}

	displayedColumns = ['select', 'Name', 'DisplayName', 'Email', 'IsActive', 'actions'];

  
    id: number;
    RoleId: number

	constructor(injector: Injector,
		protected _userService: UserService, 
		public dialog: MatDialog
	) {
        super(_userService, injector);
        
        this.title = "Usuarios"
        this.moduleName = "Administración General";
        this.icon = "flaticon-users";        
    }

    allowEditPermisos: boolean = false;
    SetAllowPermission() {


		super.SetAllowPermission();
		this.permission.hasPermission('Admin.User.Permisos').then(r => this.allowEditPermisos = r.valueOf());
    }


	getNewfilter(): UserFilter {
		var f = new UserFilter(); 
		return f;
    } 

    getNewItem(item: UserDto): UserDto {
        return new UserDto(item);
    }


	getDescription(item: UserDto): string {
		return item.Name;
    }

	onEditUserPermissions(user: UserDto) {

		const dialogRef = this.dialog.open(EditUserPermissionsModalComponent, {
			//height: '500px',
			data: user
		});

		
    }


    onEditUserLineas(user: UserDto) {
        //this.editUserlineasModal.show(user)
    }


    
	/* UI */
	getItemActiveString(active: boolean = false): string {  
		if (active) {
			return 'Activo';
		}
		else {
			return 'Suspendido';
		} 
	}

	getItemCssClassByActive(active: boolean = false): string {
		if (active) {
			return 'success';
		}
		else {
			return 'metal';
		}  
	}



}

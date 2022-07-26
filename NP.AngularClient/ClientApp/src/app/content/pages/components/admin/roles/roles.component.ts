import { Component, Type, OnInit, ViewEncapsulation, AfterViewInit, Injector, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { CreateOrEditRolModalComponent } from './create-or-edit-rol-modal.component';


import { RolDto } from '../model/rol.model';
import { RolesService } from './roles.service';
import { EditRolPermissionsModalComponent } from './edit-rol-permissions-modal.component';
import { CrudComponent } from '../../../../../core/shared/manager/crud.component';
import { IDetailComponent } from '../../../../../core/shared/manager/detail.component';
import { MatDialog } from '@angular/material';


@Component({

    templateUrl: "./roles.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class RolesComponent extends CrudComponent<RolDto> implements OnInit {

	displayedColumns = ['Name', 'Default', 'Static', 'Acciones'];

	constructor(injector: Injector, protected _RolesService: RolesService, 
		public dialog: MatDialog) {
        super(_RolesService, injector);
        
        this.title = "Roles"
        this.moduleName = "Administración";
        this.icon = "flaticon-settings";
    }


    allowEditPermisos: boolean = false;
    SetAllowPermission() {
        super.SetAllowPermission();
        this.allowEditPermisos = this.permission.isGranted('Admin.Rol.Permisos');
    }

    getDescription(item: RolDto): string {
        return item.Name;
        
    }
    getNewItem(item: RolDto): RolDto {
        return new RolDto(item);
    }

	onEditRolPermissions(item: RolDto) {

		const dialogRef = this.dialog.open(EditRolPermissionsModalComponent, {			
			data: item
		});
    }





}

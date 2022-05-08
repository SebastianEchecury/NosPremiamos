import { Component, ViewChild, Injector, OnInit, Inject } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';


import { PermissionTreeComponent } from '../shared/permission-tree.component';

import { RolesService } from './roles.service';

import * as _ from 'lodash';
import { UpdatePermissionsInput } from '../model/permission.model';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '../../../../../core/shared/app-component-base';
import { DetailEmbeddedComponent } from '../../../../../core/shared/manager/detail.component';
import { RolDto } from '../model/rol.model';
import { ViewMode } from '../../../../../core/shared/model/base.model';
import { SpinnerButtonOptions } from '../../../../partials/content/general/spinner-button/button-options.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
    selector: 'editRolPermissionsModal',
    templateUrl: './edit-rol-permissions-modal.component.html'
})
export class EditRolPermissionsModalComponent extends AppComponentBase {


	@ViewChild('permissionTree') permissionTree: PermissionTreeComponent;


	spinner: SpinnerButtonOptions = {
		active: false,
		spinnerSize: 18,
		raised: true,
		buttonColor: 'primary',
		spinnerColor: 'accent',
		fullWidth: false
	};


	resettingPermissions = false;

	rolId: number;
	Name: string;
	 



	constructor(
		injector: Injector,
		private _rolService: RolesService,
		public dialogRef: MatDialogRef<EditRolPermissionsModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: RolDto

	) {
		super(injector);
		this.show(data);
	}


	show(rol: RolDto): void {

		this.rolId = rol.Id;
		this.Name = rol.Description;
		this._rolService.getRolePermissionsForEdit(this.rolId).subscribe(result => {			
			this.permissionTree.editData = result.DataObject;
		});
	}

	save(): void {



		let input = new UpdatePermissionsInput();

		input.Id = this.rolId;
		input.GrantedPermissionNames = this.permissionTree.getGrantedPermissionNames();

		this.spinner.active = true;
		this._rolService.updateRolePermissions(input)
			.pipe(finalize(() => { this.spinner.active =  false; }))
			.subscribe(() => {
				this.notify.info("Guardado exitosamente");
				this.close();
			});
	}
 

	close(): void {
		this.dialogRef.close();
	}
}

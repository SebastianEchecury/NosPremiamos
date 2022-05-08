import { Component, ViewChild, Injector, ViewContainerRef, Inject } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';


import { PermissionTreeComponent } from '../shared/permission-tree.component';
import { UserService } from './user.service';
import * as _ from 'lodash';
import { UpdatePermissionsInput } from '../model/permission.model';
import { AppComponentBase } from '../../../../../core/shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections'; 
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogData } from '../../material/popups-and-modals/dialog/dialog.component';
import { UserDto } from '../model/user.model';
import { SpinnerButtonOptions } from '../../../../partials/content/general/spinner-button/button-options.interface';



@Component({
    selector: 'editUserPermissionsModal',
    templateUrl: './edit-user-permissions-modal.component.html'
})
export class EditUserPermissionsModalComponent extends AppComponentBase {

	//@ViewChild('content') modal: n;
    @ViewChild('permissionTree') permissionTree: PermissionTreeComponent;
	

   
    resettingPermissions = false;

    userId: number;
    userName: string;


	spinner: SpinnerButtonOptions = {
		active: false,
		spinnerSize: 18,
		raised: true,
		buttonColor: 'primary',
		spinnerColor: 'accent',
		fullWidth: false
	};


	onNoClick(): void {
		this.dialogRef.close();
	}


    constructor(
        injector: Injector,
		private _userService: UserService,
		public dialogRef: MatDialogRef<EditUserPermissionsModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: UserDto

    ) {
		super(injector);
		this.show(data.Id, data.Name);
    }

    show(userId: number, userName?: string): void {

        this.userId = userId;
        this.userName = userName;

        this._userService.getUserPermissionsForEdit(userId).subscribe(result => {
            this.permissionTree.editData = result.DataObject;

        });
    }

	save(): void {

		

        let input = new UpdatePermissionsInput();

        input.Id = this.userId;
        input.GrantedPermissionNames = this.permissionTree.getGrantedPermissionNames();

		this.spinner.active = true;
		this._userService.updateUserPermissions(input)
			.pipe(finalize(() => { this.spinner.active = false; })) 
            .subscribe(() => {
                this.notify.info("Guardado exitosamente");
                this.close();
            });
    } 

	close(): void {
		this.dialogRef.close(); 
    }
}

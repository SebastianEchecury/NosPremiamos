import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';


import { DetailEmbeddedComponent } from '../../../../../core/shared/manager/detail.component';
import { UserService } from './user.service';
//import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
import * as _ from 'lodash'; 
//import { FilterPipe, SortByPipe } from '../../../../shared/utils/pipe/pipe'
import { UserRoleDto, UserDto } from '../model/user.model'; 
import { ViewMode } from '../../../../../core/shared/model/base.model';
 
@Component({
    selector: 'createOrEditUserModal',
	templateUrl: './create-or-edit-user-modal.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateOrEditUserModalComponent extends DetailEmbeddedComponent<UserDto> {

	term: { isAssigned: true }; 
    roles: UserRoleDto[];
	 
    constructor(
        injector: Injector,
		service: UserService)
    {
		super(service, injector);   
		this.title = "Usuarios";
		this.page = 'users';
		this.moduleAction = "admin";
		this.moduleName = "Administración";
		this.icon = "flaticon-users";
    } 


    ngAfterViewChecked(): void {

        //Temporary fix for: https://github.com/valor-software/ngx-bootstrap/issues/1508
        //$('tabset ul.nav').addClass('m-tabs-line');
        //$('tabset ul.nav li a.nav-link').addClass('m-tabs__link');
    }

 

	getNewItem(item: UserDto): UserDto {
		return new UserDto()
	} 




    completedataBeforeShow(item: UserDto): any {
		 
        if (this.viewMode == ViewMode.Add) {
            this.roles = item.UserRoles || [];
        }
        else {

            if (item.UserRoles) {
                this.roles = item.UserRoles;
            }
        }
    }

    completedataBeforeSave(item: UserDto): any {
        this.detail.UserRoles = this.roles;
    }
	 

    getAssignedRoleCount(): number {
        return _.filter(this.roles, { IsAssigned: true }).length;
    }




 //   resetPassword(): void {
 // //      this.saving = true;

	//	//this.service.resetPassword(this.detail.Id)
	//	//	.pipe(finalize(() => { this.saving = false; }))
 // //          .subscribe(resp => {
 // //              //if (resp.Status == StatusResponse.Ok) {
 // //              //    this.message.success("Se ha enviado un mail al Usuario.", "Blanqueo de contraseña");

 // //              //}
 // //              //else {
 // //              //    this.message.error("Ha ocurrido un error.", "Blanqueo de contraseña");
 // //              //}


 // //          });

 //   }


}

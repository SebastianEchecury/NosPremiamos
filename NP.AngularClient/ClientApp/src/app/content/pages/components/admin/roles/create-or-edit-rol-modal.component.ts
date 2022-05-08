import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

import * as _ from 'lodash';
import { RolDto } from '../model/rol.model';
import { RolesService } from './roles.service';
import { DetailEmbeddedComponent } from '../../../../../core/shared/manager/detail.component';

@Component({
    selector: 'createOrEditRolModal',
    templateUrl: './create-or-edit-rol-modal.component.html',

})
export class CreateOrEditRolModalComponent extends DetailEmbeddedComponent<RolDto> {


	getNewItem(item: RolDto): RolDto {
		return new RolDto();
	}
    constructor(
        injector: Injector,
        protected service: RolesService
    ) {
        super(service, injector);
		this.detail = new RolDto();
  

		this.title = "Roles";
		this.page = 'roles';
		this.moduleAction = "admin";
		this.moduleName = "Administración";
		this.icon = "flaticon-settings";


    }

   


}

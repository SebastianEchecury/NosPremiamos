import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RolDto } from '../model/rol.model';
import { } from '../model/user.model';
import { GetPermissionsForEditOutput, UpdatePermissionsInput } from '../model/permission.model';
import { CrudService } from '../../../../../core/shared/services/crud.service';
import { environment } from '../../../../../../environments/environment';
import { ResponseModel } from '../../../../../core/shared/model/base.model';
import { Observable } from 'rxjs';

@Injectable()
export class RolesService extends CrudService<RolDto> {

    private identityUrl: string = '';
    constructor(
        protected http: HttpClient ) {
		super(http);
		this.identityUrl = environment.apiUrl + '/Roles';
        this.endpoint = this.identityUrl;
    }

    getRolePermissionsForEdit(id: number): Observable<ResponseModel<GetPermissionsForEditOutput>> {

        let url = this.identityUrl + '/GetRolePermissionsForEdit?id=' + id;
        return this.http.get<ResponseModel<GetPermissionsForEditOutput>>(url);
    }

    updateRolePermissions(input: UpdatePermissionsInput): Observable<ResponseModel<string>> {
        let url = this.identityUrl + '/UpdateRolePermissions';
        return this.http.post<ResponseModel<string>>(url, input)
    }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceDto } from '../model/service.model';
import { CrudService } from '../../../../../core/shared/services/crud.service';
import { ResponseModel } from '../../../../../core/shared/model/base.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable()
export class ServicesService extends CrudService<ServiceDto> {

    private identityUrl: string = '';
    constructor(
        protected http: HttpClient ) {
		super(http);
		this.identityUrl = environment.apiUrl + '/Services';
        this.endpoint = this.identityUrl;
    } 
}


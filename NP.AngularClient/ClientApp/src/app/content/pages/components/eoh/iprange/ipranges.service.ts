import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../../../../../core/shared/services/crud.service';
import { ResponseModel } from '../../../../../core/shared/model/base.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { IpRangeDto } from '../model/iprange.model';

@Injectable()
export class IpRangesService extends CrudService<IpRangeDto> {

    private identityUrl: string = '';
    constructor(
        protected http: HttpClient ) {
		super(http);
		this.identityUrl = environment.apiUrl + '/IpRanges';
        this.endpoint = this.identityUrl;
    } 
}


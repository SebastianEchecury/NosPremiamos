

import * as moment from 'moment';
import { Dto, FilterDTO, PaginListResultDto } from '../../../../../core/shared/model/base.model';

export class ServiceDto extends Dto<number> {
    getDescription(): string {
		return this.Name;
    }

    constructor(data?: any) {
        super(data);
    }

	Name: string;

		 
	ClientNumber: number
	ContractNumber: string
	ServiceStatusId: number
	ServiceStatusAdministrativeId: number
	Address: string
	GeoLatitude: string
	GeoLongitud: string
	ServicePlanId: number
	InternetProviderId: number
	ContactIspnumber: number
	TechnologyAccessId: number
	BandwidthId: number
	ServiceReferenceContact1: string
	ServiceReferenceContact2: string
	WorkSpaceId: number
	IpRangeId: number
	Bandwidth: string
	InternetProvider: string
	ServicePlan: string
	ServiceStatus: string
	ServiceStatusAdministrative: string
	TechnologyAccess: string
	WorkSpace: string
	DischargeDate: Date
}




export class ServiceFilter extends FilterDTO {
    Id: number;
    Page: number;
    PageSize: number;
    Sort: String;
    RoleId: number
}



 

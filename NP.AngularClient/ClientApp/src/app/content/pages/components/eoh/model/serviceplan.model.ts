

import * as moment from 'moment';
import { Dto, FilterDTO, PaginListResultDto } from '../../../../../core/shared/model/base.model';

export class ServicePlanDto extends Dto<number> {
    getDescription(): string {
		return this.Name;
    }

    constructor(data?: any) {
        super(data);
    }

	Name: string;
	CountryId: number;

	Weeks: WeekDto[] = [];
	
}

export class WeekDto extends Dto<number> {
	constructor(data?: any) {
		super(data);
		if (!this.ServicePlanSchedules) {
			this.ServicePlanSchedules = [];
		}
	}

	getDescription(): string {
		return this.Description;
	}
	DayWeek: number;
	ServicePlanSchedules: ServicePlanScheduleDto[];

	AllowDelete: boolean;
	hasError: boolean;
	
}

export class ServicePlanScheduleDto extends Dto<number> {
	getDescription(): string {
		return this.Description;
	}

	ServicePlanId: number;
	DayWeek: number;
	StartHour: number;
	EndHour: number;

}

export class ServicePlanFilter extends FilterDTO {
    Id: number;
    Page: number;
    PageSize: number;
    Sort: String;
    
}



 



import * as moment from 'moment';
import { Dto, FilterDTO, PaginListResultDto } from '../../../../../core/shared/model/base.model';

export class IpRangeDto extends Dto<number> {
    getDescription(): string {
		return this.Name;
    }

    constructor(data?: any) {
        super(data);
    }

	Name: string;	
}




export class IpRangeFilter extends FilterDTO {
    Id: number;
    Page: number;
    PageSize: number;
    Sort: String;
}



 

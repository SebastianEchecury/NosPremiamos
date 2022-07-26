import { Component, Injector, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';


import { DetailEmbeddedComponent } from '../../../../../core/shared/manager/detail.component';

//import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
import * as _ from 'lodash'; 
//import { FilterPipe, SortByPipe } from '../../../../shared/utils/pipe/pipe'

import { ViewMode } from '../../../../../core/shared/model/base.model';
import { ServiceDto } from '../model/service.model';
import { ServicesService } from './services.service';
 
@Component({
	selector: 'CreateServicelComponent',
	templateUrl: './create-service.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateServicelComponent extends DetailEmbeddedComponent<ServiceDto> {
 
    constructor(
        injector: Injector,
		service: ServicesService,
		private cdr: ChangeDetectorRef)
    {
		super(service, injector);   
		this.title = "Servicios";
		this.page = 'services';
		this.moduleAction = "services";
		this.moduleName = "Servicios";
		this.icon = "flaticon-Services";
    } 

 

	getNewItem(item: ServiceDto): ServiceDto {
		return new ServiceDto()
	} 


	ngAfterViewInit(): void {
		this.cdr.detectChanges();
	}
	
}

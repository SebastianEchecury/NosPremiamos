import { Component, Type, OnInit, ViewEncapsulation, AfterViewInit, Injector, ViewChild } from '@angular/core';
import { CrudComponent } from '../../../../../core/shared/manager/crud.component';
import { MatDialog } from '@angular/material';
import { ServiceDto } from '../model/service.model';
import { ServicePlanDto } from '../model/serviceplan.model';
import { ServicesPlanService } from './serviceplans.service';



@Component({

	templateUrl: "./serviceplans.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ServicePlansComponent extends CrudComponent<ServicePlanDto> implements OnInit {

	displayedColumns = ['Name','Acciones'];

	constructor(injector: Injector, protected _ServiceService: ServicesPlanService, 
		public dialog: MatDialog) {
        super(_ServiceService, injector);
        
		this.title = "Planes de Servicios"
        this.moduleName = "Servicios";
        this.icon = "flaticon-settings";
    }

	getDescription(item: ServicePlanDto): string {
        return item.Name;
        
    }
	getNewItem(item: ServicePlanDto): ServicePlanDto {
		return new ServicePlanDto(item);
    }

	 





}

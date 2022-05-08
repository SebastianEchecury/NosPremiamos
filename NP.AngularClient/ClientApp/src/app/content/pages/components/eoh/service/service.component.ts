import { Component, Type, OnInit, ViewEncapsulation, AfterViewInit, Injector, ViewChild } from '@angular/core';
import { CrudComponent } from '../../../../../core/shared/manager/crud.component';
import { MatDialog } from '@angular/material';
import { ServiceDto } from '../model/service.model';
import { ServicesService } from './services.service';


@Component({

    templateUrl: "./Service.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ServiceComponent extends CrudComponent<ServiceDto> implements OnInit {

	displayedColumns = ['Name', 'ClientNumber', 'ContractNumber', 'Acciones'];

	constructor(injector: Injector, protected _ServiceService: ServicesService, 
		public dialog: MatDialog) {
        super(_ServiceService, injector);
        
		this.title = "Servicios"
        this.moduleName = "Servicios";
        this.icon = "flaticon-settings";
    }

	getDescription(item: ServiceDto): string {
        return item.Name;
        
    }
	getNewItem(item: ServiceDto): ServiceDto {
		return new ServiceDto(item);
    }

	 





}

import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

import * as _ from 'lodash';

import { DetailEmbeddedComponent } from '../../../../../core/shared/manager/detail.component';
import { ServicePlanDto, ServicePlanScheduleDto, WeekDto } from '../model/serviceplan.model';
import { ServicesPlanService } from './serviceplans.service';
import { WeekDay, getLocaleDayNames, FormStyle, TranslationWidth } from '@angular/common';

@Component({
	selector: 'createOrEditServicePlansModal',
	templateUrl: './create-or-edit-serviceplans-modal.component.html',

})
export class CreateOrEditServicePlansModalComponent extends DetailEmbeddedComponent<ServicePlanDto> {


	getNewItem(item: ServicePlanDto): ServicePlanDto {
		let dto = new ServicePlanDto();


		dto.Weeks.push(new WeekDto({ Description: getLocaleDayNames("es-Ar", FormStyle.Format, TranslationWidth.Wide)[0], Id: 0, DayWeek: 0, ServicePlanSchedules: [new ServicePlanScheduleDto({ DayWeek: 0, StartHour: 0, EndHour: 23.99 })] }));
		dto.Weeks.push(new WeekDto({ Description: getLocaleDayNames("es-Ar", FormStyle.Format, TranslationWidth.Wide)[1], Id: 1, DayWeek: 1, ServicePlanSchedules: [new ServicePlanScheduleDto({ DayWeek: 1, StartHour: 0, EndHour: 23.99 })] }));
		dto.Weeks.push(new WeekDto({ Description: getLocaleDayNames("es-Ar", FormStyle.Format, TranslationWidth.Wide)[2], Id: 2, DayWeek: 2, ServicePlanSchedules: [new ServicePlanScheduleDto({ DayWeek: 2, StartHour: 0, EndHour: 23.99 })] }));
		dto.Weeks.push(new WeekDto({ Description: getLocaleDayNames("es-Ar", FormStyle.Format, TranslationWidth.Wide)[3], Id: 3, DayWeek: 3, ServicePlanSchedules: [new ServicePlanScheduleDto({ DayWeek: 3, StartHour: 0, EndHour: 23.99 })] }));
		dto.Weeks.push(new WeekDto({ Description: getLocaleDayNames("es-Ar", FormStyle.Format, TranslationWidth.Wide)[4], Id: 4, DayWeek: 4, ServicePlanSchedules: [new ServicePlanScheduleDto({ DayWeek: 4, StartHour: 0, EndHour: 23.99 })] }));
		dto.Weeks.push(new WeekDto({ Description: getLocaleDayNames("es-Ar", FormStyle.Format, TranslationWidth.Wide)[5], Id: 5, DayWeek: 5, ServicePlanSchedules: [new ServicePlanScheduleDto({ DayWeek: 5, StartHour: 0, EndHour: 23.99 })] }));
		dto.Weeks.push(new WeekDto({ Description: getLocaleDayNames("es-Ar", FormStyle.Format, TranslationWidth.Wide)[6], Id: 6, DayWeek: 6, ServicePlanSchedules: [new ServicePlanScheduleDto({ DayWeek: 6, StartHour: 0, EndHour: 23.99 })] }));


		return dto;
	}
	constructor(
		injector: Injector,
		protected service: ServicesPlanService
	) {
		super(service, injector);
		this.detail = new ServicePlanDto();


		this.title = "Plan de Servicio";
		this.page = 'serviceplans';
		this.moduleAction = "services";
		this.moduleName = "Administración";
		this.icon = "flaticon-settings";


	}


	add(Week: WeekDto) {
		Week.ServicePlanSchedules.push(new ServicePlanScheduleDto({ DayWeek: Week.DayWeek, StartHour: 0, EndHour: 23.99, AllowDelete: true }));
	}


	deleteSh(sc: ServicePlanScheduleDto) {
		let w = this.detail.Weeks.find(e => e.Id == sc.DayWeek);

		if (w) {
			w.ServicePlanSchedules.splice(w.ServicePlanSchedules.findIndex(e => e == sc), 1);
		}

	}

	completedataBeforeSave(item: ServicePlanDto): any {
		(item as any).ServicePlanSchedules = null;
	}

	validateSave(): boolean {

		let isValid = true;

		this.detail.Weeks.forEach(w => {
			w.ServicePlanSchedules.forEach(sc => {

				console.log(sc);
				console.log(sc.StartHour);
				console.log(sc.EndHour);

				let otros = w.ServicePlanSchedules.filter(e => e != sc);
				otros.forEach(o => {
					if (
						(o.StartHour <= sc.StartHour && sc.StartHour <= o.EndHour) ||
						(o.StartHour <= sc.EndHour && sc.EndHour <= o.EndHour)
					) {
						isValid = false;
						w.hasError = true;
					}
				})
			});
		});


		return isValid
	}


}

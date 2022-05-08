import { ChangeDetectionStrategy, Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutConfigService } from '../../../../core/services/layout-config.service';
import { SubheaderService } from '../../../../core/services/layout/subheader.service';
import { IonRangeSliderComponent } from 'ng2-ion-range-slider';

@Component({
	selector: 'm-dashboard',
	templateUrl: './dashboard.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

	public config: any;

	constructor(
		private router: Router,
		private configService: LayoutConfigService,
		private subheaderService: SubheaderService
	) {
		// this.subheaderService.setTitle('Dashboard');

		//fromEvent(this.sliderElement.onFinish 'keyup')
		//	.pipe(
		//		debounceTime(250),
		//		distinctUntilChanged(),
		//		tap(() => {
		//			this.paginator.pageIndex = 0;
		//			this.onSearch();
		//		})
		//	)
		//	.subscribe();
	}
	@ViewChild('sliderElement') sliderElement: IonRangeSliderComponent;


	ngOnInit(): void { }

	@ViewChild('advancedSliderElement') advancedSliderElement: IonRangeSliderComponent;

	min: number = 1;
	max: number = 10;

	private _fromValue: number=5;
	private _fromValueActual: number = 5;
	


	@Input()
	set fromValue(value: number) {
		this._fromValue = value;
		
	}
	get fromValue(): number {
		// other logic
		return this._fromValue;
	}





	simpleSlider = { name: "Simple Slider", onUpdate: undefined, onFinish: undefined };
	advancedSlider = { name: "Advanced Slider", onUpdate: undefined, onFinish: undefined };

	update(slider, event) {

		this._fromValue = event.from;
		
	}

	finish(slider, event) {
		console.log("Slider finished: " + slider.name);
		slider.onFinish = event;
	}

	setAdvancedSliderTo(from, to) {
		this.advancedSliderElement.update({ from: from, to: to });
	}
}

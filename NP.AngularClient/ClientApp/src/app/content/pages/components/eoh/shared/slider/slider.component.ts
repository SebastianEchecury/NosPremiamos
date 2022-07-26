import { ChangeDetectionStrategy, Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { IonRangeSliderComponent } from 'ng2-ion-range-slider';


@Component({
	selector: 'eoc-slider',
	templateUrl: './slider.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EOCSliderComponent implements OnInit {

	constructor()
	{ }


	@ViewChild('sliderElement') sliderElement: IonRangeSliderComponent;
	@Output() fromChange = new EventEmitter();
	@Output() toChange = new EventEmitter();
	

	ngOnInit(): void { }

	@Input() minimo: number = 1;
	@Input() maximo: number = 24;
	@Input() prefix: string;



	//from
	_from: number;
	@Input()
	set from(value: number) {
		this._from = (value) || 0;
		this.fromChange.emit(this._from);
	}
	get from(): number { return this._from; }
	


	//to
	_to: number;
	@Input()
	set to(value: number) {
		this._to = (value) || 0;
		this.toChange.emit(this._to);
	}
	get to(): number { return this._to; }



	update(slider, event) {
		this.from = event.from;
		this.to = event.to;
	}

	
	
}

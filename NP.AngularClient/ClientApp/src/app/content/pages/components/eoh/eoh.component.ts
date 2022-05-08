import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'm-eoh',
	templateUrl: './eoh.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SWComponent {


	datos = [
		{
			from: 2,
			to: 10
		},
		{
			from: 2,
			to: 10
		},
		{
			from: 2,
			to: 10
		}

	]

	

}

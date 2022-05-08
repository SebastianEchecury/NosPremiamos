import { Component, OnInit, Injector, forwardRef } from '@angular/core';


import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComboBoxComponent } from '../../../../../core/shared/components/comboBase.component';
import { IpRangeDto } from '../model/iprange.model';
import { IpRangesService } from '../iprange/ipranges.service';


@Component({
    selector: 'ipranges-combo',
	templateUrl: '../../../../../core/shared/components/comboBase.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => IpRangesComboComponent),
            multi: true
        }
    ]
})
export class IpRangesComboComponent extends ComboBoxComponent<IpRangeDto> implements OnInit {


    constructor(service: IpRangesService, injector: Injector) {
        super(service, injector);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }
}

import { Component, OnInit, ViewEncapsulation, Type, ViewChild, ReflectiveInjector, Inject, Injector, OnDestroy, AfterViewInit, Output, EventEmitter, ElementRef } from '@angular/core';
//import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
//import { MatPaginator, MatSort } from '@angular/material';
//import { Page } from 'app/shared/models/pagination';
//import { DataSource } from '@angular/cdk/collections';
//import { AlertService } from 'app/shared/components/alert/alert.service';
//import { LocatorService } from 'app/shared/services/locator.service';
//import { ICRUDComponent, DTO, Data, CrudDataSource, FilterDTO } from 'app/shared/components/crud/crud.model';
//import { CrudService } from 'app/shared/components/crud/crud.service';
//import { ITEMS_PER_PAGE } from 'app/shared/constants/constants';
import { FilterDTO, Dto, IDto, ResponseModel, PaginListResultDto, ADto, Data, ViewMode } from '../../shared/model/base.model';

//import 'rxjs/add/observable/of';
//import 'rxjs/add/operator/delay';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { AppComponentBase } from '../app-component-base';
import { CrudService } from '../services/crud.service';
import { finalize } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap';
import { LayoutUtilsService, MessageType } from '../../../content/pages/components/apps/e-commerce/_core/utils/layout-utils.service';
import { SubheaderService } from '../../services/layout/subheader.service';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SpinnerButtonOptions } from '../../../content/partials/content/general/spinner-button/button-options.interface';

export abstract class DetailComponent<T extends ADto> extends AppComponentBase implements IDetailComponent, OnInit, OnDestroy, AfterViewInit {

	viewMode: ViewMode = ViewMode.Undefined;
 
	loadingSubject = new BehaviorSubject<boolean>(false);
	loading$ = this.loadingSubject.asObservable(); 

	@ViewChild('detailForm') detailForm: NgForm;
	@Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

	@Output() modalClose: EventEmitter<any> = new EventEmitter<any>();
	icon: string;
	title: string;
	page: string;
	moduleAction: string;
	moduleName: string

	oldDetail: T; 
	id: any; 
	//displayedColumns: any;
	filter: FilterDTO = new FilterDTO();
	public isTableLoading = false;
	advancedFiltersAreShown = false;
	public detail: T;
	active = false;
	//saving = false;
	closeOnSave = false;
	protected element: ElementRef;
	protected layoutUtilsService: LayoutUtilsService;
	protected subheaderService: SubheaderService;
	private detailFB: FormBuilder;
	mainForm: FormGroup;  
	protected router: Router; 
	protected route: ActivatedRoute;

	spinner: SpinnerButtonOptions = {
		active: false,
		spinnerSize: 18,
		raised: true,
		buttonColor: 'primary',
		spinnerColor: 'accent',
		fullWidth: false
	};


	constructor(
		protected service: CrudService<T>,
		injector: Injector
	) {
		super(injector);

		this.router = injector.get(Router);
		this.route = injector.get(ActivatedRoute);

		this.element = injector.get(ElementRef);
		this.layoutUtilsService = injector.get(LayoutUtilsService);
		this.subheaderService = injector.get(SubheaderService);
		this.detail = this.getNewItem(null);
	}


	getSelector(): string {
		return this.element.nativeElement.tagName;
	}


	validateSave(): boolean {
		return true
	}

	abstract getNewItem(item: T): T; 

	ngOnInit() {


		this.modalClose.subscribe(e => {
			this.goBack();
		}) 

		this.loadingSubject.next(true);
		this.route.queryParams.subscribe(params => { 

			 //por si viene por rute  
			//if (!params.id) {
			//	//por si viene por rute  
			//	if (this.activatedRoute.snapshot.params.id) {
			//		this.proccesParam(this.activatedRoute.snapshot.params);
			//		return;
			//	}
			//}

			this.proccesParam(params);
		});

		//para que tome por rute
		//this.activatedRoute.params.subscribe(params => {
		//	
		//	if (params.id) {
		//		this.proccesParam(params);
		//	}
		
		//});
	}

	proccesParam(params: Params): void
	{
		const id = +params.id;
		

		if (id && id > 0) {
			//this.service.getById(id).subscribe(res => {
			//	this.product = res;
			//	this.oldProduct = Object.assign({}, res);
			//	this.initProduct();
			//}); 
			this.show(id);


		} else {

			this.showNew(this.getNewItem(null));
			this.initModel();
			//const newProduct = new ProductModel();
			//newProduct.clear();
			//this.product = newProduct;
			//this.oldProduct = Object.assign({}, newProduct);
			//this.initProduct();
		}
	}




	initModel() {
		this.createForm();
		//this.loadLists();
		this.loadingSubject.next(false);


		this.intBreadcrumbs();

		
	}

 

	intBreadcrumbs() {

		if (!this.detail.Id) {
			this.subheaderService.setBreadcrumbs([
				{ title: this.moduleName, page: '/' + this.moduleAction },
				{ title: this.title, icon: this.icon, page: '/' + this.moduleAction + '/' + this.page },
				{ title: 'Crear ' + this.title, page: '/' + this.moduleAction + '/' + this.page  +'/add' }
			]);
			return;
		}
		this.subheaderService.setTitle('Edit ' + this.title);
		this.subheaderService.setBreadcrumbs([
			{ title: this.moduleName, page: '/' + this.moduleAction},
			{ title: this.title, icon: this.icon, page: '/' + this.moduleAction + '/' + this.page  },
			{ title: 'Editar ' +  this.title, page: '/' + this.moduleAction + '/' +  this.page + '/edit', queryParams: { id: this.detail.Id } }
		]);
	}


	createForm() {

		//if (this.detail == null) {
		//	this.detail = new UserDto();
		//}
		//this.mainForm = this.detailFB.group({
		//	Name: [this.detail.Name, Validators.required],
		//	//manufacture: [this.detail.d, Validators.required],
		//	//modelYear: [this.detail.modelYear.toString(), Validators.required],
		//	//mileage: [this.detail.mileage, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
		//	//description: [this.detail.description],
		//	//color: [this.detail.color, Validators.required],
		//	//price: [this.detail.price, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
		//	//condition: [this.detail.condition.toString(), [Validators.required, Validators.min(0), Validators.max(1)]],
		//	//status: [this.detail.status.toString(), [Validators.required, Validators.min(0), Validators.max(1)]],
		//	//VINCode: [this.detail.VINCode, Validators.required]
		//});

		//this.filteredManufactures = this.productForm.controls.manufacture.valueChanges
		//	.pipe(
		//		startWith(''),
		//		map(val => this.filterManufacture(val.toString()))
		//	);
		//this.filteredColors = this.productForm.controls.color.valueChanges
		//	.pipe(
		//		startWith(''),
		//		map(val => this.filterColor(val.toString()))
		//	);

		//this.specificationsService.getSpecs().subscribe(res => {
		//	this.availableSpecificationTypes = res;
		//});
	}

	goBack(id = 0) {
		 
		let _backUrl = (this.router.url.split('?')[0] || this.router.url).replace('/add', '').replace('/edit', '');
		if (id > 0) {
			_backUrl += '?id=' + id;
		} 

	
		this.router.navigateByUrl(_backUrl);
		//this.router.navigate(['../users'], { relativeTo: this.route });

	}


	private saving(_saving: boolean): void {
		this.loadingSubject.next(_saving);
		this.spinner.active = _saving;
	}

	onSave(form: NgForm): void { 
		this.closeOnSave = true;
		this.save(this.detailForm);
	}

	save(form: NgForm): void {

	 
		if (this.detailForm && this.detailForm.form.invalid) {
			return;
		}

		this.saving(true);
		
		this.completedataBeforeSave(this.detail);

		if (!this.validateSave()) { 
			this.saving(false);
			return;
		}

		this.service.createOrUpdate(this.detail, this.viewMode)
			.pipe(finalize(() => {
				debugger;
				this.saving(false)
			}))
			.subscribe((t) => {

				if (this.viewMode = ViewMode.Add) {
					this.detail.Id = t.DataObject;
				}

				//this.notificationService.info('Guardado exitosamente');
				this.layoutUtilsService.showActionNotification('Guardado exitosamente', this.viewMode == ViewMode.Add ? MessageType.Create : MessageType.Update, 4000, true, false);
				if (this.closeOnSave) {
					this.close();
				};
				this.affterSave(this.detail);
				this.closeOnSave = true;
				this.modalSave.emit(null);
			})
	}

	onSaveAndContinue(): void {
		this.closeOnSave = false;
		this.save(this.detailForm);

	}



	onShown(): void {
		// $(this.nameInput.nativeElement).focus();
	}

	affterSave(detail: T): void {
		if (!this.closeOnSave) {
			this.active = false;
			this.show(this.detail.Id);
		}
	}

	ngAfterViewInit(): void {

	}
	ngOnDestroy(): void {

	}

	show(id: any) {
		this.service.getById(id).subscribe(result => {
			this.viewMode = ViewMode.Modify;
			this.showDto(result.DataObject);
			this.initModel();
		});
	}
 

	showNew(item: T) {

		if (this.detailForm) {
			//this.detailForm.reset()
			this.detailForm.resetForm();
		}

		this.viewMode = ViewMode.Add;
		this.showDto(item)
	}



	showDto(item: T) {
		this.detail = item;
			   	

		this.completedataBeforeShow(item)
		this.active = true;
	}

	getDescription(item: T): string {

		if (item && item["Description"]) {
			return item["Description"];
		}
		return "";
	}


	 


	completedataBeforeShow(item: T): any {

	}

	completedataBeforeSave(item: T): any {

	}

	close(): void {
		this.active = false;
		this.viewMode = ViewMode.Undefined;
		this.modalClose.emit(true);

	}

}


export abstract class DetailEmbeddedComponent<T extends ADto> extends DetailComponent<T> implements IDetailComponent, OnInit, OnDestroy, AfterViewInit {

	constructor(
		protected service: CrudService<T>,
		injector: Injector
	) {
		super(service, injector);

	}

}


//export abstract class DetailModalComponent<T extends ADto> extends DetailComponent<T> implements IDetailComponent, OnInit, OnDestroy, AfterViewInit {

//	@ViewChild('createOrEditModal') modal: ModalDirective;

//	showDto(item: T) {
//		super.showDto(item);
//		this.modal.show();
//	}

//	close(): void {
//		super.close();
//		this.modal.hide();
//	}

//}




export interface IDetailComponent {
	//save();
	modalSave: EventEmitter<any>;
	modalClose: EventEmitter<any>;
	viewMode: ViewMode;
	show(id: any)
	showNew(item: any)
	active: boolean;
	close()
}



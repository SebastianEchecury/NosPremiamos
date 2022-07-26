import { Component, ComponentFactoryResolver, ViewContainerRef, OnInit, Output, Input, ViewEncapsulation, EventEmitter, Type, ViewChild, ReflectiveInjector, Inject, Injector, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
//import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
//import { MatPaginator, MatSort } from '@angular/material';
//import { Page } from 'app/shared/models/pagination';
//import { DataSource } from '@angular/cdk/collections';
//import { AlertService } from 'app/shared/components/alert/alert.service';
//import { LocatorService } from 'app/shared/services/locator.service';
//import { ICRUDComponent, DTO, Data, CrudDataSource, FilterDTO } from 'app/shared/components/crud/crud.model';
//import { CrudService } from 'app/shared/components/crud/crud.service';
//import { ITEMS_PER_PAGE } from 'app/shared/constants/constants';
//import { ConfirmComponent } from 'app/shared/components/confirm/confirm.component';
//import { AppComponentBase } from '../../shared/common/app-component-base';
import { FilterDTO, Dto, IDto, ResponseModel, PaginListResultDto, ADto, ViewMode, ItemDto } from '../../shared/model/base.model';
//import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

//import { DataTable } from 'primeng/components/datatable/datatable';
//import { Paginator } from 'primeng/components/paginator/paginator';
//import { LazyLoadEventData } from '../helpers/PrimengDatatableHelper';

//import { ModalDirective, BsModalService } from 'ngx-bootstrap/modal';

import { DetailComponent, IDetailComponent } from './detail.component';
import { CrudService } from '../services/crud.service';
import { AppComponentBase } from '../app-component-base';
import { debug } from 'util';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { BaseDataSource } from '../../../content/pages/components/apps/e-commerce/_core/models/data-sources/_base.datasource';
import { merge, of, fromEvent } from 'rxjs';
import { tap, catchError, finalize, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LayoutUtilsService } from '../../../content/pages/components/apps/e-commerce/_core/utils/layout-utils.service';
import { SubheaderService } from '../../services/layout/subheader.service';
import { QueryParamsModel } from '../../models/query-params.model';
import { QueryResultsModel } from '../../models/query-results.model';

//import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
//import { LocatorService } from '../../shared/common/services/locator.service';

//import { BreadcrumbsService } from '../../theme/layouts/breadcrumbs/breadcrumbs.service';



export class CrudDataSource extends BaseDataSource {
	constructor() {
		super();
	}

	//loadProducts(queryParams: QueryParamsModel) {


	//	var filter = new UserFilter();
	//	filter.PageSize = queryParams.pageSize | 10;
	//	filter.Page = queryParams.pageNumber | 10;
	//	//filter.Sort = queryParams.
	//	//filter.FilterText = queryParams.filter;

	//	this.loadingSubject.next(true);
	//	this.productsService.lastFilter$.next(queryParams);

	//	this.productsService.search(filter).pipe(
	//		tap(res => {
	//			this.entitySubject.next(res.DataObject.Items);
	//			this.paginatorTotalSubject.next(res.DataObject.TotalCount);
	//		}),
	//		catchError(err => of(new QueryResultsModel([], err))),
	//		finalize(() => this.loadingSubject.next(false))
	//	).subscribe();

	//	//this.productsService.lastFilter$.next(queryParams);
	//	//this.loadingSubject.next(true);


	//}
}




export abstract class BaseCrudComponent<T extends ADto, F extends FilterDTO> extends AppComponentBase implements ICRUDComponent, OnInit, OnDestroy, AfterViewInit {


	protected cfr: ComponentFactoryResolver;
	//displayedColumns: any;
	filter: F;
	public isTableLoading = false;
	advancedFiltersAreShown = false;
	list: T[] = [];

	icon: string;
	title: string;
	moduleName: string;

 
	allowAdd: boolean = false;
	allowDelete: boolean = false;
	allowModify: boolean = false;

	

	active = true;
	protected detailElement: IDetailComponent;
	//protected detailComponentType: Type<IDetailComponent>

	//@ViewChild('dataTable') dataTable: DataTable;
	//@ViewChild('paginator') paginator: Paginator;
	//@ViewChild('createOrEdit', { read: ViewContainerRef }) createOrEdit: ViewContainerRef;

	dataSource: CrudDataSource;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	// Filter fields
	@ViewChild('searchInput') searchInput: ElementRef;
	filterStatus: string = '';
	filterCondition: string = '';
	// Selection
	selection = new SelectionModel<T>(true, []);

	subheaderService: SubheaderService;
	layoutUtilsService: LayoutUtilsService;


	@Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

	//public breadcrumbsService: BreadcrumbsService;
	protected router: Router;
	protected route: ActivatedRoute;
	constructor(
		protected service: CrudService<T>,
		injector: Injector
	) {
		super(injector);

		//this.breadcrumbsService = injector.get(BreadcrumbsService);

		this.cfr = injector.get(ComponentFactoryResolver);


		this.subheaderService = injector.get(SubheaderService);
		this.layoutUtilsService = injector.get(LayoutUtilsService);


		// var s = LocatorService.injector.get(ViewContainerRef);
		// LocatorService.injector.get(CreateOrEditUserModalComponent)        
		this.filter = this.getNewfilter();

		this.router = injector.get(Router);

		this.route = injector.get(ActivatedRoute);

	}

	SetAllowPermission() {

		if (this.route.snapshot && this.route.snapshot.data && this.route.snapshot.data.permissions && this.route.snapshot.data.permissions["only"]) {
			if (this.route.snapshot.data.permissions["only"][0]) {
				var b = this.route.snapshot.data.permissions["only"][0].split(".");
				var key = b[0] + '.' + b[1];

				 
				this.permission.hasPermission(key + '.Agregar').then(r => {this.allowAdd = r;});
				this.permission.hasPermission(key + '.Eliminar').then(r => { this.allowDelete = r });
				this.permission.hasPermission(key + '.Modificar').then(r => { this.allowModify = r} );  
			}
		}
	}





	ngOnInit() {

		this.SetAllowPermission();
		// If the user changes the sort order, reset back to the first page.
		this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

		/* Data load will be triggered in two cases:
		- when a pagination event occurs => this.paginator.page
		- when a sort event occurs => this.sort.sortChange
		**/
		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => {
					this.onSearch();
				})
			)
			.subscribe();

		// Filtration, bind to searchInput

		if (this.searchInput) {
			fromEvent(this.searchInput.nativeElement, 'keyup')
				.pipe(
					debounceTime(250),
					distinctUntilChanged(),
					tap(() => {
						this.paginator.pageIndex = 0;
						this.onSearch();
					})
				)
				.subscribe();
		}

		

		// Set title to page breadCrumbs
		this.subheaderService.setTitle(this.title);
		// Init DataSource
		this.dataSource = new CrudDataSource();
		//let queryParams = new QueryParamsModel({});
		// Read from URL itemId, for restore previous state


		//this.route.queryParams.subscribe(params => {
		//	if (params.id) {
		//		queryParams = this.productsService.lastFilter$.getValue();
		//		this.restoreState(queryParams, +params.id);
		//	}
		//	// First load
		//	this.dataSource.loadProducts(queryParams);
		//});

		this.dataSource.entitySubject.subscribe(res => this.list = res);


		this.onSearch();
	}


	ngAfterViewInit() {

		//setTimeout(e => {
		//	if (this.showDefaultBreadcum)
		//		//this.breadcrumbsService.defaultBreadcrumbs(this.title);

		//		if (this.showbreadcum) {
		//			var title = this.title;
		//			if (this.moduleName)
		//				title = this.moduleName + " - " + this.title;
		//			//this.breadcrumbsService.AddItem(title, this.icon, '', null, null);
		//		}
		//}
		//	, 10);

	}

	ngOnDestroy(): void {

	}

	onView(row: any) {
		this.active = false;
	}

	onEdit(row: T) {
		this.onEditID(row.Id);
	}

	onEditID(id: any) {
		if (!this.allowModify) {
			return;
		}
		this.active = false;
		this.router.navigate(['./edit'], { queryParams: { id: id }, relativeTo: this.route });


		// this.GetEditComponent().show(id);
	}

	CloseChild(): void {
		//this.GetEditComponent().close();
	}



	onCreate() {
		if (!this.allowAdd) {
			return;
		}

		var url = this.router.url;
		//this.router.navigateByUrl('/admin/users/add');
		debugger;
		//this.router.navigate(['admin/users/add']);
		this.router.navigate(['./add'], { relativeTo: this.route });

	}

	onDelete(item: T) {


		if (!this.allowDelete) {
			return;
		}

		var stringdto = this.getDescription(item);

		this.message.confirm('¿Está seguro de que desea eliminar el registro?', stringdto || 'Confirmación', (a) => {
			if (a.value) {
				this.service.delete(item.Id)
					.subscribe(() => {
						this.onSearch();
						this.notify.success(this.l('Registro eliminado correctamente'));
					});
			}

		});

	}

	getDescription(item: T): string {
		return '';
	}

	exportToExcel() {
	}


	/** SELECTION */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.list.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		if (this.isAllSelected()) {
			this.selection.clear();
		} else {
			this.list.forEach(row => this.selection.select(row));
		}
	}



	onSearch() {
		this.selection.clear();

		const queryParams = new QueryParamsModel(
			this.filterConfiguration(),
			this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
			this.paginator.pageSize
		);
		this.Search(queryParams);
		//this.dataSource.loadProducts(queryParams);
	}


	Search(queryParams: QueryParamsModel) {

		

		this.filter.PageSize = this.paginator.pageSize || 10;
		this.filter.Page = this.paginator.pageIndex;
		//filter.Sort = queryParams.
		//filter.FilterText = queryParams.filter;

		if (queryParams.sortField) {
			this.filter.Sort = queryParams.sortField + ' ' + queryParams.sortOrder;
		}



		this.dataSource.loadingSubject.next(true);
		this.service.lastFilter$.next(queryParams);

		this.service.search(this.filter).pipe(
			tap(res => {
				this.dataSource.entitySubject.next(res.DataObject.Items);
				this.dataSource.paginatorTotalSubject.next(res.DataObject.TotalCount);
			}),
			catchError(err => of(new QueryResultsModel([], err))),
			finalize(() => this.dataSource.loadingSubject.next(false))
		).subscribe();



	}


	filterConfiguration(): any {
		const filter: any = {};
		//const searchText: string = this.searchInput.nativeElement.value;

		//if (this.filterStatus && this.filterStatus.length > 0) {
		//	filter.status = +this.filterStatus;
		//}

		//if (this.filterCondition && this.filterCondition.length > 0) {
		//	filter.condition = +this.filterCondition;
		//}

		//filter.model = searchText;

		//filter.manufacture = searchText;
		//filter.color = searchText;
		//filter.VINCode = searchText;
		return filter;
	}






	getNewfilter(): F {
		return null;
	}



	reloadTable() {

	}

}

export abstract class CrudComponent<T extends ADto> extends BaseCrudComponent<T, FilterDTO>
{

	constructor(
		protected service: CrudService<T>,
		injector: Injector
	) {
		super(service, injector)
	}

	getNewfilter(): FilterDTO {
		return new FilterDTO();
	}

}

export interface ICRUDComponent {
	onView(row: any);
	onCreate(row: any);
	onEdit(row: any);
	onDelete(row: any);
	onSearch();
	reloadTable();
}

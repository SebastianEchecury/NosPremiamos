import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseModel, PaginListResultDto, ItemDto, ViewMode, FilterDTO, ADto } from '../model/base.model';
import { QueryParamsModel } from '../../models/query-params.model';

export interface Service {
    endpoint: string;
}

@Injectable()
export abstract class CrudService<T extends ADto> implements Service {

	lastFilter$: BehaviorSubject<QueryParamsModel> = new BehaviorSubject(new QueryParamsModel({}, 'asc', '', 0, 10));

    endpoint: string;

    constructor(protected http: HttpClient) {

    }

    requestAllByFilter(reqParams?: any): Observable<ResponseModel<T[]>> {
        var params = new HttpParams();
        if (reqParams) {
            Object.keys(reqParams).forEach(function(item) {
                params = params.set(item, reqParams[item]);
            });
        }

        return this.http.get<ResponseModel<T[]>>(this.endpoint + '/GetAllAsync', { params: params });
    }


    GetItemsAsync(reqParams?: any): Observable<ResponseModel<ItemDto[]>> {
        var params = new HttpParams();
        if (reqParams) {
            Object.keys(reqParams).forEach(function(item) {
                params = params.set(item, reqParams[item]);
            });
        }

        return this.http.get<ResponseModel<ItemDto[]>>(this.endpoint + '/GetItemsAsync', { params: params });
    }


    FindItemsAsync(filter: any): Observable<ResponseModel<ItemDto[]>> {
        let url = this.endpoint + '/FindItemsAsync';
        let data = filter;

        return this.http.post<ResponseModel<ItemDto[]>>(url, data);
    }

    getById(id: any): Observable<ResponseModel<T>> {

        let url = this.endpoint + '/GetByIdAsync?id=' + id;
        return this.http.get<ResponseModel<T>>(url);
    }



    createOrUpdate(data: T, mode: ViewMode): Observable<ResponseModel<any>> {

        let url = this.endpoint + '/UpdateEntity';
        if (mode == ViewMode.Add) {
            url = this.endpoint + '/SaveNewEntity';
        }
        return this.http.post<ResponseModel<T>>(url, data);
    }


    search(filter: FilterDTO): Observable<ResponseModel<PaginListResultDto<T>>> {

        let url = this.endpoint + '/GetPagedList';
        let data = filter;

        return this.http.post<ResponseModel<PaginListResultDto<T>>>(url, data);
    }

    delete(id: number): Observable<any> {
        let url = this.endpoint + '/DeleteById?id=' + id
        return this.http.post(url, null);
    }


}

//@Injectable()
//export abstract class CacheCrudService<T extends ADto> extends CrudService<T>
//{
//    storage: DBLocalStorageService;

//    constructor(protected http: HttpClient) {
//        super(http);

//        this.storage = LocatorService.getInstance(DBLocalStorageService);

//    }

//    requestAllByFilterCached(): Promise<T[]> {

//        return this.storage.getItem<T[]>(this.endpoint, null).then(r => {
//            if (r != null) {
//                return r;
//            }
//            else {
//                return this.SetCache();
//            }
//        });
//    }

//    getByIdCached(id: any): Promise<T> {
//        return this.storage.getItem<T[]>(this.endpoint, null).then(r => {
//            if (r != null) {
//                return r.find(e => e.Id == id);
//            }
//            else {
//                return this.SetCache().then(s => {
//                    return s.find(l => l.Id == id);
//                })
//            }
//        });
//    }

//    SetCache(): Promise<T[]> {
//        return this.requestAllByFilter().toPromise().then(r => {
//            return this.storage.setItem<T[]>(this.endpoint, r.DataObject.Items).then(e => {
//                return r.DataObject.Items;
//            })
//        });
//    }
//}

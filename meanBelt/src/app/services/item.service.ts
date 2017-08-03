import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import { Item } from "../item";
import { CookieService } from "ngx-cookie";


@Injectable()
export class ItemService {

  

  constructor(private _http: Http) { }

  getItems(id): Promise<Item[]> {
    console.log('in get items from service');
    return this._http.get('/api/items/tagitems', id)
    .map(data => data.json())
    .toPromise();
  }


  addItem(item: Item): Promise<Item> {
    return this._http.post('/api/items', item)
    .map(data => data.json())
    .toPromise()
  }

  updateItem(item: Item): Promise<Item> {
    return this._http.put(`/api/items/${ item._id } `, item)
    .map(data => data.json())
    .toPromise()
  }

  

}

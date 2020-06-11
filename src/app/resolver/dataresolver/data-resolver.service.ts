import { DataService } from './../../services/dataservice/data.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService implements Resolve<any>{

  constructor(private dataservice :DataService) { }
  resolve(route: ActivatedRouteSnapshot) {
    console.log("resolve",this.dataservice.getData(11))
   return this.dataservice.getData(11);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PromiseService {
  apiRoot: string = 'http://www.reddit.com/search.json';
  results: SearchItems[];
  loading: boolean;

  constructor(private http: HttpClient) {
    this.results = [];
    this.loading = false;
  }

  fetchDataPromise(searchItem: string, sortByItem: string, limitItem: number) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = `${this.apiRoot}?q=${searchItem}&sort=${sortByItem}&limit=${limitItem}`;
      this.http.get(apiURL)
        .toPromise()
        .then(
          res => {
            console.log(res)
            console.log(res.data.children);
            this.results = res.data.children.map(content => content.data);
            resolve();
          }
        )
    });

    return promise;
  }

}

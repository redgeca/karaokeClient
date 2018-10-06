import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface SearchSong {
  title: String;
};

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  searchUrl = 'http://localhost:98/api/KaraokeSongs/search';
  requestUrl = 'http://localhost:98/api/KaraokeSongs/request';

  constructor(private http: HttpClient) { }

  search(term) {
    if (!term) {
      term = ""
    }
    var restResponse:SearchSong[];
    const parameters = new HttpParams().set('filter', term);

    return this.http.get<SearchSong[]>(this.searchUrl, { params: parameters });
  }

  request(title, singer, notes) {
    const parameters = new HttpParams()
    .set('title', title)
    .set('singer', singer)
    .set('notes', notes)

    return this.http.post(this.requestUrl, parameters);
  }
}

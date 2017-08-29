import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import 'rxjs/Rx';

@Injectable()
export class BackendService {
  path: string = '';

  constructor(private apiService: ApiService) { }

  getUser(id) {
    return this.apiService.get(`${this.path}/users/${id}`)
  }
}

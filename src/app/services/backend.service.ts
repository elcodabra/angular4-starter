import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import 'rxjs/Rx';
import {Lokka} from 'lokka';
import {Transport} from 'lokka-transport-http';

@Injectable()
export class BackendService {
  path: string = '';
  client: any;

  constructor(private apiService: ApiService) {
    this.client = new Lokka({
      transport: new Transport('https://api.graph.cool/simple/v1/cj7j4hfua06ub0123qy0zawpi')
    });
  }

  getUser(id) {
    return this.apiService.get(`${this.path}/users/${id}`)
  }

  getTweets() {
    return this.client.query(`  
      query {
        allTweets(orderBy: createdAt_DESC) {
          id
          content
          createdAt
          updatedAt
          account {
            shortName
            fullName
            img
          }
        }
      }
    `)
  }

  addTweet({content}) {
    return this.client.mutate(`
    {
      createTweet(
        content: "${content}"
      ) {
        id,
        createdAt
      }
    }
  `);
  }
}

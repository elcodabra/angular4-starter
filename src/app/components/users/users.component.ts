import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import {BackendService} from "../../service/backend.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  id: number;
  user: any;

  constructor(private backendService: BackendService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.backendService.getUser(+params['id']))
      .subscribe((data: any) => {
        this.id = data.id;
        this.user = data;
      });
  }

}

import { Component, OnInit } from '@angular/core';
import {BackendService} from "../../../services/backend.service";

@Component({
  selector: 'app-home',
  templateUrl: './tweets-list.component.html',
  styleUrls: ['./tweets-list.component.css']
})
export class ListTweetsComponent implements OnInit {
  currentUser = {id: '11', img:'https://d30y9cdsu7xlg0.cloudfront.net/png/148483-200.png'};
  tweets = [];

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.backendService.getTweets()
      .then((response: any) => {
        if (response.allTweets) {
          this.tweets = response.allTweets;
        }
      });
  }

  onAdd(tweet) {
    this.backendService.addTweet(Object.assign({}, tweet, { account: this.currentUser.id }))
      .then((data) => {
        if (data) this.tweets.unshift(tweet);
      })
  }
}

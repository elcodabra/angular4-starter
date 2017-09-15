import { Component, OnInit } from '@angular/core';
import {BackendService} from "../../../services/backend.service";

@Component({
  selector: 'app-home',
  templateUrl: './tweets-list.component.html',
  styleUrls: ['./tweets-list.component.css']
})
export class ListTweetsComponent implements OnInit {
  currentUser = {img:'https://d30y9cdsu7xlg0.cloudfront.net/png/148483-200.png'};
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
    this.backendService.addTweet(tweet)
      .then((data) => {
        if (data && data.createTweet) this.tweets.unshift(data.createTweet);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

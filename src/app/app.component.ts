import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, NgForm } from '@angular/forms';

import { RedditCat } from './reddit-cat';
import { PromiseService } from './promise.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  myform: FormGroup;

  SortBy: string;
  constructor(private reddit: PromiseService) {

  }
  ngOnInit() {

    this.myform = new FormGroup({
      searchItem: new FormGroup({
      }),
      sortBy: new FormControl(),
      limit: new FormControl()
    });
  }
  submitted: any = false;
  sortOptions = [
    'relevance',
    'hot',
    'top',
    'new',
    'comments'
  ]

  title = "Reddit API With Angular 4";
  limits = [5, 10, 15, 25, 50, 100];
  model = new RedditCat('Trump', this.sortOptions[1], this.limits[3]);
  // log;
  // logs;


  onSubmit(redditForm: NgForm) {
    this.submitted = true;
    const searchItem: string = redditForm.value.searchinput;
    const limitItem: number = redditForm.value.limit;
    const sortbyItem: string = redditForm.value.sortby;
    // console.log(redditForm.value);

    if (this.myform.valid) {

      this.reddit.fetchDataPromise(searchItem, sortbyItem, limitItem);

    }
  }


  /*
  * method to trancate the string(text) to limited characters
  */
  truncateSelfText = (str, limit) => {
    let shortStr = str.indexOf('', limit);
    if (shortStr == -1) return str;
    return str.substring(0, limit);
  };
  // Find if the post has some images, if not replace with reddit image and default
  imageUrlCheck(imgExist) {
    return (imgExist !== "default" && imgExist !== "self") ?
      imgExist :
      'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
  }

  // TIMESTAMP TO DATE EXPRESSION FUNCTION
  dateFormatt = (x) => new Date(x * 1000);

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}

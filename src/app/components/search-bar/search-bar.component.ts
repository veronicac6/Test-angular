import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'searchBar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  urlInput: string = '';
  currUrl = { url: '', bookmark: false };
  msg: string;
  bookmarksArr: Array<any>;

  constructor(private sharedData: SharedDataService) {
  }

  ngOnInit() {
    this.sharedData.bookmarksArr.subscribe(arr => this.bookmarksArr = arr);
  }

  onClickSearch(url: string) {
    this.currUrl.bookmark = false;
    if (url.includes("https://www.youtube.com/watch?v=")) {
      this.currUrl.url = url;
      for (var i = 0; i <= this.bookmarksArr.length - 1; i++) {
        if (this.bookmarksArr[i].url == url) {
          this.currUrl.bookmark = true;
        }
      }
      this.sharedData.changeUrl(this.currUrl);
    } else { this.msg = "The link is not correct"; }
  }

  onClickBookmark(url: string) {
    this.currUrl.bookmark = false;
    if (url.includes("https://www.youtube.com/watch?v=")) {
      this.currUrl.url = url;
      for (var i = 0; i < this.bookmarksArr.length; i++) {
        if (this.bookmarksArr[i].url == url) {
          this.currUrl.bookmark = true;
        }
      }
      this.sharedData.addRemoveBookmark(this.currUrl);
    } else this.msg = "The link is not correct";
  }

}

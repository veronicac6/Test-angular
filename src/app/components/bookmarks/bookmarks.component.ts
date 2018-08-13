import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  constructor(private sharedData: SharedDataService) { }

  lng: number;
  bookmarksArr: Array<any>;

  ngOnInit() {
    this.sharedData.lngBookmarksObs.subscribe(lng => this.lng = lng);
    this.sharedData.bookmarksArr.subscribe(arr => this.bookmarksArr = arr);
  }

  onClickUrl(obj){
    this.sharedData.changeUrl(obj);
  }

}

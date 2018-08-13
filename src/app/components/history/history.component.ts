import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private sharedData: SharedDataService) { }

  lng: number;
  historyArr: Array<any> ;

  ngOnInit() {
    this.sharedData.lngHistoryObs.subscribe(lng => this.lng = lng);
    this.sharedData.historyArr.subscribe(arr => this.historyArr = arr);
  }

  onClickUrl(obj) {
    this.sharedData.changeUrl(obj);
  }


}

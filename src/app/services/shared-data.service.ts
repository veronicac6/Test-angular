import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SharedDataService {

  private historyLocal: any[];
  private bookmarksLocal: any[];
  private lsHs = JSON.parse(localStorage.getItem('history'));
  private lsBm = JSON.parse(localStorage.getItem('bookmarks'));

  private urlObj: BehaviorSubject<any> = new BehaviorSubject({ url: '', bookmark: false });
  private history: BehaviorSubject<any[]> = new BehaviorSubject([{ url: '', bookmark: false }]);
  private bookmarks: BehaviorSubject<any[]> = new BehaviorSubject([{ url: '', bookmark: false }]);
  private lngHistory: BehaviorSubject<number> = new BehaviorSubject(0);
  private lngBookmarks: BehaviorSubject<number> = new BehaviorSubject(0);
  private lsHistory: BehaviorSubject<number> = new BehaviorSubject(0);
  private lsBookmarks: BehaviorSubject<number> = new BehaviorSubject(0);
  currUrl = this.urlObj.asObservable();
  historyArr = this.history.asObservable();
  bookmarksArr = this.bookmarks.asObservable();
  lngHistoryObs = this.lngHistory.asObservable();
  lngBookmarksObs = this.lngBookmarks.asObservable();
  lsHistoryObs = this.lsHistory.asObservable();
  lsBookmarksObs = this.lsBookmarks.asObservable();

  constructor() {
    this.historyLocal = [];
    this.bookmarksLocal = [];
    if (localStorage.getItem('history') == null) {
      localStorage.setItem('history', JSON.stringify(this.historyLocal));
    }
    if (localStorage.getItem('bookmarks') == null) {
      localStorage.setItem('bookmarks', JSON.stringify(this.bookmarksLocal));
    }
    this.lsHistory.next(JSON.parse(localStorage.getItem('history')).length);
    this.lsBookmarks.next(JSON.parse(localStorage.getItem('bookmarks')).length);

  }

  addRemoveBookmark(obj: any) {
    obj.bookmark = !obj.bookmark;
    const objConverted = { url: obj.url, bookmark: obj.bookmark };

    if (obj.bookmark) {
      if (!this.containsObject(objConverted, this.bookmarksLocal)) {
        this.bookmarksLocal.push(objConverted);
        if (!this.containsObject(objConverted, this.lsBm)) { this.lsBm.push(objConverted); }
      }
    } else {
      const index = this.bookmarksLocal.findIndex(i => i.url == obj.url);
      const indexLs = this.lsBm.findIndex(i => i.url == obj.url);
      if (index > -1) { this.bookmarksLocal.splice(index, 1); }
      if (indexLs > -1) { this.lsBm = this.remove(obj.url, this.lsBm); }
    }
    localStorage.setItem('bookmarks', JSON.stringify(this.lsBm));
    this.lsBookmarks.next(JSON.parse(localStorage.getItem('bookmarks')).length);
    this.bookmarks.next(this.bookmarksLocal);
    this.lngBookmarks.next(this.bookmarksLocal.length);
  }

  changeUrl(obj: any) {
    this.urlObj.next(obj);
    const objConverted = { url: obj.url, bookmark: obj.bookmark };

    if (!this.containsObject(objConverted, this.historyLocal)) {
      this.historyLocal.push(objConverted);
      if (!this.containsObject(objConverted, this.lsHs)) { this.lsHs.push(objConverted); }
    }
    localStorage.setItem('history', JSON.stringify(this.lsHs));
    this.history.next(this.historyLocal);
    this.lngHistory.next(this.historyLocal.length);
    this.lsHistory.next(JSON.parse(localStorage.getItem('history')).length);

  }

  containsObject(obj, arr) {
    var i;
    for (i = 0; i <= arr.length - 1; i++) {
      if (arr[i].url == obj.url) {
        return true;
      }
    }
    return false;
  }

  remove(toDelete, arr) {
    return arr.filter(item => !toDelete.includes(item.url))
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'videoView',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit {

  URL: string;
  lsHistory: number;
  lsBookmarks: number;

  constructor(
    private sanitizer: DomSanitizer,
    private sharedData: SharedDataService) {
  }

  ngOnInit() {
    this.sharedData.currUrl.subscribe(obj => { this.URL = obj.url; });
    this.sharedData.lsHistoryObs.subscribe(n => this.lsHistory = n);
    this.sharedData.lsBookmarksObs.subscribe(n => this.lsBookmarks = n);
  }

  getEmbedUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.convertUrl(url));
  }

  convertUrl(url) {
    const videoCode = url.split("=").pop();
    return 'https://www.youtube.com/embed/' + videoCode + '?ecver=2';
  }

}

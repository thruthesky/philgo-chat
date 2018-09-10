import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { PhilGoApiService } from '../../modules/philgo-api/philgo-api.service';
import { InfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.page.html',
  styleUrls: ['./../../modules/components/scss/index.scss','./hub.page.scss'],
})
export class HubPage implements OnInit {

  re;
  newsLeft;
  newsOthers;
  photos = [];

  page_no = 1;
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService
  ) {

    philgo.app('philgo-chat.hub', { news: true }).subscribe(res => {
      console.log('app: ', res);
      this.re = res;
      this.newsLeft = this.re.news.shift();
      this.newsOthers = this.re.news;
      // this.photos = this.re.photos;
    }, e => console.error(e));

    this.loadPhotos();
  }

  ngOnInit() {
  }

  loadPhotos(event?: Event) {
    let infiniteScroll: InfiniteScroll;
    if (event) {
      infiniteScroll = <any>event.target;
    }
    console.log('loadPohtos() page_no: ', this.page_no);
    this.philgo.postQuery({
      where: `(post_id='freetalk' || post_id='qna' || post_id='travel') AND no_of_first_image > 0 AND deleted=0 AND blind=''`,
      page_no: this.page_no,
      limit: 12
    }).subscribe(posts => {
      console.log('posts: ', posts);
      this.photos = this.photos.concat(posts);
      this.page_no++;

      if (!posts || !posts.length) {
        infiniteScroll.disabled = true;
        return;
      }

      if (event) {
        infiniteScroll.complete();
      }
    })
  }

}

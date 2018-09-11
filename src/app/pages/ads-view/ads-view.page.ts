import { Component, OnInit } from '@angular/core';
import { PhilGoApiService, ApiPost } from '../../modules/philgo-api/philgo-api.service';
import { AppService } from '../../providers/app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ads-view',
  templateUrl: './ads-view.page.html',
  styleUrls: ['./ads-view.page.scss'],
})
export class AdsViewPage implements OnInit {

  post: ApiPost;
  constructor(
    private activatedRoute: ActivatedRoute,
    public philgo: PhilGoApiService,
    public a: AppService
  ) {
    activatedRoute.paramMap.subscribe(params => {
      const idx = params.get('idx');
      if (idx) {
        this.philgo.postSearch({ idx: idx }).subscribe(res => {
          console.log('res: ', res);
          if ( res.posts.length ) {
            this.post = res.posts[0];
          }
        }, e => this.a.toast(e));
      }
    })
  }

  ngOnInit() {
  }

}

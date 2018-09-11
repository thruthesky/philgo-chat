import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhilGoApiService } from '../../modules/philgo-api/philgo-api.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['../../modules/components/scss/index.scss', './forum.page.scss'],
})
export class ForumPage implements OnInit {

  post_id;
  title;
  constructor(
    activatedRoute: ActivatedRoute,
    public philgo: PhilGoApiService
  ) {
    activatedRoute.paramMap.subscribe(params => {
      this.post_id = params.get('post_id');
      if (this.post_id) {
        this.title = this.philgo.forumName(this.post_id);
      }
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    console.log('ionview did enter');
  }
}

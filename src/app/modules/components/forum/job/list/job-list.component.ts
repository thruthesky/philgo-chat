import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { PhilGoApiService, ApiForum, ApiPost, ApiPostSearch } from '../../../../philgo-api/philgo-api.service';
import { JobEditService } from '../edit/job-edit.component.service';
import { InfiniteScroll, Select } from '@ionic/angular';

import * as N from '../job.defines';
import { ComponentService } from '../../../service/component.service';
import { ActivatedRoute } from '@angular/router';
import { AngularLibrary } from '../../../../angular-library/angular-library';

@Component({
    selector: 'app-job-list-component',
    templateUrl: 'job-list.component.html',
    styleUrls: ['../../../scss/index.scss', './job-list.component.scss']
})

export class JobListComponent implements OnInit, AfterViewInit {

    showSearch = false;
    forum: ApiForum = null;
    posts: Array<ApiPost> = [];
    postView: ApiPost = null;
    @Input() category;


    form: ApiPost = <ApiPost>{};
    provinces: Array<string> = [];
    cities: Array<string> = [];
    showCities = false;
    inLoadingCities = false;

    province = '';
    city = '';
    cacheProvince = {};




    age_min = 18;
    age_max = 70;

    ageRange = {
        lower: this.age_min,
        upper: this.age_max
    };

    /**
     * Page nav
     */
    post_id = 'wanted';
    page_no = 1;
    limit = 12;
    noMorePosts = false;


    N = N;

    _ = AngularLibrary;

    inMost = false;
    /**
     * this will display a loader on initial visit.
     */
    show = {
        firstPageLoader: true
    };

    mostSearch = {
        'Manila(Metro Manila)': { province: 'Metro Manila', city: 'Metro Manila - Manila' },
        'Cebu': { province: 'Cebu', city: 'Cebu' },
        'Angeles(Clark)': { province: 'Pampanga', city: 'Pampanga - Angeles' },
        // 'Metro Manila': {province: 'Metro Manila', city: 'Metro Manila'},
        // 'Baguio': {province: 'Benguet', city: 'Benguet - Baguio'},
        // 'Pampanga': {province: 'Pampanga', city: 'Pampanga'},
        // 'Quezon': {province: 'Metro Manila', city: 'Metro Manila - Quezon'},
        // 'Mandaluyong': {province: 'Metro Manila', city: 'Metro Manila - Mandaluyong'},
        // 'Muntinlupa': {province: 'Metro Manila', city: 'Metro Manila - Muntinlupa'},
    };

    //
    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly componentService: ComponentService,
        public philgo: PhilGoApiService,
        public edit: JobEditService
    ) {

    }
    ngOnInit() { }
    ngAfterViewInit() {
        // setTimeout(() => this.onClickPost(), 200);

        this.activatedRoute.paramMap.subscribe(params => {
            const idx = params.get('idx');
            this.loadPage(null, { view: idx });
        });

        this.philgo.provinces().subscribe(provinces => {
            // console.log('provinces:: ', provinces);
            this.provinces = provinces;
            // this.provinces.splice(1, 0, 'Mabalacat', 'Cebu');
            console.log('provinces: ', this.provinces);
        }, e => {
            this.componentService.alert(e);
        });
    }

    onSearch() {
        this.page_no = 1;
        this.posts = [];
        this.loadPage();
    }

    loadPage(event?: Event, options: { view: string } = <any>{}) {
        let infiniteScroll: InfiniteScroll;
        if (event) {
            infiniteScroll = <any>event.target;
        }

        const and = [];
        if (this.form[N.gender]) {
            and.push(`${N.gender}='${this.form[N.gender]}'`);
        }
        if (this.city) {
            and.push(`${N.city} LIKE '${this.city}%'`);
        }

        if (this.ageRange['lower'] > this.age_min || this.ageRange['upper'] < this.age_max) {
            const n = new Date();
            const min = n.getFullYear() - this.ageRange['lower'];
            const max = n.getFullYear() - this.ageRange['upper'];
            and.push(`${N.birthday}>=${max}0101 AND ${N.birthday}<=${min}1231`);
        }

        const req: ApiPostSearch = { post_id: this.post_id, category: this.category, page_no: this.page_no, limit: this.limit, deleted: 0 };
        req.and = and.join(' AND ');
        if (options.view) {
            req.view = options.view;
        }
        console.log('re: ', req);
        this.philgo.postSearch(req).subscribe(search => {
            this.show.firstPageLoader = false;
            console.log('search: ', search);
            this.page_no++;
            this.forum = search;
            if (search && search.view && search.view.idx) {
                this.postView = search.view;
                this.postView['show'] = true;
            }

            if (!search.posts || !search.posts.length) {
                if (event) {
                    infiniteScroll.disabled = true;
                }
                this.noMorePosts = true;
                return;
            }

            if (this.postView && this.postView.idx) {
                const pos = search.posts.findIndex(v => v.idx === this.postView.idx);
                if (pos !== -1) {
                    search.posts.splice(pos, 1);
                }
            }

            this.posts = this.posts.concat(search.posts);
            if (event) {
                infiniteScroll.complete();
            }

        }, e => {
            this.show.firstPageLoader = false;
            this.componentService.alert(e);
        });
    }

    async onClickPost() {

        if (this.philgo.isLoggedOut()) {
            return this.componentService.alert({ message: this.philgo.t({ ko: '먼저 로그인하십시오.', en: 'Please sign-in first.' }) });
        }


        const re = await this.edit.present({
            post_id: 'wanted',
            category: this.category
        });

        if (re.role === 'success') {
            this.posts.unshift(re.data);
        }

    }

    async onView(post: ApiPost) {
        console.log(post);
        if (this.postView && this.postView.idx && this.postView.idx === post.idx) {
            return;
        } else {
            post.show = !post.show;
            history.pushState({}, post.subject, `/job/${post.category}/${post.idx}`);
        }

        // const modal = await this.modalController.create({
        //     component: JobViewComponent,
        //     componentProps: {
        //         controller: this.modalController,
        //         post: post
        //     }
        // });
        // await modal.present();
        // const re = await modal.onDidDismiss();
    }

    /**
     * Opens Job edit box.
     * @param post  job post
     */
    async onEdit(post: ApiPost) {

        /**
         * Make a copy from job post. So, it will not be referenced.
         */
        const data = Object.assign({}, post);
        const res = await this.edit.present(data);
        if (res.role === 'success') {
            Object.assign(post, res.data);
        }
    }

    async onDelete(post: ApiPost) {
        console.log(post);
        const re = await this.componentService.deletePostWithMemberLogin(post);
        if (re === 'success') {
            const pos = this.posts.findIndex(p => p.idx === post.idx);
            console.log('pos: ', pos);
            if (pos !== -1) {
                this.posts.splice(pos, 1);
            }
        }
    }

    onClickSetProvince( key: string ) {
        this.province = key;
    }

    onClickProvince() {
        if (!this.province) {
            return;
        }

        console.log('this.province:: ', this.province);
        const most = this.mostSearch[this.province];

        if (most) {
            this.inMost = true;
            this.province = most.province;
            this.city = most.city;
            this.onSearch();
        } else if (!this.inMost) {
            this.city = this.province;
            this.inMost = false;
        } else {
            this.inMost = false;
        }

        this.getCities(this.province);

    }

    /**
     * Caches cities of province
     * @param province city
     */
    getCities(province) {
        this.showCities = false;
        if (this.cacheProvince[province] !== void 0) {
            this.cities = this.cacheProvince[province];
            setTimeout(  () => this.showCities = true, 100);
            return;
        }
        if (this.inLoadingCities) {
            return;
        }
        this.inLoadingCities = true;
        this.philgo.cities(province).subscribe(cities => {
            this.cities = cities;
            this.cacheProvince[province] = cities;
            this.showCities = true;
            this.inLoadingCities = false;
        }, e => {
            this.componentService.alert(e);
            this.showCities = false;
            this.inLoadingCities = false;
        });
    }

    get cityKeys() {
        return Object.keys(this.cities);
    }

    onClickCity() {
        // this.onSearch();
        console.log(this.city);
    }
}

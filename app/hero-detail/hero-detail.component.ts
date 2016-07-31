import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    Output,
    EventEmitter
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Hero, HeroService } from '../common/index'

@Component({
    selector: 'my-hero-detail',
    templateUrl: 'app/hero-detail/hero-detail.html'
})

export class HeroDetailComponent implements OnInit, OnDestroy {
    @Input() hero: Hero
    @Output() close = new EventEmitter()

    error: any
    sub: any
    navigated = false

    constructor(private route: ActivatedRoute, private heroService: HeroService) {
        
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if(typeof params['id'] !== 'undefined') {
                let id = +params['id']
                this.navigated = true

                this.heroService.getHero(id)
                    .then(hero => this.hero = hero)
            } else {
                this.navigated = false
                this.hero = new Hero()
            }
        })
    }

    ngOnDestroy() {
        this.sub.unsubscribe()
    }

    save() {
        this.heroService.save(this.hero)
            .then(hero => {
                this.hero = hero
                this.goBack(hero)
            })
            .catch(error => this.error = error)
    }

    goBack(savedHero: Hero = null) {
        this.close.emit(savedHero)

        if(this.navigated) {
            window.history.back()
        }
    }
}
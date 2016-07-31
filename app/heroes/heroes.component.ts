import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';

import { Hero, HeroService } from '../common/index'
import { HeroDetailComponent } from '../hero-detail/index'

@Component({
    selector: 'my-heroes',
    templateUrl: 'app/heroes/heroes.html',
    directives: [ HeroDetailComponent ],
    providers: [ HeroService ]
})

export class HeroesComponent implements OnInit {
    heroes: Hero[]
    selectedHero: Hero
    addingHero = false
    error: any

    constructor(private heroService: HeroService, private router: Router) {

    }

    ngOnInit() {
        this.getHeroes()
    }

    getHeroes() {
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes)
            .catch(error => this.error = error)
    }

    addHero() {
        this.addingHero = true
        this.selectedHero = null
    }

    close(savedHero: Hero) {
        this.addingHero = false

        if (savedHero) {
            this.getHeroes()
        }
    }

    deleteHero(hero: Hero, e: any) {
        e.stopPropagation();

        this.heroService.delete(hero)
            .then(res => {
                this.heroes = this.heroes.filter(h => h !== hero)

                if (this.selectedHero === hero) {
                    this.selectedHero = null
                }
            })
            .catch(error => this.error = error)
    }

    onSelect(hero: Hero) {
        this.selectedHero = hero
        this.addingHero = false
    }

    gotoDetail() {
        const id = this.selectedHero.id
        this.router.navigate([ '/detail', id ])
    }
}
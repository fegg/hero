import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';

import { Hero, HeroService } from '../common/index'

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard/dashboard.html',
  providers: [ HeroService ]
})

export class DashboardComponent implements OnInit {
    heroes: Hero[] = []

    constructor(private router: Router, private heroService: HeroService) {}

    ngOnInit() {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1, 5))
    }

    gotoDetail(hero) {
        let link = [ '/detail', hero.id ]
        this.router.navigate(link)
    }
}
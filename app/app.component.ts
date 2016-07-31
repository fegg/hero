import { Component } from '@angular/core'
import { ROUTER_DIRECTIVES } from '@angular/router'

import { HeroService } from './common/index'
import { HeroesComponent } from './heroes/index'

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <nav>
            <a [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard</a>
            <a [routerLink]="['/heroes']" routerLinkActive="active">Heroes</a>
        </nav>
        <router-outlet></router-outlet>
    `,
    directives: [ ROUTER_DIRECTIVES, HeroesComponent ],
    providers: [ HeroService ]
})

export class AppComponent {
    title = 'Angular 2'
}

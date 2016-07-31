import { bootstrap } from '@angular/platform-browser-dynamic'
import { HTTP_PROVIDERS, XHRBackend } from '@angular/http'
import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api'

import { InMemoryDataService } from './db/index'
import { AppComponent } from './app.component'
import { appRouterProviders } from './app.routes'

bootstrap(AppComponent, [
    appRouterProviders,
    HTTP_PROVIDERS,
    {
        provide: XHRBackend,
        useClass: InMemoryBackendService
    },
    {
        provide: SEED_DATA,
        useClass: InMemoryDataService
    }
]);
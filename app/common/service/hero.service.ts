import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/toPromise'

import { Hero } from '../entity/hero'

/**
 * 
 * 提供一些 hero 的服务
 * CRUD
 * @export HeroService
 * @class HeroService
*/
@Injectable()
export class HeroService {
    /**
     * 
     * Web API Url
     * @private
     */
    private heroesUrl = 'app/heroes'

    constructor(private http: Http) {
        
    }

    /**
     * 
     * 根据 id 获取 hero 对象
     * @param {number} id
     * @returns {Promise<Hero>}
     */
    getHero(id: number): Promise<Hero> {
        return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id))
    }

    /**
     * 
     * 获取所有的 hero 信息
     * @returns {Promise<Hero[]>}
     */
    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError)
    }

    /**
     * 
     * 根据 id, 修改一个 hero 的信息
     * @param {Hero} hero
     * @returns {Promise<Hero>}
     */
    private put(hero: Hero): Promise<Hero> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        })

        let url = `${this.heroesUrl}/${hero.id}`

        return this.http.put(url, JSON.stringify(hero), {headers: headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError)
    }

    /**
     * 
     * 添加一个 hero
     * @param {Hero} hero
     * @returns {Promise<Hero>}
     */
    private post(hero: Hero): Promise<Hero> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        })

        return this.http.post(this.heroesUrl, JSON.stringify(hero), headers)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError)
    }

    /**
     * 
     * 删除 hero
     * @param {number} id
     * @returns {Promise<any>}
     */
    delete(hero: Hero): Promise<any> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        })

        let url = `${this.heroesUrl}/${hero.id}`

        return this.http.delete(url, { headers: headers })
            .toPromise()
            .catch(this.handleError)
    }

    /**
     * 
     * 保存 hero 信息的语法糖
     * @param {Hero} hero
     * @returns {Promise<Hero>}
     */
    save(hero: Hero): Promise<Hero>  {
        if (hero.id) {
            return this.put(hero);
        }

        return this.post(hero);
    }

    /**
     * 
     * 统一错误处理
     * @param {*} error
     * @returns
     */
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error)

        return Promise.reject(error.message || error)
    }
}
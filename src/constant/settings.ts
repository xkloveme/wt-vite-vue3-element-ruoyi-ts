/*
 * @Description:
 * @Autor: xkloveme
 * @Date: 2020-12-08 10:28:32
 * @LastEditors: xkloveme
 * @LastEditTime: 2021-10-20 13:35:31
 */

export enum Language{
     En='en',
     Zh='zh-cn',
}

export enum Environment{
    Development = 'development',
    Production = 'production'
}

export enum RouterSource{
    Frontend = 'frontend',
    Backend = 'backend'
}

export enum RouterMode{
    Hash = 'hash',
    HISTORY = 'history'
}

export enum TokenStorageName{
    LocalStorage = 'localStorage',
    SessionStorage = 'sessionStorage',
    Cookie = 'cookie'
}

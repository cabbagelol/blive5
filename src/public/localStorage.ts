/**
 * 持久储存
 * https://www.itsvse.com/thread-5214-1-1.html
 */

export class LocalStorage {

    public localStorage: any;

    // constructor() {
    //     if (!localStorage) {
    //         throw new Error('Current browser does not support Local Storage');
    //     }
    //     this.localStorage = localStorage;
    // }

    public set(key: string, value: string): void {
        this.localStorage[key] = value;
    }

    public get(key: string): string {
        return this.localStorage[key] || false;
    }

    static setObject(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
     }

    static getObject(key: string): any {
        return JSON.parse(localStorage.getItem(key) || '{}');
    }

    public remove(key: string): any {
        this.localStorage.removeItem(key);
    }
}

export class SeesionStorage {
    public seesionStorage: any;
    constructor() {
        if (!sessionStorage) {
            throw new Error('Current browser does not support Seesion Storage');
        }
        this.seesionStorage = sessionStorage;
    }

    public set(key: string, value: string): void {
        this.seesionStorage[key] = value;
    }

    public get(key: string): string {
        return this.seesionStorage[key] || false;
    }

    public setObject(key: string, value: any): void {
        this.seesionStorage[key] = JSON.stringify(value);
    }

    public getObject(key: string): any {
        return JSON.parse(this.seesionStorage[key] || '{}');
    }

    public remove(key: string): any {
        this.seesionStorage.removeItem(key);
    }
}
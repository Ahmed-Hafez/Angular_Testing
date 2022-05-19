import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  log(methodName: string): void {
    console.log(methodName + ' method is called');
  }
}

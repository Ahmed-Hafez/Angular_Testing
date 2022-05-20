import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  messages: string[] = [];

  constructor() { }

  log(methodName: string): void {
    this.messages.push(methodName + ' is called');
  }

  clear(): void {
    this.messages = [];
  }
}

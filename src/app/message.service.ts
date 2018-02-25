import { Injectable } from '@angular/core';

@Injectable()
//Messages used for reporting and displaying  components and services  getVideos, getVideo, View Details activities
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
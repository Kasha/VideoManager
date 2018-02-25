import { Component, OnInit } from '@angular/core';
import { Video, VideoDetails } from '../video';
import { VideoService } from '../video.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  videos: Video[] = [];
  constructor(private videoService: VideoService, private messageService: MessageService) { }
 
  ngOnInit() {
    this.getVideos();
  }
 
  getVideos(): void {
    //this.videos points to videoService.videos for Angular HTML update using videos
    this.videoService.getVideos()
      .subscribe(videos => {
        this.videos = videos.slice(1, 4) ;
        this.messageService.add(`DashboardComponent.getVideos display top 4 videos`) ;
      });
  }
}
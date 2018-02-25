import { Component, OnInit } from '@angular/core';
import { Video, VideoDetails } from '../video';
import { VideoService } from '../video.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-video-manager',
  templateUrl: './video-manager.component.html',
  styleUrls: ['./video-manager.component.css']
})

export class VideoManagerComponent implements OnInit {
  videos: Video[];
  videoUrl:string;
  constructor(private videoService: VideoService, private messageService: MessageService) { }

  ngOnInit() {
   this.getVideos() ;
  }

  /*
   Late binding for detailed video object (VideoDetails) with actual video link
   @param videoUrl - string,  optional. If empty it is set inside  this.videoService.getVideos.
 * return video - Array of Video objects.
  */
  getVideos(videoUrl?:string): void {
    this.videoService.getVideos(videoUrl)
    .subscribe(videos =>
      {
        this.messageService.add(`VideoManagerComponent.getVideos service OK`) ;
        //this.videos points to videoService.videos for Angular HTML update using videos
        this.videos = videos ;
      }
    );
  }
}

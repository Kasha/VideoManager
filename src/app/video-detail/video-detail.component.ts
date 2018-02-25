import { Component, OnInit, Input } from '@angular/core';
import { Video, VideoDetails } from '../video';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { VideoService }  from '../video.service';
import { Cloudinary } from '@cloudinary/angular-5.x'; 
import { MessageService } from '../message.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {
  // Set from videoService geVideoDetails to videoService.videos list for Angular HTML update using videoService.videos[id].oVideoDetails
  oVideoDetails: VideoDetails;
  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private location: Location,
    private cloudinary: Cloudinary,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.getVideos();
  }
  // We get here when URL is with detail path and a specific video id http://[uri]/detail/[video id].
  // (explicit by direct link navigation or implicit when user clicked on video button).
  // Make sure videos were loaded before calling for specific video
  getVideos():void
  {
      this.videoService.getVideos()
      .subscribe(videos =>
        {
          this.getVideo() ;
        }
      );
  }
  // Late binding and loading of details video by id using URL id parameter (query string)
  getVideo(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.videoService.getVideoDetails(id)
      .subscribe(oVideoDetails => { 
        this.oVideoDetails = oVideoDetails ;
        this.messageService.add(`VideoDetailComponent.getVideo display video details`) ;
      });
  }
  goBack(): void {
    this.location.back();
  }
}

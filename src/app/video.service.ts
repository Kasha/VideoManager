import { Injectable, Optional } from '@angular/core';
import { Video, VideoDetails } from './video';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { catchError, map, tap } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';

const VIDEOURL = 'http://veeca.me/fetchvideo/cloudinary.json' ;//Default video json list URL

@Injectable()
//Retrieves JSON Files, Videos and Video Details
//Fetch Video List, Fetch with late binding detailed video JSON file for each video item in list
export class VideoService {

 private videos:Video[] ;

 private videoUrl = 'http://veeca.me/fetchvideo/cloudinary.json' ;//Default video json list URL

 constructor(private http: HttpClient, private messageService: MessageService) {}
 /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.messageService.add(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  getVideos(dataURL=VIDEOURL): Observable<Video[]> 
  {
    //Make http request when loading and future TODO, 
    //1. When log in
    //2. Use websocket or check server every x seconds for updated video list
    if( typeof(this.videos) == "object" ) 
    {
      return of(this.videos);
    }
    this.messageService.add('VideoService: fetched videos');
    return this.http.get<Video[]>(dataURL).pipe(
    tap(videos => 
      {      
        this.videos = videos ;//Cache locally retrieved videos list
        for( let i = 0 ; i < videos.length ; i++ )
        {
          videos[i].id = i+1 ;
          //Retrieve Detailed Video JSON, over http, for each video item 
          this.getVideoDetails(i+1)
          .subscribe(oVideoDetails =>
          {
           this.messageService.add(`VideoService.getVideos video details id=${i+1} name=${oVideoDetails.name} - OK`) ;
          })
        }
    }),
    catchError(this.handleError('getVideos', [])));
  }
  
  getVideo(id: number): Observable<Video> 
  {
   //this.messageService.add(`VideoService: fetched video id=${id}`);
    return of(this.videos.find(video => video.id === id));
  }

  /*
   Late binding for detailed video object (VideoDetails) with actual video link
   @param id - number,  this.videos[id-1] 
 * return videoDetails - VideoDetails object with video expanded details, including video url.
  */
  getVideoDetails(id:number): Observable<any> 
  {
    //If this.videos is empty, call and subscribe to getVideos (could happen if url is with specific video id)
    if( typeof(this.videos) == "undefined" )
    {
      this.getVideos()
      .subscribe(videos =>
        {    
          //When done call again getVideoDetails.
          return this.getVideoDetails(id);
        }
      );
    }
    else
    {
      let oVideo = this.videos[id-1] ;
      //Check if video with id number was loaded and whether it's Detailed Video was also loaded
      if( typeof(oVideo) == "object" )
      {
            let oVideoDetails = oVideo.details ;
            if( typeof(oVideoDetails) == "object" )
            {
              return of(oVideoDetails) ;
            }
      }
      //Detailed Video Json URL
      let dataURL = oVideo.url ;
      //Else load JSON file over http
      return this.http.get<any>(dataURL).pipe(
      tap(oVideoDetails => 
        {      
          oVideo.details = oVideoDetails ;
          oVideoDetails.id = id ;
          oVideoDetails.image =  oVideo.image ;
          this.messageService.add(`VideoService.getVideoDetails video id=${id} name=${oVideoDetails.name} - OK`) ;
      }),
      catchError(this.handleError('getVideoDetails', [])));
    }
  }
}

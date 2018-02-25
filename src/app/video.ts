//Definition of expected data model, list of video objects with attached detailed video object with actual video link  

export class VideoDetails {
    name: string; // Video Title
    url: string; //Video URL
    description: string ; //Video Description

    constructor(id: number, name: string, url: string, description: string)
    {
      this.name = name ;
      this.url = url ;
      this.description = description ;
    };
  }

export class Video {
    id: number;
    name: string; // Video Name
    url: string; // URL to Json with Video Details 
    image: string; //Video Image
    details: VideoDetails ;

    constructor(id: number, name: string, url: string, image: string, details=null)
    {
      this.id = id ;
      this.name = name ;
      this.url = url ;
      this.image = image ;
      this.details = details ;//Detailed video object with actual video link
    };
  }
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { VideoManagerComponent } from './video-manager/video-manager.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { VideoService } from './video.service';
import { MessageService }       from './message.service';
import { MessagesComponent }    from './messages/messages.component';
import { AppRoutingModule }     from './app-routing.module';
import { HttpClientModule}     from '@angular/common/http';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import { Cloudinary } from '@cloudinary/angular-5.x/src/cloudinary.service';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};

@NgModule({
  declarations: [
    AppComponent,
    VideoManagerComponent,
    VideoDetailComponent,
    MessagesComponent,
    DashboardComponent, 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CloudinaryModule.forRoot(cloudinary, {cloud_name: 'sdk-test'})
  ],
  providers: [
    VideoService,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

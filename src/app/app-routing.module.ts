import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoManagerComponent }      from './video-manager/video-manager.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { VideoDetailComponent }  from './video-detail/video-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/VideoManager', pathMatch: 'full' },
  { path: 'VideoManager', component: VideoManagerComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: VideoDetailComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}
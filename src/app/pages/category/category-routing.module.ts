import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MaintenanceComponent} from "../../extrapages/maintenance/maintenance.component";

import {AuthGuard} from "../../core/guards/auth.guard";
import {UsersComponent} from "./users/users.component";
import {ProfileComponent} from "./profile/profile.component";
import {ProfileAddComponent} from "./profile/profile-add.component";
import {TranfersComponent} from "./tranfer/tranfers.component";
import {LeaveComponent} from "./leave/leave.component";
import {ReportComponent} from "./report/report.component";


const routes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'profile/add', component: ProfileAddComponent},
  {path: 'profile/edit/:id', component: ProfileAddComponent},
  {path: 'profile/:id/:action', component: ProfileAddComponent},
  {path: 'tranfers', component: TranfersComponent},
  {path: 'leave', component: LeaveComponent},
  {path: 'report', component: ReportComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {
}

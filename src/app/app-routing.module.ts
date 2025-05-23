import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFlightComponent } from './create-flight/create-flight.component';
import { ModifyFlightComponent } from './modify-flight/modify-flight.component';
import { DeleteFlightComponent } from './delete-flight/delete-flight.component';
import { ViewFlightComponent } from './view-flight/view-flight.component';

const routes: Routes = [
  { path: 'add', component: CreateFlightComponent },
  { path: 'modify', component: ModifyFlightComponent },
  { path: 'delete', component: DeleteFlightComponent },
  { path: 'view', component: ViewFlightComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ResultsComponent} from './results/results.component';


const routes: Routes = [
  {
    path: '', component: ResultsComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule {
}

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';


const routes: Routes = [
  {path: '', component: HomepageComponent, pathMatch: 'full'},
  {path: 'result', loadChildren: () => import('./results/results.module').then(m => m.ResultsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

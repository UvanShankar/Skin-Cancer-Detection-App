import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiseaseDetailPage } from './disease-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DiseaseDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiseaseDetailPageRoutingModule {}

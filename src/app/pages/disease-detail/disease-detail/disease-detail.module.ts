import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiseaseDetailPageRoutingModule } from './disease-detail-routing.module';

import { DiseaseDetailPage } from './disease-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiseaseDetailPageRoutingModule
  ],
  declarations: [DiseaseDetailPage]
})
export class DiseaseDetailPageModule {}

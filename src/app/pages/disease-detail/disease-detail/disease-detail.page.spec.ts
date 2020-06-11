import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiseaseDetailPage } from './disease-detail.page';

describe('DiseaseDetailPage', () => {
  let component: DiseaseDetailPage;
  let fixture: ComponentFixture<DiseaseDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiseaseDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMovementsFormComponent } from './stock-movements-form.component';

describe('StockMovementsFormComponent', () => {
  let component: StockMovementsFormComponent;
  let fixture: ComponentFixture<StockMovementsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockMovementsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockMovementsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

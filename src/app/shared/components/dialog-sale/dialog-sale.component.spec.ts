import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSaleComponent } from './dialog-sale.component';

describe('DialogSaleComponent', () => {
  let component: DialogSaleComponent;
  let fixture: ComponentFixture<DialogSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogSaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

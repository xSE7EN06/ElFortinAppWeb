import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPromotionComponent } from './dialog-promotion.component';

describe('DialogPromotionComponent', () => {
  let component: DialogPromotionComponent;
  let fixture: ComponentFixture<DialogPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogPromotionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

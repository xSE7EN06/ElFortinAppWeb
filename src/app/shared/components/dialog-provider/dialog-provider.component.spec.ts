import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProviderComponent } from './dialog-provider.component';

describe('DialogProviderComponent', () => {
  let component: DialogProviderComponent;
  let fixture: ComponentFixture<DialogProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogProviderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

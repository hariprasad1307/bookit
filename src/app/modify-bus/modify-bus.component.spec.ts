import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyBusComponent } from './modify-bus.component';

describe('ModifyBusComponent', () => {
  let component: ModifyBusComponent;
  let fixture: ComponentFixture<ModifyBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyBusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

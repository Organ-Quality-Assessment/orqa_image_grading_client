import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivergradingComponent } from './livergrading.component';

describe('LivergradingComponent', () => {
  let component: LivergradingComponent;
  let fixture: ComponentFixture<LivergradingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivergradingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivergradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

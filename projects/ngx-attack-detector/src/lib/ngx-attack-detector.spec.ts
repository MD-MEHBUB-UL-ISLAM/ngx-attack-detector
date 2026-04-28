import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAttackDetector } from './ngx-attack-detector';

describe('NgxAttackDetector', () => {
  let component: NgxAttackDetector;
  let fixture: ComponentFixture<NgxAttackDetector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxAttackDetector],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxAttackDetector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

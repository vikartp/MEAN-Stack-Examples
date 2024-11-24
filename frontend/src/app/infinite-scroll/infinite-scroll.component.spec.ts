import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsComponent } from './infinite-scroll.component';

describe('IsComponent', () => {
  let component: IsComponent;
  let fixture: ComponentFixture<IsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuentListComponent } from './stuent-list.component';

describe('StuentListComponent', () => {
  let component: StuentListComponent;
  let fixture: ComponentFixture<StuentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StuentListComponent]
    });
    fixture = TestBed.createComponent(StuentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

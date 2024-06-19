import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongDashboardComponent } from './song-dashboard.component';

describe('SongDashboardComponent', () => {
  let component: SongDashboardComponent;
  let fixture: ComponentFixture<SongDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SongDashboardComponent]
    });
    fixture = TestBed.createComponent(SongDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

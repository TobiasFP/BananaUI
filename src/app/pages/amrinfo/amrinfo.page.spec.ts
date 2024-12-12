import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmrinfoPage } from './amrinfo.page';

describe('AmrinfoPage', () => {
  let component: AmrinfoPage;
  let fixture: ComponentFixture<AmrinfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AmrinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NodesandedgesPage } from './nodesandedges.page';

describe('NodesandedgesPage', () => {
  let component: NodesandedgesPage;
  let fixture: ComponentFixture<NodesandedgesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NodesandedgesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

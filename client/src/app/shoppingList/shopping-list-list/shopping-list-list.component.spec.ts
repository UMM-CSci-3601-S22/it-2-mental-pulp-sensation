import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListListComponent } from './shopping-list-list.component';

describe('ShoppingListListComponent', () => {
  let component: ShoppingListListComponent;
  let fixture: ComponentFixture<ShoppingListListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingListListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

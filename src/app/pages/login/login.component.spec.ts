import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

//TODO:Aislado! 
it('Debe de existir el AppComponent', () => {
  const fixture = TestBed.createComponent(LoginComponent);
  const app = fixture.componentInstance
  expect(app).toBeTruthy(); //TODO: ✔
});

it('Debe retornar formulario valido', () => {
  const fixture = TestBed.createComponent(LoginComponent);
  const app = fixture.componentInstance
  fixture.detectChanges()

  let email = app.loginform.controls['email']
  let password = app.loginform.controls['password']


  email.setValue('test1')
  password.setValue('test1')



  expect(app.loginform.invalid).toBeFalse(); //TODO: ✔
});

});

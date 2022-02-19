import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormFieldModule } from '@components/form-field/form-field.module';
import { TabModule } from '@components/tab/tab.module';
import { SigninService } from '@services/signin/signin.service';
import { SignInComponent } from './sign-in.component';

const signInServiceStub = {
  signip: jest.fn()
}

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [
        TabModule,
        FormFieldModule,
        RouterModule,
        RouterTestingModule
      ],
      providers: [{ provide: SigninService, useValue: signInServiceStub }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

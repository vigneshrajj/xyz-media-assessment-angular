import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'login-modal',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() show = false;
  @Output() toggleModal = new EventEmitter();
  userForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  error: string | null = null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }

  toggle() {
    this.userForm.reset();
    this.error = null;
    this.toggleModal.emit();
  }

  login() {
    if (!this.userForm.valid) {
      this.error = this.userForm.errors?.['required'] ? 'Please fill out the form' : 'Username or password is incorrect';
    } else {
      this.error = null;
    }

    const { username, password } = this.userForm.value;
    
    try {
      this.error = null;
      this.authService.login(username, password);
      this.toggle();
    } catch (error: any) {
      this.error = error.message;
    }
  }

}

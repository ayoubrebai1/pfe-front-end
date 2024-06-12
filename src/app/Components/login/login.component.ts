import { AccountService } from './../../Services/account.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: Router,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$'
          ),
        ],
      ],
    });
  }

  onSubmit() {
    this.userService
      .login(this.loginForm.value['email'], this.loginForm.value['password'])
      .subscribe(
        (data) => {
          console.log('data', data);
          localStorage.setItem('token', data['token']);
          localStorage.setItem('id', data['id']);
          localStorage.setItem('email', this.loginForm.value['email']);
          this.userService.setRole(data['role']);
          if (data['id_centre']) {
            this.userService.setCentre(data['id_centre']);
          }
          this.toastr.success('Bienvenue');
          this.accountService.changeStus(true);
          this.route.navigate(['/Organigrame']);
          const d: string = JSON.stringify(data);
          console.log(
            'Token Date :',
            this.userService.getTokenExpirationDate(d)
          );
        },
        (error) => {
          this.toastr.error('Login ou password incorrect');
          console.log(error);
        }
      );
    console.log('form', this.loginForm.value);
  }
}

import { ProfileService } from 'src/app/Services/profile.service';
import { UserService } from 'src/app/Services/user.service';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { CentreResponsabiliteService } from 'src/app/Services/centre-responsabilite.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private centreResponsabiliteService: CentreResponsabiliteService,
    private toastr: ToastrService
  ) {}
  centres_responsabilite;
  roles;
  users;
  pass: boolean = false;

  bool: boolean = false;
  userForm = this.formBuilder.group({
    id_user: [''],
    firstName: [''],
    lastName: [''],
    email: ['', [Validators.email, Validators.required]],
    role: [''],
    status: [''],
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
    centre: [''],
  });
  ngOnInit(): void {
    this.profileService.getProfile().subscribe((result) => {
      this.roles = result;
      console.log(result);
    });
    console.log('oninit');
    this.getUsers();
    this.centreResponsabiliteService.getAll().subscribe((data) => {
      this.centres_responsabilite = data;
    });
  }

  getUsers() {
    this.userService.getAll().subscribe((data) => {
      this.users = data;
      console.log('data', data);
    });
  }
  changeStatus(user) {
    console.log('user', user);
    let obj = {
      id_user: user.id_user,
      password: user.password,
      status: user.status,
    };
    this.userService.changeStatus(obj).subscribe((data) => {
      console.log('status updated');
      this.getUsers();
      this.toastr.success('Status changé');
    });
  }
  removeUser(user) {
    console.log('user', user);
    let obj = {
      id_user: user.id_user,
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: obj,
    };
    console.log('user', user);
    this.userService.DeleteUser(options).subscribe(() => {
      this.users = this.users.filter((u) => u.id_user != user.id_user);
      console.log('user deleted');
      this.toastr.error('utilisateur supprimé');
    });
  }
  updateUser(user) {
    this.pass = false;
    console.log('user', user);
    this.userForm.setValue(user);
    console.log('user', this.userForm.value);
    this.bool = true;
  }
  resetPassword(user) {
    this.bool = false;
    console.log('user', user);

    this.userForm.setValue(user);
    this.pass = true;
  }
  onSubmit() {
    console.log('form', this.userForm.value, this.userForm.value['centre']);
    if (localStorage.getItem('id_centre')) {
      let newUser = {
        id_user: this.userForm.value['id_user'],
        firstName: this.userForm.value['firstName'],
        lastName: this.userForm.value['lastName'],
        email: this.userForm.value['email'],
        role: this.userForm.value['role'].libelle,
        password: this.userForm.value['password'],
        centre: {
          id_centre_responsabilite:
            this.userForm.value['centre'].id_centre_responsabilite,
        },
      };
      this.userService.updateUser(newUser).subscribe((data) => {
        console.log('update success', data);
        this.getUsers();
        this.bool = false;
      });
    } else {
      let newUser = {
        id_user: this.userForm.value['id_user'],
        firstName: this.userForm.value['firstName'],
        lastName: this.userForm.value['lastName'],
        email: this.userForm.value['email'],
        role: this.userForm.value['role'].libelle,
        password: this.userForm.value['password'],
      };
      this.userService.updateUser(newUser).subscribe((data) => {
        console.log('update success', data);
        this.getUsers();
        this.bool = false;
      });
    }
  }
  ResetPassword() {
    console.log('pass', this.userForm.value);
    let obj = {
      id_user: this.userForm.value.id_user,
      password: this.userForm.value.password,
    };
    console.log('passobj', obj);
    this.userService.changePassword(obj).subscribe((data) => {
      console.log('password changed', data);
      this.toastr.success('Password modifié');
      this.pass = false;
    });
  }
}

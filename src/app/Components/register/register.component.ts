import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CentreResponsabiliteService } from 'src/app/Services/centre-responsabilite.service';
import { ProfileService } from 'src/app/Services/profile.service';
import { UserService } from 'src/app/Services/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  roles;
  newUser;
  centres_responsabilite;
  userForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    email: ['', [Validators.email, Validators.required]],
    role: ['', [Validators.required, Validators.min(1)]],
    //status: [''],
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
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: Router,
    private profileService: ProfileService,
    private centreResponsabiliteService: CentreResponsabiliteService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((result) => {
      this.roles = result;
      console.log(result);
    });
    this.centreResponsabiliteService.getAll().subscribe((data) => {
      this.centres_responsabilite = data;

      this.centres_responsabilite = this.centres_responsabilite.filter(
        (c) => c.user == null
      );
      console.log('ceeee', this.centres_responsabilite);
    });
  }

  onSubmit() {
    if (this.userForm.value['centre'].id_centre_responsabilite == null) {
      this.newUser = {
        firstName: this.userForm.value['firstName'],
        lastName: this.userForm.value['lastName'],
        email: this.userForm.value['email'],
        role: this.userForm.value['role'].libelle,
        password: this.userForm.value['password'],
      };
    } else {
      this.newUser = {
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
    }
    console.log('form', this.userForm);
    this.userService.createUser(this.newUser).subscribe(
      (data) => {
        console.log(data);

        this.userForm.reset();
        this.route.navigate(['/users']);
        this.toastr.success('utilisateur ajouté avec succés');
      },
      (error) => console.log(error)
    );
    // console.log('object');
    // console.log('aloooooo', this.userForm.value['centre']);
  }
}

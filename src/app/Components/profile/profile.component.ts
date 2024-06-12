import { ProfileService } from 'src/app/Services/profile.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  profils;
  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      libelle: ['', [Validators.required]],
    });
    this.getProfil();
  }

  onSubmit() {
    this.profileService
      .CreateProfile(this.profileForm.value)
      .subscribe((data) => {
        console.log('profile', data);
        this.profileForm.reset();
        this.getProfil();
        this.toastr.success('Profile ajouté');
      });
  }
  getProfil() {
    this.profileService.getProfile().subscribe((data) => {
      this.profils = data;
    });
  }
  deleteProfil(profil) {
    let obj = {
      id_profile: profil.id_profile,
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: obj,
    };
    this.profileService.RemoveProfil(options).subscribe((data) => {
      this.profils = this.profils.filter(
        (p) => p.id_profile != profil.id_profile
      );
      this.toastr.error('Profile supprimé');
    });
  }
}

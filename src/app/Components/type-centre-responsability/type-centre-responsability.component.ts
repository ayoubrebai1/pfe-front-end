import { TypeCentreService } from './../../Services/type-centre.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-type-centre-responsability',
  templateUrl: './type-centre-responsability.component.html',
  styleUrls: ['./type-centre-responsability.component.css'],
})
export class TypeCentreResponsabilityComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private typeCentreService: TypeCentreService
  ) {}
  listTypeCentre;
  TypeCentreForm = this.formBuilder.group({
    libelle_type_centre_responsabilite: [''],
  });
  ngOnInit(): void {
    this.getTypeCentre();
  }

  onSubmit() {
    console.log('typeForm', this.TypeCentreForm.value);
    this.typeCentreService
      .createTypeCentreResponsability(this.TypeCentreForm.value)
      .subscribe((data) => {
        console.log('data', data);
        this.TypeCentreForm.reset();
        this.getTypeCentre();
      });
  }
  getTypeCentre() {
    this.typeCentreService.getAll().subscribe((data) => {
      this.listTypeCentre = data;
      console.log('typecentre', this.listTypeCentre);
    });
  }
  Delete(type) {
    let obj = {
      id_type_centre_responsabilite: type.id_type_centre_responsabilite,
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: obj,
    };
    this.typeCentreService
      .DeleteCentreResponsability(options)
      .subscribe((data) => {
        this.listTypeCentre = this.listTypeCentre.filter(
          (typeCentre) =>
            typeCentre.id_type_centre_responsabilite !=
            type.id_type_centre_responsabilite
        );
        console.log('delete success');
      });
  }
}

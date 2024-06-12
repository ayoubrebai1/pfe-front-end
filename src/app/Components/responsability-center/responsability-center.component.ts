import { TypeCentreService } from './../../Services/type-centre.service';
import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CentreResponsabiliteService } from 'src/app/Services/centre-responsabilite.service';

import { FormBuilder } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { OrganigrameService } from 'src/app/Services/organigrame.service';

@Component({
  selector: 'app-responsability-center',
  templateUrl: './responsability-center.component.html',
  styleUrls: ['./responsability-center.component.css'],
})
export class ResponsabilityCenterComponent implements OnInit {
  centreResponsabilites;
  typeCentres;
  organigrammes;
  role = localStorage.getItem('role');
  centerForm = this.formBuilder.group({
    libelle_centre_responsabilite: [''],
    typeCentre: [''],
    organigramme: [''],
   
  });

  constructor(
    private centreResposabiliteService: CentreResponsabiliteService,
    private router: Router,
    private formBuilder: FormBuilder,
    private typeCentreService: TypeCentreService,
    private toastr: ToastrService,
    private organigrammeService: OrganigrameService
  ) {}

  clicked: boolean = false;
  isValid: boolean = true;

  ngOnInit(): void {
    this.getAllCentre();
    this.getTypeCentre();
    this.getOrganigramme();
  }

  getAllCentre() {
    this.centreResposabiliteService.getAll().subscribe((data) => {
      this.centreResponsabilites = data;
      console.log('dataaa', this.centreResponsabilites);
    });
  }
  onSubmit() {
    console.log('form', this.centerForm.value);
    let obj = {
      libelle_centre_responsabilite:
        this.centerForm.value['libelle_centre_responsabilite'],
      type_centre_responsabilite: {
        id_type_centre_responsabilite:
          this.centerForm.value['typeCentre'].id_type_centre_responsabilite,
      },
      organigramme:{
        id_organigramme:this.centerForm.value['organigramme'].id_organigramme,
      }
    };
    console.log('obj', obj);
    this.centreResposabiliteService
      .createResponsabilityCenter(obj)
      .subscribe((data) => {
        console.log('centreRes', data);
        this.centerForm.reset();
        this.getAllCentre();
        this.toastr.success('centre de responsabilité ajouté ');
      });
  }
  deleteCR(cr) {
    let obj = {
      id_centre_responsabilite: cr.id_centre_responsabilite,
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: obj,
    };
    this.centreResposabiliteService.deleteCentre(options).subscribe(() => {
      this.centreResponsabilites = this.centreResponsabilites.filter(
        (b) => b.id_centre_responsabilite != cr.id_centre_responsabilite
      );
      console.log('centre deleted');
      this.toastr.error('centre de responsabilité supprimé');
    });
  }
  redirectedToBudgets(cr) {
    this.router.navigate(['/Budget', cr.id_centre_responsabilite]);
  }
  getTypeCentre() {
    this.typeCentreService.getAll().subscribe((data) => {
      this.typeCentres = data;
      console.log('typecentre', this.typeCentres);
    });
  }
  getOrganigramme(){
    this.organigrammeService.getAllOrgs().subscribe((data) => {
      this.organigrammes = data
      console.log("this.organigrammes",this.organigrammes);
    })
  }
}

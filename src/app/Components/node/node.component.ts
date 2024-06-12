import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Shape } from '@syncfusion/ej2-diagrams';
import { Node } from 'src/app/Models/node';
import { NodeService } from 'src/app/Services/node.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css'],
})
export class NodeComponent implements OnInit {
  nodeForm = this.formBuilder.group({
    Libelle: [''],
    Couleur: [''],
    Form: [''],
  });
  options: string[] = ['Rectangle', 'Triangle', 'Ellipse', 'Pentagon'];
  constructor(
    private formBuilder: FormBuilder,
    private nodeService: NodeService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log('Label :', this.nodeForm.value.Libelle);
    console.log('Color :', this.nodeForm.value.Couleur);
    console.log('Form :', this.nodeForm.value.Form);

    const newNode: Node = {
      width: 75,
      height: 75,
      shape: {
        type: 'Basic',
        shape: this.nodeForm.value['Form'],
      },
      style: {
        fill: this.nodeForm.value['Couleur'],
      },
    };
    this.nodeService.createNode(newNode).subscribe(
      (data) => {
        console.log(data);
        this.nodeForm.reset();
        // this.route.navigateByUrl('/Organigrame');
      },
      (error) => console.log(error)
    );
  }
}

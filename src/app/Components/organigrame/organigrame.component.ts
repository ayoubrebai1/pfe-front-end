import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ConnectorModel,
  IDropEventArgs,
  MarginModel,
  NodeConstraints,
  NodeModel,
  PaletteModel,
  randomId,
  SnapSettingsModel,
  SymbolInfo,
  Node,
  DiagramComponent,
  IExportOptions,
} from '@syncfusion/ej2-angular-diagrams';
import { NodeService } from 'src/app/Services/node.service';
import {cloneDeep} from 'lodash';
import { async, Observable } from 'rxjs';
import { OrganigrameService } from 'src/app/Services/organigrame.service';
import { error } from 'protractor';
import { organigrame } from 'src/app/Models/organigrame';
import { UploadFileServiceService } from 'src/app/Services/upload-file-service.service';

@Component({
  selector: 'app-organigrame',
  templateUrl: './organigrame.component.html',
  styleUrls: ['./organigrame.component.css'],
})
export class OrganigrameComponent {
  @ViewChild('diagram')
  //Diagram Properties
  public diagram: DiagramComponent;
  nodes = [];
  private flowshapes: NodeModel[];
  public palettes: PaletteModel[];
  public options: IExportOptions;
  fileInfos: Observable<any>;
  id;
  fileOrg;
  selected;
    constructor(private nodeService:NodeService, private organigrameService:OrganigrameService, private uploadService:UploadFileServiceService){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.nodeService.getAllNodes().subscribe((data)=>{
      this.nodes=data;
      console.log("hhhhhhhhhh",this.nodes)
      this.flowshapes=this.nodes;
        this.palettes = [
    {
      id: "flow",
      expanded: true,
      symbols: this.flowshapes,
      iconCss: "shapes",
      title: "Flow Shapes"
    }
  ];
    })
    console.log(this.nodes)
    //get all diagrams infos
    this.fileInfos = this.uploadService.getFiles();
  }
  selectOption(id: String) {
    //getted from event
    console.log("lhmaaaaazzz")
    console.log(id);
    //getted from binding
    console.log(this.selected)
     this.fileOrg = this.uploadService.getFile(this.selected).subscribe(data => {
      console.log(data)
      this.diagram.loadDiagram(data);

    },error => console.log(error)
    )
  }

  Export() {
    console.log('Hello');
    this.options = {};
    //this.options.mode = 'Data';
    this.options.format = 'JPG';
    console.log('options :', this.options);
    this.diagram.exportDiagram(this.options);
  }
  public created(event): void {
    let node: NodeModel = {
      // Position of the node
      id: 'racine',
      // addInfo:{identifier:Math.floor(Math.random()*100+1)},
      offsetX: 100,
      offsetY: 100,
      // Size of the node
      width: 100,
      height: 100,
      style: {
        fill: '#6BA5D7',
        strokeColor: 'white',
      },
      annotations: [
        {
          content: 'Project Name',
        },
      ],
    };
    this.diagram.add(node);
  }
  public interval: number[] = [
    1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25,
    9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75,
  ];

  public snapSettings: SnapSettingsModel = {
    horizontalGridlines: { lineColor: '#e0e0e0', lineIntervals: this.interval },
    verticalGridlines: { lineColor: '#e0e0e0', lineIntervals: this.interval },
  };

  public diagramCreate() {}

  //SymbolPalette Properties
  public symbolMargin: MarginModel = {
    left: 15,
    right: 15,
    top: 15,
    bottom: 15,
  };

  public drop(args: IDropEventArgs) {
    if (args.element instanceof Node && this.diagram.nodes.length > 0) {
      if (args.element.id !== (args.target as NodeModel).id) {
        args.cancel = true;
        //Argument element is used to get the dropped node.
        let node: NodeModel = args.element;
        //console.log("element:",args.element)
        //console.log(node)
        let newNode: NodeModel = {
          id: 'node' + randomId(),
          //addInfo:{identifier:Math.floor(Math.random()*100+1)},
          offsetX: args.element.offsetX,
          offsetY: args.element.offsetY + 100,
          shape: args.element.shape,
          height: 75,
          width: 75,
          style: {
            fill: args.element.style.fill,
          },
          constraints: NodeConstraints.Default | NodeConstraints.AllowDrop,
        };
        this.diagram.add(newNode);

        let connector: ConnectorModel = {
          id: 'connector' + randomId(),
          sourceID: (args.target as NodeModel).id,
          targetID: newNode.id,
        };
        this.diagram.add(connector);
      } else {
        alert('Node does not dropped on other node!!!!');
      }
    }
  }

  public getSymbolInfo(symbol: NodeModel): SymbolInfo {
    return { fit: true };
  }

  public getSymbolDefaults(symbol: NodeModel): void {
    symbol.constraints = NodeConstraints.Default | NodeConstraints.AllowDrop;
  }
  // public Save (E){
  //   let save: string = this.diagram.saveDiagram();
  //   let data = JSON.parse(save);
  //   let nodes = data["nodes"];
  //   console.log("Nodes : ", this.nodes);
  // }
  public Save(E) {
    let save: string = this.diagram.saveDiagram();
    let data = JSON.parse(save);
    let nodes = data['nodes'];
    let json = [];
    let datas;
    let goal_nodes;
    console.log("saving:",nodes);
    for (let i = 0; i< nodes.length; i++) {
          if (nodes[i].inEdges.length>0) {
            let parentId: string = nodes[i].inEdges;
            let connector: ConnectorModel = this.diagram.getObject(parentId);
            console.log("parentid:",parentId);
            console.log("sourceID:",connector.sourceID);
            datas={
              id_organigramme:nodes[i].id,
              libelle:nodes[i].annotations[0].content,
              organigramme:datas={
                id_organigramme:connector.sourceID
              },
              
            };
          }
          else{
            datas={
              id_organigramme:nodes[i].id,
              libelle:nodes[i].annotations[0].content,
              organigramme:datas={
                id_organigramme:null},
            };        
          }
          console.log("datas: ",datas);
          json.push(datas);
        }
        console.log("JSON:",json);
        //const all_nodes = JSON.parse(json); 
        // insert top level
        goal_nodes = json.filter((x) => x.organigramme.id_organigramme === null);
        console.log("test : ",goal_nodes)
        //console.log("tab! :",json)
        do {
          json.forEach((element) => {
            console.log("bouh:",element);
            const isParentThere =
              goal_nodes.filter((x) => x.id_organigramme === element['organigramme'].id_organigramme).length > 0;
            const alreadyThere =
              goal_nodes.filter((x) => x.id_organigramme === element.id_organigramme).length > 0;
            console.log(isParentThere);
            if (isParentThere && !alreadyThere) {
              goal_nodes.push(element);
            }
          });
        } while (goal_nodes.length < json.length);
        console.log(goal_nodes);
        // goal_nodes.forEach((element) => {
        //   //api(element)
        //   console.log("element :",element)
        //   this.organigrameService.createOrganigrame(element).subscribe(data => {
        //     console.log(data)
            
        //   }, error=>console.log(error));
        // });
        console.log("gagaga",JSON.stringify(goal_nodes))
        goal_nodes.forEach(element => {
          if((element['organigramme'].id_organigramme) == null){
            element.organigramme = null;
          }
        });
        console.log("nadhef :",JSON.stringify(goal_nodes));
        this.organigrameService.createOrganigrame(goal_nodes).subscribe(data => {
          console.log(data)
          
        },error => console.log(error)
        )

        //saving latest org json to localstorage
    let saveData = this.diagram.saveDiagram();
    localStorage.setItem('organigrame', saveData);
    saveData = localStorage.getItem('organigrame');
    console.log("saved");
    //saving organigramme data in json fi    // var fakeLink  = document.createElement('a');
    // var blob = new Blob([JSON.stringify(saveData, null , 2)], {type: 'application/json'});
    // var file = new File([blob], 'test.json', {type: 'application/json', lastModified: Date.now()});
    // // sending file to db
    // this.uploadService.upload(file).subscribe(data => {
    //       console.log(data)
          
    //     }, error=>console.log(error));le
    // var fakeLink  = document.createElement('a');
    let d = new Date();
    let da = d.toDateString();
    console.log("el date :::::",da);
    var blob = new Blob([JSON.stringify(saveData, null , 2)], {type: 'application/json'});
    var file = new File([blob], da, {type: 'application/json', lastModified: Date.now()});
    // sending file to db
    this.uploadService.upload(file).subscribe(data => {
          console.log(data)
          
        }, error=>console.log(error));

  } 
  load(E){
    let saveData = localStorage.getItem('organigrame');
    this.diagram.loadDiagram(saveData);
    console.log(saveData)
  }
}

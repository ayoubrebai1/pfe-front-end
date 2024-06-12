import { Component, OnInit } from '@angular/core';
import { HistoriqueService } from 'src/app/Services/historique.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
HistoriqueList=[];
searchText;
p: number = 1;
  constructor(private historiqueService : HistoriqueService) { }

  ngOnInit(): void {
    this.getAllHisto();
  }

  getAllHisto(){
    this.historiqueService.getAllHistoriques().subscribe((data)=>{
      this.HistoriqueList=data;
      console.log(this.HistoriqueList)
    })
    console.log(this.HistoriqueList)
  }

}

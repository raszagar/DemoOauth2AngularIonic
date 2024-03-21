import { Component, OnInit } from '@angular/core';
import { GraphService } from '../services/graph.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent  implements OnInit {
  perfil!: ProfileType;
  errorPerfil: string = "";

  constructor(private graphService: GraphService) { }

  ngOnInit() {}

  getProfile() {
    this.graphService.getProfile().subscribe({
      next: (p) => {
        console.log('getProfile');
        console.log(p)
        this.perfil = p;
      },
      error: (e) => {
        console.error(e)
        this.errorPerfil = e.message;
      },
      complete: () => console.info('complete') 
    });
  }

  clear() {
    this.perfil = null;
    this.errorPerfil = "";
  }

}

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};

import { Component, OnInit } from '@angular/core';
import { SaludoService } from '../services/saludo.service';

@Component({
  selector: 'app-saludo',
  templateUrl: './saludo.component.html',
  styleUrls: ['./saludo.component.scss'],
})
export class SaludoComponent  implements OnInit {

  textoTest: string = "";
  errorTest: string = "";
  textoSaludo: string = "";
  errorSaludo: string = "";

  constructor(
    private saludoService: SaludoService
  ) { }

  ngOnInit() {}

  getTest() {
    this.saludoService.getTest().subscribe({
      next: (response) => {
        console.log('getTest');
        console.log(response)
        this.textoTest = response;
      },
      error: (e) => {
        console.error(e)
        this.errorTest = e.message;
      },
      complete: () => console.info('complete')
    })

  }

  getSaludo() {
    this.saludoService.getSaludo().subscribe({
      next: (response) => {
        console.log('getTest');
        console.log(response)
        this.textoSaludo = response;
      },
      error: (e) => {
        console.error(e)
        this.errorSaludo = e.message;
      },
      complete: () => console.info('complete')
    })

  }

  clear() {
    this.textoTest = "";
    this.errorTest = "";
    this.textoSaludo = "";
    this.errorSaludo = "";
  }

}

import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, NgModule, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AtenService } from '../../services/aten.service';
import { Atencion } from '../../models/atencion.model';
/**
 * Componente del panel de control.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule,NgClass, NgFor, ReactiveFormsModule,NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  registerform!: FormGroup;

  constructor(private atenService: AtenService, private router: Router) { }

  

  @ViewChild('myModal') model: ElementRef | undefined;

  atenObj: Atencion | undefined;

  atenList: Atencion[] = [];

  editingAtencionId: string = '';



  ngOnInit(): void {
    
    this.registerform = new FormGroup({ 
      nombre: new FormControl('', [Validators.required, Validators.maxLength(32), Validators.minLength(3)]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]),
      edad: new FormControl('', [Validators.required, Validators.pattern('[0-9]*' ), Validators.min(0), Validators.max(120)]),
      diagnostico: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]),

    });
    

    this.loadAten();

    //const localData = localStorage.getItem("atencion");
    //if(localData != null) {
    //  this.atenList = JSON.parse(localData)
    //}
  }

  loadAten() {
    this.atenService.listAten().subscribe(response => {
      this.atenList = response
   });
  }

  openModel() {
    
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block'
    }
  }

  
  closeModel() {
    this.atenObj = undefined;
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }


  onDelete(item: Atencion) {
    const isDelet = confirm("Seguro de eliminar la Atención");
    if(isDelet) {
      //debugger;
      this.atenService.deleteAten(item.id.toString()).subscribe(response => {
        alert("Eliminado Correctamente");
        this.loadAten();
    });
      this.closeModel();
    }
  }


  onEdit(item : Atencion): void {
    //console.log(id);
   this.editingAtencionId = item.id.toString();
   this.registerform.setValue({
    nombre: item.nombre,
    apellido: item.apellido,
    edad: item.edad,
    diagnostico: item.diagnostico
  });
    this.openModel();
  }

 
  updateAten() {
    this.atenService.updateAten(this.registerform.value, this.editingAtencionId).subscribe(response => {
      alert("Actualizado Correctamente");
      this.loadAten();  
    });
    this.editingAtencionId = '';
    //this.editingAtencionId = undefined;
    this.closeModel()
  }


  saveAten() {
    //debugger;
    this.atenService.saveAten(this.registerform.value).subscribe(response => {
      alert("Registrado Correctamente");
      this.registerform.reset();
      this.loadAten();
    });
    this.closeModel();
  }



}



import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

/**
 * Componente del panel de control.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  /**
   * Referencia al elemento modal en la plantilla.
   * @type {ElementRef | undefined}
   */
  @ViewChild('myModal') model: ElementRef | undefined;

  /**
   * Objeto de atención actual.
   * @type {Atencion}
   */
  atenObj: Atencion = new Atencion();
  
  /**
   * Lista de atenciones.
   * @type {Atencion[]}
   */
  atenList: Atencion[] = [];


  /**
   * Método de ciclo de vida que se ejecuta al inicializar el componente.
   * Carga la lista de atenciones desde el almacenamiento local.
   * @returns {void}
   */
  ngOnInit(): void {
    const localData = localStorage.getItem("atencion");
    if(localData != null) {
      this.atenList = JSON.parse(localData)
    }
  }

  /**
   * Abre el modal estableciendo su estilo de display a 'block'.
   * @returns {void}
   */
  openModel() {
    
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block'
    }
  }

  /**
   * Cierra el modal y resetea el objeto de atención.
   * @returns {void}
   */
  closeModel() {
    this.atenObj = new Atencion();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  /**
   * Elimina una atención después de la confirmación del usuario.
   * @param {Atencion} item - La atención a eliminar.
   * @returns {void}
   */
  onDelete(item: Atencion) {
    const isDelet = confirm("Seguro de eliminar la Atención");
    if(isDelet) {
      const currentRecord =  this.atenList.findIndex(m=> m.id === this.atenObj.id);
      this.atenList.splice(currentRecord,1);
      localStorage.setItem('atencion', JSON.stringify(this.atenList));
    }
  }

  /**
   * Edita una atención, abriendo el modal y cargando la atención seleccionada.
   * @param {Atencion} item - La atención a editar.
   * @returns {void}
   */
  onEdit(item: Atencion) {
    this.atenObj =  item;
    this.openModel();
  }

  /**
   * Actualiza la atención actual en la lista y en el almacenamiento local.
   * @returns {void}
   */
  updateAten() {
    const currentRecord =  this.atenList.find(m=> m.id === this.atenObj.id);
    if(currentRecord != undefined) {
      currentRecord.nombre = this.atenObj.nombre;
      currentRecord.apellido =  this.atenObj.apellido;
      currentRecord.edad =  this.atenObj.edad;
      currentRecord.diagnostico =  this.atenObj.diagnostico;
    };
    localStorage.setItem('atencion', JSON.stringify(this.atenList));
    this.closeModel()
  }

  /**
   * Guarda una nueva atención en la lista y en el almacenamiento local.
   * @returns {void}
   */
  saveAten() {
    //debugger;
    const isLocalPresent = localStorage.getItem("atencion");
    if (isLocalPresent != null) {
      
      const oldArray = JSON.parse(isLocalPresent);
      this.atenObj.id = oldArray.length + 1;
      oldArray.push(this.atenObj);
      this.atenList = oldArray;
      localStorage.setItem('atencion', JSON.stringify(oldArray));
    } else {
      const newArr = [];
      newArr.push(this.atenObj);
      this.atenObj.id = 1;
      this.atenList = newArr;
      localStorage.setItem('atencion', JSON.stringify(newArr));
    }
    this.closeModel()
  }



}

/**
 * Clase que representa una atención.
 */
export class Atencion {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  diagnostico: string;


  constructor() {
    this.id = 0;
    this.nombre = '';
    this.apellido = '';
    this.edad = 0;
    this.diagnostico = '';

  }
}
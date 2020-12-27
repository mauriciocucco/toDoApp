import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DeseosService } from "../../services/deseos.service";
import { Lista } from "../../models/lista.model";
import { ListaItem } from "src/app/models/lista-item.model";

@Component({
  selector: "app-agregar",
  templateUrl: "./agregar.page.html",
  styleUrls: ["./agregar.page.scss"],
})
export class AgregarPage implements OnInit {
  lista: Lista;
  nombreItem: string = "";

  constructor(
    private deseosService: DeseosService,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.params.listaId;

    this.lista = this.deseosService.obtenerLista(id);
  }

  ngOnInit() {}

  agregarItem() {
    if (this.nombreItem.length === 0) {
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);

    this.nombreItem = "";
    this.deseosService.guardarStorage();
  }

  cambioCheck(item: ListaItem) {
    const pendientes = this.lista.items.filter((item) => !item.completado)
      .length;

    if (pendientes === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.completada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.completada = false;
    }

    this.deseosService.guardarStorage();
  }

  borrar(index: number) {
    this.lista.items.splice(index, 1);
    this.deseosService.guardarStorage();
  }
}

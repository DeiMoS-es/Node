import { Component, OnInit } from '@angular/core';
import { PreciosService } from 'src/app/services/precios.service';
import * as d3 from 'd3';
import { Data } from 'src/app/interfaces/data';



@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css'],
})
export class PreciosComponent implements OnInit {
  // Variables
  precioZona: any; // TIpo any de momento
  constructor(private preciosService: PreciosService) {}

  ngOnInit() {
    this.preciosService.getPrecios().subscribe({
      next: (precio) => {
        this.precioZona = precio;
        console.log(this.precioZona);
        this.crearGrafico();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private crearGrafico(){
    // Configuración del gráfico
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    // Primero, calcula los precios mínimo, medio y máximo
    let precios = this.precioZona.preciosHoras.map((d: Data) => d.precio);
    let minPrecio = d3.min(precios);
    let maxPrecio = d3.max(precios);
    let color: d3.ScaleLinear<string, string>;
    if (typeof minPrecio === 'number' && typeof maxPrecio === 'number') {
      let avgPrecio = (minPrecio + maxPrecio) / 2;
      color = d3.scaleLinear<string>()
        .domain([minPrecio, avgPrecio, maxPrecio])
        .range(['green', 'yellow', 'red']);
    }

// Luego, crea la escala de color



    // Crear el SVG
    const svg = d3.select('body').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Escalas
    let horas = this.precioZona.preciosHoras.map((d: Data, i: number) => i.toString()); // uso el indice de cada dato como el valor de X, ya que si uso la hora, lo toma como un único dato
    const x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);
    const y = d3.scaleLinear()
      .range([height, 0]);

    // Dominios
    x.domain(horas);
    let preciosHorasConPrecio: number[] = this.precioZona.preciosHoras.map((d: Data) => d.precio);
    y.domain([0, d3.max(preciosHorasConPrecio) || 0]);  

    // Añadir las barras
    svg.selectAll('.bar')
      .data<Data>(this.precioZona.preciosHoras)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d: Data) => x(new Date(d.datetime).getHours().toString()) || 0)
      .attr('width', x.bandwidth())
      .attr('y', (d: Data) => y(d.precio))
      .attr('height', (d: Data) => height - y(d.precio))
      .attr('fill', (d: Data) => color(d.precio)); 
      
    // Añadir el eje X
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    // Añadir el eje Y
    svg.append('g')
      .call(d3.axisLeft(y));
  }
    
}

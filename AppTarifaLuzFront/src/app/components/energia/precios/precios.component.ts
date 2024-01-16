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

  private crearGrafico() {
    // Configuración del gráfico
     const margin = { top: 20, right: 20, bottom: 30, left: 60 }; // aumenta el margen izquierdo
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    // Primero, calcula los precios mínimo, medio y máximo
    let precios = this.precioZona.preciosHoras.map((d: Data) => d.precio);
    let minPrecio = d3.min(precios);
    let maxPrecio = d3.max(precios);
    let color: d3.ScaleLinear<string, string>;
    if (typeof minPrecio === 'number' && typeof maxPrecio === 'number') {
      let avgPrecio = (minPrecio + maxPrecio) / 2;
      // Luego, crea la escala de color
      color = d3
        .scaleLinear<string>()
        .domain([minPrecio, avgPrecio, maxPrecio])
        .range(['green', 'yellow', 'red']);
    }

    // Crear el SVG
    const svg = d3
      .select('#chart')
      .append('svg')
      .attr('width', '50%') // ajusta esto para cambiar el tamaño del SVG
      .attr('height', '50%') // ajusta esto para cambiar el tamaño del SVG
      .attr('viewBox', '0 0 960 500') // mantiene la relación de aspecto
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Escalas
    let horas = this.precioZona.preciosHoras.map((d: Data, i: number) => i.toString()); // uso el indice de cada dato como el valor de X, ya que si uso la hora, lo toma como un único dato
    const x = d3.scaleBand().range([0, width]).padding(0.3);
    const y = d3.scaleLinear().range([height, 0]);

    // Dominios
    x.domain(horas);
    let preciosHorasConPrecio: number[] = this.precioZona.preciosHoras.map((d: Data) => d.precio);
    console.log(preciosHorasConPrecio);
    y.domain([0, d3.max(preciosHorasConPrecio) || 0]);
    
    // Añadir etiqueta al eje X
    svg
      .append('text')
      .attr(
        'transform',
        'translate(' + (width / 2) + ' ,' + (height + margin.bottom) + ')'
      )
      .style('text-anchor', 'middle')
      .text('Horas');

    // Añadir etiqueta al eje Y
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left + 9)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('€/MWh');

    // Añadir los puntos
    svg.selectAll('.dot')
      .data<Data>(this.precioZona.preciosHoras)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', (d: Data) => (x(new Date(d.datetime).getHours().toString()) || 0) + x.bandwidth() / 2)
      .attr('cy', (d: Data) => y(d.precio))
      .attr('r', 5)
      .attr('fill', 'black');

    // Añadir el texto
    svg.selectAll('.text')
      .data<Data>(this.precioZona.preciosHoras)
      .enter().append('text')
      .attr('class', 'label')
      .attr('x', (d: Data) => (x(new Date(d.datetime).getHours().toString()) || 0) + x.bandwidth() / 2)
      .attr('y', (d: Data) => y(d.precio) - 10) 
      .text((d: Data) => d.precio.toFixed(1))
      .attr('font-size', '10px');

    // Añadir las barras
    svg
      .selectAll('.bar')
      .data<Data>(this.precioZona.preciosHoras)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x',(d: Data) => x(new Date(d.datetime).getHours().toString()) || 0 )
      .attr('width', x.bandwidth())
      .attr('y', (d: Data) => y(d.precio))
      .attr('height', (d: Data) => height - y(d.precio))
      .attr('fill', (d: Data) => color(d.precio))
      .attr('rx', 20);

    // Añadir el eje X
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    // Añadir el eje Y
    svg.append('g').call(d3.axisLeft(y));
  }
}

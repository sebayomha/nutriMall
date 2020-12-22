import { Component, OnInit, ViewChild } from '@angular/core';
import { SaleInterface, Sale } from '../../../models/sale';
import { MatTable } from '@angular/material/table';
import { Product } from '../../../models/product';
import { SalesService } from '../../../services/sales/sales.service';
declare var google: any;

@Component({
  selector: 'app-today-sales',
  templateUrl: './today-sales.component.html',
  styleUrls: ['./today-sales.component.css']
})
export class TodaySalesComponent implements OnInit {

  ventasDelDia: Array<SaleInterface> = new Array(); /* todas las ventas del día */

  /* Variables de la tabla */
  displayedColumns;
  @ViewChild(MatTable) table: MatTable<any>;


  constructor(private salesService: SalesService) { }

  ngOnInit() {

    /* obtengo todas las ventas del dia */
    this.salesService.getTodaySales().subscribe( (response) => {
      console.log('response', response);
    });

    // tslint:disable-next-line:max-line-length
    this.displayedColumns = ['Idventa', 'PrecioTotal', 'CantProds', 'Date', 'Accion'];

    /*Productos hardcodeados*/
    const categoria1 = {'nombre': 'Fruta'};
    //const producto1 = new Product('Banana', 40, categoria1, 1);

    const categoria2 = {'nombre': 'Empanadas'};
    //const producto2 = new Product('Empanada de carne', 140, categoria2, 2);

    /* ventas hardcodeadas */
    //const productoAgregado1 = new ProductoAgregado(producto1, 20, 150);
    //const productoAgregado2 = new ProductoAgregado(producto2, 10, 200);

    //const productosVenta = new Array(productoAgregado1, productoAgregado2);
    //const productosVenta2 = new Array(productoAgregado1);

    //const venta1 = new Sale(productosVenta, 'Masculino', new Date(), 3, 'Mi primer venta', '4', 1350, 1);
    //const venta2 = new Sale(productosVenta2, 'Grupo', new Date(), 6, 'Mi segunda venta', '1', 200, 2);

    //this.ventasDelDia.push(venta1, venta2, venta1, venta2, venta1, venta2, venta2, venta1, venta2, venta2, venta1, venta2);

    /* Generación de graficos */
    this.drawChart();
    this.drawLineChart();
    this.drawBarChart();
    this.donutChartFacturacionNeta();
    this.columnChartProductosMenosVendidos();
  }

  /* Hay que ver que informacion se puede mostrar aca, una idea es mostrar de las 3 categorias cuales son las que mas se vendieron */
  private drawChart() {
      google.charts.load('current', {packages: ['corechart']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        const data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]);

        const options = {
          title: 'My Daily Activities',
          is3D: true,
          legend: {position: 'bottom'},
          width: '100%',
          height: '100%'
        };

        const chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
      }
  }

  /* Funcion que se ejecuta al darle click a una row de la tabla de ventas, muestra el detalle de la venta */
  showDetailedSale(sale: SaleInterface) {

  }

  /* Line chart se va a utilizar para mostrar como fueron las ventas en el dia segun los horarios */
  drawLineChart() {
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      const data = google.visualization.arrayToDataTable([
        ['Year', 'Sales', 'Expenses'],
        ['2004',  1000,      400],
        ['2005',  1170,      460],
        ['2006',  660,       1120],
        ['2007',  1030,      540]
      ]);

      const options = {
        title: 'Company Performance',
        legend: { position: 'bottom' }
      };

      const chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

      chart.draw(data, options);
      }
    }

    /* Grafico de barras para mostrar cuales fueron los 5 productos mas vendidos del dia */
    drawBarChart() {
      google.charts.load('current', {packages: ['corechart', 'bar']});
      google.charts.setOnLoadCallback(draw);
      function draw() {
        const data = google.visualization.arrayToDataTable([
          ['City', '2010 Population', { role: 'style' }],
          ['New York City, NY', 8175000, '#b87333'],
          ['Los Angeles, CA', 3792000, 'silver'],
          ['Chicago, IL', 2695000, 'color: red'],
          ['Houston, TX', 2099000, 'color: #e5e567'],
          ['Philadelphia, PA', 1526000, 'color: #e5e4e2']
        ]);

        const options = {
          title: 'Population of Largest U.S. Cities',
          chartArea: {width: '100%'},
          hAxis: {
            title: 'Total Population',
            minValue: 0
          },
          vAxis: {
            title: 'City'
          },
          bar: { groupWidth: '20%' },
        };
        const chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
    }

    donutChartFacturacionNeta() {
      google.charts.load('current', {packages: ['corechart']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        const data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Hombres',     11],
          ['Mujeres',     4]
        ]);

        const options = {
          pieHole: 0.4,
          colors: ['red', '#004411']
        };

        const chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        const chart2 = new google.visualization.PieChart(document.getElementById('donutchart2'));
        chart.draw(data, options);
        chart2.draw(data, options);
      }
  }

  columnChartProductosMenosVendidos() {
    google.charts.load('current', {packages:['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      const data = google.visualization.arrayToDataTable([
        ['Element', 'Density', { role: 'style' } ],
        ['Copper', 8.94, '#b87333'],
        ['Silver', 10.49, 'silver'],
        ['Platinum', 21.45, 'color: #e5e4e2']
      ]);

      const view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: 'stringify',
                         sourceColumn: 1,
                         type: 'string',
                         role: 'annotation' },
                       2]);

      const options = {
        title: 'Productos menos vendidos',
        bar: {groupWidth: '95%'},
        legend: { position: 'none' },
      };
      const chart = new google.visualization.ColumnChart(document.getElementById('columnchart_values'));
      chart.draw(view, options);
    }
  }
}

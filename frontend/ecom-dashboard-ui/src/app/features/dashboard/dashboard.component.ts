import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Order } from '../../shared/models/order.models';
import { DashboardStatsDto, OrderSummaryDto, SalesTrendDto } from '../../shared/models/dashboard.models';
import { DashboardService } from './dashboard.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [CommonModule,BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  stats!: DashboardStatsDto;
  ordersSummary: OrderSummaryDto[] = [];
  salesTrend: SalesTrendDto[] = [];
  recentOrders: Order[] = [];

  // ordersChartData: any;
  // salesChartData: any;
  salesChartOptions: any;
  salesChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [] }]
  };
  salesChartType:ChartType = 'line';
  ordersChartLabels: string[] = [];
  salesChartLabels: string[] = [];
    ordersChartType: ChartType = 'doughnut';

  // 📊 Chart data
  ordersChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{ data: [] }]
  };

  // ⚙️ Chart options
  ordersChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      }
    }
  };

  //   salesChartOptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'bottom' as const,
  //     }
  //   }
  // };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.setChartOptions(document.documentElement.classList.contains('dark'));
    //  Listen for theme changes if you toggle dark/light dynamically
  const observer = new MutationObserver(() => {
    const isDark = document.documentElement.classList.contains('dark');
    this.setChartOptions(isDark);
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    this.loadStats();
    this.loadOrdersSummary();
    this.loadSalesTrend();
    this.loadRecentOrders();
  }
setChartOptions(isDark: boolean){
  this.salesChartOptions  = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        color: isDark ? '#e5e7eb' : '#374151',  
        autoSkip: false,   // don't skip months
        maxRotation: 45,   // tilt labels if needed
        minRotation: 45
      },
        grid: {
          color: isDark ? '#374151' : '#d1d5db' // gray-700 for dark, gray-300 for light
        }
    },
      y: {
        beginAtZero: true,
        ticks: {
          color: isDark ? '#e5e7eb' : '#374151'
        },
        grid: {
          color: isDark ? '#374151' : '#d1d5db'
        }
      }
  },
  plugins: {
    legend: {
      display: false
    },
    labels: {
      color: isDark ? '#e5e7eb' : '#374151'
    }
  }
};
}

  loadStats() {
    this.dashboardService.getStats().subscribe(res => this.stats = res);
  }

  loadOrdersSummary() {
    this.dashboardService.getOrdersSummary().subscribe(res => {
      // this.ordersSummary = res;
      // this.ordersChartLabels = res.map(r => r.status);
      // this.ordersChartData = [{ data: res.map(r => r.count), label: 'Orders' }];
      // console.log(this.ordersChartLabels, this.ordersChartData);

      const labels = res.map(r => r.status);
      const values = res.map(r => r.count);

      this.ordersChartData = {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: ['#f87171', '#60a5fa', '#34d399', '#fbbf24'], // 🔹 colors for slices
            hoverOffset: 8
          }
        ]
      };

      console.log('Orders summary:', this.ordersChartData);
    });
  }

  loadSalesTrend() {
    this.dashboardService.getSalesTrend().subscribe(res => {
      // this.salesTrend = res;
      // this.salesChartLabels = res.map(r => r.month);
      // this.salesChartData = [{ data: res.map(r => r.revenue), label: 'Revenue' }];
      const labels=res?.map(r=>r.month);
      const values=res?.map(r=>r.revenue);
     const colors = [
      '#f87171', // red-400
      '#fb923c', // orange-400
      '#fbbf24', // yellow-400
      '#a3e635', // lime-400
      '#34d399', // green-400
      '#2dd4bf', // teal-400
      '#38bdf8', // sky-400
      '#60a5fa', // blue-400
      '#818cf8', // indigo-400
      '#a78bfa', // violet-400
      '#c084fc', // purple-400
      '#f472b6'  // pink-400
    ];
      this.salesChartData={
        labels,
        datasets:[
          {
            data:values,
            backgroundColor: '#60a5fa', // 🔹 colors for slices
          barThickness: 30,   
          maxBarThickness: 40 
          }
        ]
      }
    });
  }

  loadRecentOrders() {
    this.dashboardService.getRecentOrders().subscribe(res => {
      this.recentOrders = res;
    });
  }
}

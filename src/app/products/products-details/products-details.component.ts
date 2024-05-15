import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutcsServices } from '../services/products.services';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [SpinnerComponent, CommonModule],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css'
})
export class ProductsDetailsComponent implements OnInit  {
id:any;
data:any = {}
loading:boolean = false;

  // قمنا بحقن السيرفيس الاولى  مشان نقرأ معلومات من الراوت لانو بدنا نقرأ رقم المنتج مشان نجيب تفاصيلو
  constructor(private route:ActivatedRoute,
              private produtcsServices:ProdutcsServices)
  {
   this.id = this.route.snapshot.paramMap.get('id'); // قراءة الاي دي من الراوت
   console.log(this.id)
  }
  ngOnInit(): void {
    this.getProdcutById()
  }


getProdcutById()
{
    this.loading = true;
    this.produtcsServices.getProductById(this.id).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.data = res;
      },
      error: (err) => {
        this.loading = false;
        alert(err);
      }}

    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ProdutcsServices } from '../services/products.services';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { NgIf } from '@angular/common';
import { SelectComponent } from '../../shared/select/select.component';
import { ProductComponent } from '../../shared/product/product.component';
import { RouterModule } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [SpinnerComponent, NgIf, SelectComponent, ProductComponent, RouterModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent implements OnInit {
  products: Product[] = [];
  Categories: string[] = [];  // التصنيفات هي فقط مصفوفة من السترينغ 
  loading: boolean = false;
  cartProducts: any[] = []; //cartProducts صار يعطي خطا لانو ال Product هون لما حطينا النوع
                            // quantity مافيها حقل اسمو  Productوال  quantity فيها

  constructor(private productService: ProdutcsServices) {}

  ngOnInit(): void {
    this.getAllCategoriesWithAllProducts();

  
  }


  // الدالة التالية تم كتابتها فقط من اجل ان يتم اعادة جلب المنتجات بعد اختيار خيار
  // كل التصنيفات من قائمة التصنيفات التي في الفيو
  getAllProducts() {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        alert(err);
      }});
  }


  // الدالة التالية تستدعي الدالة التي تدمج ركويست جلب المنتجات مع ركويست جلب التصنيفات
  getAllCategoriesWithAllProducts() {
    this.loading = true;
    this.productService.getAllCategoriesWithAllProducts().subscribe({
      next: (res: any[]) => {
        this.products = res[0];
        this.Categories = res[1];
        this.loading = false;
        console.log(res);
      },
      error: (err) => {
        this.loading = false;
        alert(err);
      }});

  }


  //  الدالة التالية  لفلترة المنتجات على حسب التصنيف الذي تم اختياره في القائمةالتي في الفيو
  filterCatogery(event: any)
  {
    let value = event.target.value;

     (value == 'all') ? this.getAllProducts() : this.getProductsByCatogery(value);

  }


  // الدالة التالية تستدعي الدالة التي تُفلتر المنتجات بحسب التصنيف
  // وكود الدالة التالية بالتأكيد يمكن وضعه في الدالة السابقة حيث نلاحظ اننا استدعينا
  // هذه الدالة فيها ولكن هكذا الوضع احسن للتنظيم
  getProductsByCatogery(keyword: string)
  {
    this.loading = true;
    this.productService.getProductsByCatogery(keyword).subscribe({
      next: (res: any[]) => {
        this.products = res;
        this.loading = false;
        console.log(res);
      },
      error: (err) => {
        this.loading = false;
        alert(err);
      }});
  }

  // الدالة التالية تضيف المنتج للسلة حيث البارامتر الممرر فيها تأتي قيمته من الفيو
  addToCart(event: any)
  {
    // التأكد ان العنصر كارت موجود في اللوكال ستوريج حيث نحنا بالاصل اللي منضيفو
    if('cart' in localStorage)
    {
      // جلب الكارت من اللوكال ستوريج في حال كان موجود وتخزينه في متغير عرفناه سابقا
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!)
      // السطر التالي للتأكد اذا كان المنتج الذي نضيفه حاليا موجود حاليا في السلة
      // حيث لايتم اضافته مرة أخرى بل يتم زيادة كميته
      let exist = this.cartProducts.find(item => item.item.id == event.item.id)
      if(exist) { // هذا في حال كان المنتج موجود سابقا
        alert('المنتج موجود مسبقا في السلة');
      }
      else { 
        this.cartProducts.push(event) // الاضافة للسلة
        localStorage.setItem('cart', JSON.stringify(this.cartProducts)) // هنا طلبنا أن يتم تخزين الداتا في
      }                                                                 // اللوكال ستوريج على أنها جيسون
    }else {
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts)) 
    }

  }
}

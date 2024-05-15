import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartsServices } from './services/Carts.services';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  total: any = 0; 
  cartProducts: any = [];
  success: boolean = false;

  constructor(private cartsServices: CartsServices) {}
  ngOnInit(): void {
    this.getCartProducts();
  }

  // الدالة التالية تجلب سلة المنتجات
  getCartProducts() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      console.log(this.cartProducts);
      this.getCartTotal();
    }
  }

  // الدالة التالية تقوم بحساب مجمل السعر لكل المنتجات المتواجدة في السلة
  getCartTotal() {
    this.total = 0; 
    for (let x in this.cartProducts) {
      this.total +=
        this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  // الدالة التالية تتنفذ عندما يتم الضغط على زر تنقيص كمية المنتج في السلة حيث تم استدعائها في الفيو
  minAmount(index: number) {
    this.cartProducts[index].quantity--;
    this.getCartTotal(); 
    localStorage.setItem('cart', JSON.stringify(this.cartProducts)); 
  }

  // الدالة التالية تتنفذ عندما يتم الضغط على زر زيادة كمية المنتج في السلة حيث تم استدعائها في الفيو
  addAmount(index: number) {
    this.cartProducts[index].quantity++;
    this.getCartTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts)); //all-products.component.ts هذا السطر تم شرحه سابقا في
  } 

  detectChange() {
    this.getCartTotal(); 
    localStorage.setItem('cart', JSON.stringify(this.cartProducts)); // هذا السطر تم استدعائه هنا من اجل
  }

  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    this.getCartTotal(); 
    localStorage.setItem('cart', JSON.stringify(this.cartProducts)); // هذا السطر تم استدعائه هنا من اجل
  }

  clearCart() {
    // هذه الدالة تحذف كل المنتجات من السلة يعني بتنظف السلة
    this.cartProducts = []; 
    this.getCartTotal(); 
    // يعني السعر الكلي من جديد
    localStorage.setItem('cart', JSON.stringify(this.cartProducts)); 
  }

  addCart() {
    // هذه الدالة هي لإضافة السلة الى الاي بي آي وهي اخردالة سويناها في الفيديو 12
    let prodcuts = this.cartProducts.map((item: any) => {
      return { productId: item.item.id, quantity: item.quantity };
    });
    let Model = {
      userId: 5,
      date: new Date(),
      products: prodcuts,
    };
    this.cartsServices.createNewCart(Model).subscribe({
      next: (res) =>{
        this.success = true,
        this.clearCart() 
      },
      error: (err) =>
        alert(err)
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Product } from '../../products/models/product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
 @Input() data!:Product ; // هذا دخل سيتم جلبه من الاب الذي يتم استدعاء هذا المكون فيه
 @Output() item = new EventEmitter(); // هذا سنرسله للأب
 addButton: boolean = false; // هذا المتغير لازم في الفيو حيث يؤدي لاختفاء عنصر وظهور عنصر
 amount: number = 0;  // هذا المتغير مشان كمية المنتج الذي سيتم اضافته للسلة
 add()
 {
   this.item.emit({item:this.data, quantity: this.amount});
 }
}

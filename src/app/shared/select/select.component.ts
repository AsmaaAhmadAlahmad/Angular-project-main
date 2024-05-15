import { Component, EventEmitter, Input, Output, input } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {

@Input() title: string = ""; // هذا المتغير تم استخدامه في الفيو وستأتي قيمته من  الاب
                             // الذي سيتم استدعاء هذا الكومبونينت فيه لذلك سيتم وضع انبوت له
@Input() data: any[] = [];   // هذا المتغير تم استخدامه في الفيو وستأتي قيمته من  الاب
                             // الذي سيتم استدعاء هذا الكومبونينت فيه لذلك سيتم وضع انبوت له

@Output() selecteValue = new EventEmitter() // ارسال قيمة للأب حيث ستككون القيمة المختارة من
                                            // لذلك تم وضع اوتبوت 


detectChanges(event: any) // هذه الدالة تم استخدامها في الفيو
{
    this.selecteValue.emit(event);
}
}

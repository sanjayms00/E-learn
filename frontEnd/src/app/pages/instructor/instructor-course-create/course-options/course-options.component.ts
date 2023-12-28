import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/shared/services/ticket.service';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'  


@Component({
  selector: 'app-course-options',
  templateUrl: './course-options.component.html',
  styleUrls: ['./course-options.component.css']
})
export class CourseOptionsComponent {


  name = 'Angular';  
    
  productForm: FormGroup;  
     
  constructor(private fb:FormBuilder, private router: Router) {  
     
    this.productForm = this.fb.group({  
      name: '',  
      quantities: this.fb.array([]) ,  
    });  
  }  
    
  quantities() : FormArray {  
    return this.productForm.get("quantities") as FormArray  
  }  
     
  newQuantity(): FormGroup {  
    return this.fb.group({  
      qty: '',  
      price: '',  
    }) }

    addQuantity() {  
      this.quantities().push(this.newQuantity());  
    }  
       
    removeQuantity(i:number) {  
      this.quantities().removeAt(i);  
    }  
       
    onSubmit() {  
      console.log(this.productForm.value);  
    }







  //constructor(public ticketService: TicketService, private router: Router) { }

    // classes: any[];

    // vagons: any[];
    
    // seats: any[];

    // seatInformation: any;

    ngOnInit() { 
        // this.seatInformation = this.ticketService.ticketInformation.seatInformation;

        // this.classes = [
        //     {name: 'First Class', code: 'A', factor: 1},
        //     {name: 'Second Class', code: 'B', factor: 2},
        //     {name: 'Third Class', code: 'C', factor: 3}
        // ];    
    }

    // setVagons(event) {
    //     if (this.seatInformation.class && event.value) {
    //         this.vagons = [];
    //         this.seats = [];
    //         for (let i = 1; i < 3 * event.value.factor; i++) {
    //             this.vagons.push({wagon: i + event.value.code, type: event.value.name, factor: event.value.factor});
    //         }
    //     }
    // }
    
    // setSeats(event) {
    //     if (this.seatInformation.wagon && event.value) {
    //         this.seats = [];
    //         for (let i = 1; i < 10 * event.value.factor; i++) {
    //             this.seats.push({seat: i, type: event.value.type});
    //         }
    //     }
    // }

    nextPage() {
        this.router.navigate(['instructor/create/content']);
        // if (this.seatInformation.class && this.seatInformation.seat && this.seatInformation.wagon) {
        //     this.ticketService.ticketInformation.seatInformation = this.seatInformation;
        //     this.router.navigate(['steps/payment']);
        // }
    }

    prevPage() {
        this.router.navigate(['instructor/create/information']);
    }
}

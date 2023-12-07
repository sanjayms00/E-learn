import { Component, OnInit } from '@angular/core';
import { instructorInterface } from 'src/app/shared/interface/client.interface';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css']
})
export class InstructorListComponent implements OnInit {

  instructorList : instructorInterface[] = []

  ngOnInit(): void {
    
  }
  
}

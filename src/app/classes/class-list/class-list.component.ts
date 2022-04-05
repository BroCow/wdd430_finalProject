import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Class } from '../class.model';
import { ClassService } from '../class.service';

@Component({
  selector: 'fp-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  classes: Class[] = [
    // new Class(
    //   '1',
    //   'APSC 111',
    //   'Structured Cabling',
    //   '1st Year, 1st Semester'
    // )
  ];

  constructor(private classService: ClassService,
              private router: Router,
              private route: ActivatedRoute) { this.classes = this.classService.getClasses(); }

  ngOnInit(): void {
    this.classes = this.classService.getClasses();
    console.log(this.classes);

    this.subscription = this.classService.classListChangedEvent
    .subscribe(
      (classList: Class[]) => {
        this.classes = classList;
      }
    )
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}

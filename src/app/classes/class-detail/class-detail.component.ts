import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Class } from '../class.model';
import { ClassService } from '../class.service';


@Component({
  selector: 'fp-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css']
})
export class ClassDetailComponent implements OnInit {
  nativeWindow: any;

  class: Class;
  id: string;

  constructor(
    private classService: ClassService,
    private router: Router,
    private route: ActivatedRoute,
    private windRefService: WindRefService
  ) {
    this.nativeWindow = windRefService.getNativeWindow();
   }

  ngOnInit(): void {
    // reference the current activated route's parameters
    this.route.params
    // subscribe to the current activated route to listen for changes
    .subscribe(
      // tune into the params of the activated route
      (params: Params) => {
        // set this id variable to the value of the activated routes 'id' parameter
        this.id = params['id'];
        // set this class variable to the returned class from the getClass method
        this.class = this.classService.getClass(this.id);
      }
    )
  }

  onEdit(){
    console.log('onEdit called');
    this.classService.updateClass(this.class, this.class);
    this.router.navigate(['/students']);
  }

  onDelete(){
    console.log('onDelete called');
    this.classService.deleteClass(this.class);
    this.router.navigate(['/classes']);
  }

}

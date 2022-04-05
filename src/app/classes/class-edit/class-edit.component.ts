import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Class } from '../class.model';
import { ClassService } from '../class.service';
 
@Component({
  selector: 'fp-class-edit',
  templateUrl: './class-edit.component.html',
  styleUrls: ['./class-edit.component.css']
})
export class ClassEditComponent implements OnInit {

  // define a variable for a class that exists in class list array
  existingClass: Class;
  // define a variable for an edited class
  editedClass: Class;
  // define boolean variable to determine if a class is being edited
  editMode: boolean = false;
  // define a variable for the id of the class selected from list
  id: string;

  constructor(
    private classService: ClassService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // reference the current activated route's parameters
    this.route.params
    // subscribe to the current activated route to listen for changes
    .subscribe(
      // tune into the params of the activated route
      (params: Params) => {
        // set this id variable to the value of the activated routes 'id' parameter
        this.id = params['id'];

        // if id is null or undefined, then end
        if(!this.id){
          return;
        }

        // set this existing class variable to the returned class from the getClass method
        this.existingClass = this.classService.getClass(this.id);

        // if existing class is null or undefined, then end
        if(!this.existingClass){
          return;
        }

        // change edit mode to 'true'
        this.editMode = true;
        // set editedClass to the existingClass value
        this.editedClass = {...this.existingClass};
      }
    )
  }

  onCancel(){
    console.log('onCancel called');
    this.router.navigate(['/classes']);
  }

  onSubmit(form: NgForm){
    console.log('onSubmit called');

    // define variable to hold values of form fields
    const value = form.value;
    // define variable to hold updated class values
    const updatedClass = new Class(
      value.id,
      value.apsc,
      value.name,
      value.description
    );

    // if the class already exists and editMode is TRUE, call the updateClass method
    if(this.editMode){
      this.classService.updateClass(this.existingClass, updatedClass);
      // if the class does not exist and editMode is FALSE, call the addClass method
    } else {
      this.classService.addClass(updatedClass);
    }
  
    // route back to classes
    // this.router.navigate(['/students']);

  }

}

import { EventEmitter, Injectable } from "@angular/core";
import { Class } from "./class.model";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";




@Injectable({
    providedIn: 'root',
})
export class ClassService{

    maxClassId: number;

    classListChangedEvent = new Subject<Class[]>();

    classChangedEvent = new EventEmitter<Class[]>();

    private classes: Class[] = [];

    classSelectedEvent = new EventEmitter<Class>();

    constructor(
        private http: HttpClient,
        private route: Router
        ){
        this.getClasses();
    }
    // Method to return a copy of the array of classes
    getClasses(): Class[]{
        this.http

        .get<Class[]>('http://localhost:3000/classes')
        
        .subscribe(
            //  Success method
            // Assign the array of documents received to the documents property
            (classes: Class[]) => {
            this.classes = classes;
            console.log('classes ', this.classes);
            console.log(classes[1].name);
            // Call the getMaxId() method to get the maximum value used for the id property in the document list, and assign the value returned to the maxDocumentId property
            this.maxClassId = this.getMaxId();
            // Sort the list of documents by name using the sort() JavaScript array method. This method requires that you pass it a compare function. The compare function is called for each element in the array. It receives two inputs, the current element in the array and the next element in the array.   
            // this.classes.sort(function (a, b){
            //     // If the current element is less than the next element, return a minus one.
            //     if(a.name < b.name) {
            //     return -1;
            //     }
            //     // If the first element is greater than the next element, return a one;
            //     else if(a.name > b.name){
            //     return 1;
            //     }
            //     // else, return zero
            //     else {
            //     return 0;
            //     }
            // });
            // Emit the documentListChangedEvent subject and pass it a cloned copy of the documents array to notify the DocumentListComponent that the document list has changed. Use the slice() JavaScript array method to get a clone of the documents array
            let classListClone = this.classes.slice();
            this.classChangedEvent.next(classListClone);
            },
            // error method
            (error: any) => {
            console.log(error);
            }
            )
            
            return this.classes.slice();      
      } 


    // Method to return details of class from the array when class selected from list
    getClass(id: string):Class {
        for(let selectedClass of this.classes){
            if(selectedClass.id === id){
                return selectedClass;
            }
        }
        return null;
    }

    updateClass(existingClass: Class, updatedClass: Class){
        console.log('updateClass called');

        if(!existingClass || !updatedClass){
            return;
        }

        const pos = this.classes.findIndex(c => c.id === existingClass.id);
        if(pos < 0){
            return;
        }

        updatedClass.id = existingClass.id;

        const headers = new HttpHeaders({'Content-Type': 'application/json'});
           // update database
        this.http.put('http://localhost:3000/classes/' + existingClass.id,
        updatedClass, { headers: headers })
        .subscribe(
        (response: Response) => {
            this.classes[pos] = updatedClass;
            // this.storeClasses();
        }
        );
        this.route.navigate(['/']);
    }

    addClass(updatedClass: Class){
        console.log('addClass called');

        if(!updatedClass){
            return;
        }

        updatedClass.id = '';

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        // add to database
        this.http.post<{ message: string, updatedClass: Class }>('http://localhost:3000/classes',
        updatedClass,
        { headers: headers })
        .subscribe(
          (responseData) => {
            // add new class to classes array
            this.classes.push(responseData.updatedClass);
            // this.storeClasses();
        }
        );
        console.log('Class added!');
        this.route.navigate(['/']);
        this.route.navigate(['/results/add-result']);
    }

    deleteClass(deleteClass: Class) {

        if (!deleteClass) {
          return;
        }
    
        const pos = this.classes.findIndex(c => c.id === deleteClass.id);
    
        if (pos < 0) {
          return;
        }
    
        // delete from database
        this.http.delete('http://localhost:3000/classes/' + deleteClass.id)
          .subscribe(
            (response: Response) => {
              this.classes.splice(pos, 1);
              // this.storeClasses();
            }
          );
          // this.route.navigate(['/results/delete-result']);
    }

    getMaxId(): number{
        let maxId = 0;
        console.log('classes', this.classes);
        this.classes.forEach(element => {
          let currentId = parseInt(element.id);
          if(currentId > maxId){
            maxId = currentId
          }
        });
        return maxId;
    }

    storeClasses(){
        // Convert the documents array into a string format by calling the JSON.stringify() method. This is important because only text data can flow through firewalls when an HTTP request is made
        const classesArrayString = JSON.stringify(this.classes);
        console.log(classesArrayString);
    
        // Create a new HttpHeaders object that sets the Content-Type of the HTTP request to application/json
        const headers = new HttpHeaders()
        .set('content-type', 'application/json');
        console.log(headers);
    
        this.http
            .put('http://localhost:3000/classes', 
            this.classes, {'headers': headers}
            )
            .subscribe(response => {
            console.log(response);
            let classListClone = this.classes.slice();
            this.classListChangedEvent.next(classListClone);
            });
      }

    
}
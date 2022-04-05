import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClassDetailComponent } from "./classes/class-detail/class-detail.component";
import { ClassEditComponent } from "./classes/class-edit/class-edit.component";
import { ClassesComponent } from "./classes/classes.component";
import { AddResultComponent } from "./results/add-result/add-result.component";
import { DeleteResultComponent } from "./results/delete-result/delete-result.component";
import { EditResultComponent } from "./results/edit-result/edit-result.component";
import { ResultsComponent } from "./results/results.component";
import { StudentsComponent } from "./students/students.component";


const appRoutes: Routes = [
    { path: '', redirectTo: '/classes', pathMatch: 'full' },
    { path: 'classes', component: ClassesComponent,
        children: [
            { path: 'new', component: ClassEditComponent},
            // route activated when class selected from list - getClass method passes id to route
            { path: ':id', component: ClassDetailComponent},
            // route activated when edit button selected from class details
            { path: ':id/edit', component: ClassEditComponent} 
        ]
    },
    { path: 'results', component: ResultsComponent,
        children: [
            { path: 'edit-result', component: EditResultComponent},
            { path: 'delete-result', component: DeleteResultComponent},
            { path: 'add-result', component: AddResultComponent} 
        ]
    },
    { path: 'students', component: StudentsComponent}
]


@NgModule({
    // configure router module
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
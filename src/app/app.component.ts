import { Component, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '../../node_modules/angularfire2/firestore';
import { Observable } from '../../node_modules/rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  isUpdate = false;
  model: Employee = new Employee();

  @ViewChild('dynamicBtn') dynamicBtn: ElementRef;
  displayForm = false;
  employees: Observable<Employee[]>;
  employeeDoc: AngularFirestoreDocument<Employee>;
  employeesDoc: AngularFirestoreCollection<Employee>;
  employee: Observable<Employee>;

  constructor(private db: AngularFirestore) {
    this.employeesDoc = db.collection('employees');
    this.employees = this.employeesDoc.valueChanges();

    // this.itemDoc = db.doc<Employee>('employees/D.Uysal');
    // this.item = this.itemDoc.valueChanges();
  }

  Edit(employee: Employee) {
    console.log(employee);
    this.model = employee;
    this.displayForm = true;
    this.isUpdate = true;
  }

  Delete(employee: Employee) {
    console.log(employee);
  }

  DynamicbtnClikc() {
    if (this.dynamicBtn.nativeElement.innerText === "Save") {
      const docName = `${this.model.fName.charAt(0)}.${this.model.lName}`;
      this.employeesDoc.doc(docName).set(Object.assign({}, this.model), {
        merge: this.isUpdate
      }).then(x => {
        alert('Success');
      }).catch(err =>  {
        console.log(err);
        alert('Not success');
      });
    }
  }

  CreateEmployee() {
    console.log("CreateEmployee");
    this.displayForm = !this.displayForm;
    this.isUpdate = false;
    // this.dynamicBtn.nativeElement.text('Save Changes');
  }

  addItem(employee: Employee) {
    this.employeesDoc.add(employee);
  }

  addItem2(name: string) {
    const id = this.db.createId();
    const employee: IEmployee = { id, fName: name };
    this.employeesDoc.doc(id).set(employee);
  }
  update(employee: Employee) {
    this.employeeDoc.update(employee);
  }

  filter(name: string) {
    this.db.collection('employees', x => x.where('fName', '==',  name));
  }
}

interface IEmployee {
  id: string;
  fName: string;
}

class Employee {
  fName: string;
  lName: string;
  email: string;
  age: number;
  gender: string;
  yearsOfExperience: number;
  isFullTime: boolean;
}

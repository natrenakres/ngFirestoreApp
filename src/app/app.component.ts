import { Component, ViewChild, ElementRef } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "../../node_modules/angularfire2/firestore";
import {
  Observable,
  BehaviorSubject,
  combineLatest
} from "../../node_modules/rxjs";

import { switchMap } from "../../node_modules/rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";

  isUpdate = false;
  model: Employee = new Employee();

  @ViewChild("dynamicBtn") dynamicBtn: ElementRef;
  displayForm = false;
  employees: Observable<Employee[]>;
  employeeDoc: AngularFirestoreDocument<Employee>;
  employeesDoc: AngularFirestoreCollection<Employee>;
  employee: Observable<Employee>;
  appFilter$: BehaviorSubject<string | null>;
  employees$: Observable<Employee[]>;

  constructor(private db: AngularFirestore) {
    this.employeesDoc = db.collection("employees");
    this.appFilter$ = new BehaviorSubject(null);

    this.appFilter$.subscribe(x => {
      this.employees$ = db.collection<Employee>("employees", s => {
              return this.Query(s, x);
            })
            .valueChanges();
    });

    // this.itemDoc = db.doc<Employee>('employees/D.Uysal');
    // this.item = this.itemDoc.valueChanges();
  }

  Search(key: string) {
    this.employees$ = this.db.collection<Employee>("employees", x => x.orderBy("fName").startAt() ).valueChanges();
  }

  Query(snapshot, key) {
    let query: firebase.firestore.Query = snapshot;
    switch (key) {
      case 'BY_GENDER':
        query = query.where("gender", "==", 'Male');
        break;
      case 'BY_FULLTIME':
        query = query.where("isFullTime", "==", true);
        break;
      case 'OLDER_THEN':
        query = query.where("age", ">=", 30);
        break;
      case 'AGE_BETWEEN':
        query = query.where("age", ">=", 30).where("age", "<=", 50);
        break;
      case 'BY_YEARS_OF_EXPERIENCE':
        query = query.where("yearsOfExperience", ">=", 5).where("yearsOfExperience", "<=", 10);
        break;
      default:
        query = query.orderBy("fName", "asc");
        break;
    }
    return query;
  }

  filterBy(key: string) {
    this.appFilter$.next(key);
  }
  onlyMalesFilter() {
    this.employees = this.db
      .collection<Employee>("employees", x => x.where("gender", "==", "Male"))
      .valueChanges();
  }

  fullTimeFilter() {}

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
      this.employeesDoc
        .doc(docName)
        .set(Object.assign({}, this.model), {
          merge: this.isUpdate
        })
        .then(x => {
          alert("Success");
        })
        .catch(err => {
          console.log(err);
          alert("Not success");
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
    this.db.collection("employees", x => x.where("fName", "==", name));
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

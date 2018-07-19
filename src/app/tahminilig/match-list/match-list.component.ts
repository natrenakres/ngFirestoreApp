import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '../../../../node_modules/angularfire2/firestore';
import { Observable } from '../../../../node_modules/rxjs';
import { CompetitionService } from '../competition.service';
import { Competition } from '../models/competition';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {
  user$: Observable<User>;
  user: IUser = new User();
  selectedCompetation: string;
  selectedWeeks = "week-1";
  competitions: Competition[] = [];

  constructor(private db: AngularFirestore,
              public competitionService: CompetitionService) { }

  ngOnInit() {
    this.user$ = this.db.collection("Users").doc<User>('serkan.ertan88@gmail.com').valueChanges();
    const c$ = this.db.collection("Users").doc<User>('serkan.ertan88@gmail.com').collection("competations").valueChanges();
    this.user$.subscribe(u => this.user = u);

    this.competitionService.getCompetitions().subscribe(c => this.competitions = c);
  }

  SelectWeek() {
    console.log(this.selectedWeeks);
  }

  SelectCompetation() {
    console.log(this.selectedCompetation);
    const c$ = this.db.collection("Users")
                .doc<User>('serkan.ertan88@gmail.com')
                .collection("competations")
                .doc(this.selectedCompetation)
                .collection("weeks")
                .doc(this.selectedWeeks).valueChanges();
    c$.subscribe(c => {
      console.log(c);
    });

  }

}


interface IUser {
  email: string | null;
  name: string | null;
  competations: any | null;
}

class User implements IUser {
  email: string;
  name: string;
  competations: any;
}

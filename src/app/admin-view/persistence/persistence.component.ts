import { Component, OnInit } from '@angular/core';
import { PersistenceService } from "../../services/persistence-service/persistence.service";

@Component({
  selector: 'app-persistence',
  templateUrl: './persistence.component.html',
  styleUrls: ['./persistence.component.css']
})
export class PersistenceComponent implements OnInit {
  persistence = "";

  constructor(public persistenceService: PersistenceService) {
  }

  ngOnInit(): void {
    this.persistenceService.persistence.subscribe(e => {
      this.persistence = e;
    })
  }
}

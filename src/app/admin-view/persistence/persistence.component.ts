import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth-service/auth.service";

@Component({
  selector: 'app-persistence',
  templateUrl: './persistence.component.html',
  styleUrls: ['./persistence.component.css']
})
export class PersistenceComponent implements OnInit {
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
}

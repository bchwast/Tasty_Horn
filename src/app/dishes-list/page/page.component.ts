import { Component, OnInit } from '@angular/core';
import {faAngleDoubleLeft} from "@fortawesome/free-solid-svg-icons";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {faAngleDoubleRight} from "@fortawesome/free-solid-svg-icons";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {PaginationService} from "../../services/pagination-service/pagination.service";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  faLeft = faAngleLeft;
  faDoubleLeft = faAngleDoubleLeft;
  faRight = faAngleRight;
  faDoubleRight = faAngleDoubleRight;

  constructor(public paginationService: PaginationService) { }

  ngOnInit(): void {
  }

}

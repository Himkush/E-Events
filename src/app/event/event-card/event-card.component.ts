import { EventFormService } from './../../shared/service/event-form.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormsModel } from 'src/app/shared/model/event-form.model';
import { EventBusService } from './../../shared/service/event-bus.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  @Input() event: FormsModel;
  date = new Date();
  constructor(private eventFormService: EventFormService,
              private eventBusService: EventBusService,
              private router: Router) { }

  ngOnInit() {
    const date = new Date();
  }
  editEvent() {
    // this.eventFormService.setEventToEdit(this.event);
    // this.eventBusService.announce('EVENT_TO_EDIT', this.event);
    this.router.navigate(['edit-event'])
    setTimeout(er => this.eventBusService.announce('EVENT_TO_EDIT', this.event));
  }

}

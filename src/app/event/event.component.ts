import { FormsModel } from './../shared/model/event-form.model';
import { EventFormService } from './../shared/service/event-form.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  events: FormsModel[];
  upEvents: FormsModel[];
  pEvents: FormsModel[];
  loaded = false;
  constructor(private eventService: EventFormService) { }
  date = Date.now();
  ngOnInit() {
    this.eventService.getEvents().subscribe(items => {
      this.events = items;
      this.loaded = true;
      this.upEvents = this.upcomingEvents();
      this.pEvents = this.pastEvents();
      if (typeof (items) === 'undefined' || items.length === 0) {
        // the array is defined and has at least one element
        this.loaded = false;
      }
    });
  }
  upcomingEvents() {
    let upEvents = this.events.filter(event => {
         return event.eventDate.toDate() >= this.date;
    });
    return upEvents;
  }
  pastEvents() {
    let pastEvents = this.events.filter(event => {
      return event.eventDate.toDate() < this.date;
    });
    return pastEvents;
  }
}

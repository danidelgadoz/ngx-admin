import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private subject = new Subject<any>();
  public visible: boolean;

  constructor() { }

  show() {
    this.visible = true;
    this.subject.next(this.visible);
  }

  hide() {
    this.visible = false;
    this.subject.next(this.visible);
  }

  init(): Observable<boolean> {
    return this.subject.asObservable();
  }
}

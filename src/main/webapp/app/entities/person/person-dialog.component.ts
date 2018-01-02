import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Person } from './person.model';
import { PersonPopupService } from './person-popup.service';
import { PersonService } from './person.service';
import { Musikepoche, MusikepocheService } from '../musikepoche';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-person-dialog',
    templateUrl: './person-dialog.component.html'
})
export class PersonDialogComponent implements OnInit {

    person: Person;
    isSaving: boolean;

    musikepoches: Musikepoche[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private personService: PersonService,
        private musikepocheService: MusikepocheService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.musikepocheService.query()
            .subscribe((res: ResponseWrapper) => { this.musikepoches = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.person.id !== undefined) {
            this.subscribeToSaveResponse(
                this.personService.update(this.person));
        } else {
            this.subscribeToSaveResponse(
                this.personService.create(this.person));
        }
    }

    private subscribeToSaveResponse(result: Observable<Person>) {
        result.subscribe((res: Person) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Person) {
        this.eventManager.broadcast({ name: 'personListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMusikepocheById(index: number, item: Musikepoche) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-person-popup',
    template: ''
})
export class PersonPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personPopupService: PersonPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.personPopupService
                    .open(PersonDialogComponent as Component, params['id']);
            } else {
                this.personPopupService
                    .open(PersonDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

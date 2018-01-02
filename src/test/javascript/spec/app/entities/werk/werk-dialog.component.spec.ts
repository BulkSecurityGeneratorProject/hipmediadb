/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HipmediadbTestModule } from '../../../test.module';
import { WerkDialogComponent } from '../../../../../../main/webapp/app/entities/werk/werk-dialog.component';
import { WerkService } from '../../../../../../main/webapp/app/entities/werk/werk.service';
import { Werk } from '../../../../../../main/webapp/app/entities/werk/werk.model';
import { PersonService } from '../../../../../../main/webapp/app/entities/person';
import { MusikepocheService } from '../../../../../../main/webapp/app/entities/musikepoche';

describe('Component Tests', () => {

    describe('Werk Management Dialog Component', () => {
        let comp: WerkDialogComponent;
        let fixture: ComponentFixture<WerkDialogComponent>;
        let service: WerkService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HipmediadbTestModule],
                declarations: [WerkDialogComponent],
                providers: [
                    PersonService,
                    MusikepocheService,
                    WerkService
                ]
            })
            .overrideTemplate(WerkDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WerkDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WerkService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Werk(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.werk = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'werkListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Werk();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.werk = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'werkListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

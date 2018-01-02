/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HipmediadbTestModule } from '../../../test.module';
import { WerkDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/werk/werk-delete-dialog.component';
import { WerkService } from '../../../../../../main/webapp/app/entities/werk/werk.service';

describe('Component Tests', () => {

    describe('Werk Management Delete Component', () => {
        let comp: WerkDeleteDialogComponent;
        let fixture: ComponentFixture<WerkDeleteDialogComponent>;
        let service: WerkService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HipmediadbTestModule],
                declarations: [WerkDeleteDialogComponent],
                providers: [
                    WerkService
                ]
            })
            .overrideTemplate(WerkDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WerkDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WerkService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonControlModule } from '@components/button-control/button-control.module';
import { RecordingStatus } from '../types/studioPage';

import { RecordStudioComponent } from './record-studio.component';

describe('RecordStudioComponent', () => {
  let component: RecordStudioComponent;
  let fixture: ComponentFixture<RecordStudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordStudioComponent ],
      imports:[RouterTestingModule, ButtonControlModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should start record', () => {
    component.recordingStatus = RecordingStatus.STOPPED;

    component.toggleRecordingStatus();

    expect(component.recordingStatus).toBe(RecordingStatus.RECORDING);
  })

  it('should stop recording', () => {
    component.recordingStatus = RecordingStatus.RECORDING;

    component.toggleRecordingStatus();

    expect(component.recordingStatus).toBe(RecordingStatus.STOPPED);
  })
});

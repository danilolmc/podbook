import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonControlModule } from '@components/button-control/button-control.module';
import { RecordingStatus } from '../types/studioPage';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RecordStudioComponent } from './record-studio.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RecordStudioComponent', () => {
  let component: RecordStudioComponent;
  let fixture: ComponentFixture<RecordStudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordStudioComponent],
      imports: [RouterTestingModule, ButtonControlModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]

    })
      .compileComponents();

    Object.defineProperty(window, 'MediaRecorder', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        start: jest.fn(),
        ondataavailable: jest.fn(),
        onerror: jest.fn(),
        state: "",
        stop: jest.fn(),
        pause: jest.fn(),
        resume: jest.fn(),
      })),
    })

    Object.defineProperty(window, 'MediaStream', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
      })),
    })
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

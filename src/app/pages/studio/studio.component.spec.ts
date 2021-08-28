import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabModule } from '@components/tab/tab.module';

import { StudioComponent } from './studio.component';
import { RecordingStatus } from './types/studioPage';

describe('StudioComponent', () => {
  let component: StudioComponent;
  let fixture: ComponentFixture<StudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudioComponent ],
      imports: [TabModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudioComponent);
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

import { TestBed } from '@angular/core/testing';

import { RecordAudioService } from './record-audio.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RecordiAudioService', () => {
  let service: RecordAudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RecordAudioService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

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

import { TestBed } from '@angular/core/testing';
import { CardProperties } from '@components/card/types/CardTypes';
import { PodbookResponse } from '@pages/studio/types/studioPage';
import { AudioControlService } from '@services/audio-control/audio-control.service';
import { PodbookCommonService } from './common.service';


describe('PodbookCommonService', () => {
  let service: PodbookCommonService;
  let audioControlService: AudioControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PodbookCommonService);
    audioControlService = TestBed.inject(AudioControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should prepare podbook list data', () => {

    const podbookRsponseData: PodbookResponse[] = [{
      audio: 'test',
      bannerImage: 'test',
      bannerTitle: 'test',
      category: { cat_id: 0, name: 'test' },
      description: 'test'
    }];

    const podbookData: CardProperties[] = [{
      imgUrl: `test`,
      badgeText: 'test',
      description: 'test',
      title: 'test',
      click: () => { }
    }]

    const resultPodbookData = service.preparePodBookPaginatedData(podbookRsponseData);

    const [resultData, expectedPodbookData] = [
      resultPodbookData,
      podbookData
    ].map(items => JSON.stringify(items))

    expect(resultData).toEqual(expectedPodbookData);
  })

  it('should prepared podbooks data click attribute call startCardAudio', () => {

    const podbookRsponseData: PodbookResponse[] = [{
      audio: 'test',
      bannerImage: 'test',
      bannerTitle: 'test',
      category: { cat_id: 0, name: 'test' },
      description: 'test'
    }];

    const [result] = service.preparePodBookPaginatedData(podbookRsponseData);

    const spyStartCardAudio = jest.spyOn(audioControlService, 'startCardAudio')
      .mockImplementation(() => { });

    result.click()

    const { audio, bannerTitle } = podbookRsponseData[0];

    expect(spyStartCardAudio).toHaveBeenCalledWith(audio, bannerTitle);


  })
});

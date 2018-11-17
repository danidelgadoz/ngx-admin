import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDownloadPreviewComponent } from './file-download-preview.component';

describe('FileDownloadPreviewComponent', () => {
  let component: FileDownloadPreviewComponent;
  let fixture: ComponentFixture<FileDownloadPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileDownloadPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDownloadPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadPreviewComponent } from './file-upload-preview.component';

describe('FileUploadPreviewComponent', () => {
  let component: FileUploadPreviewComponent;
  let fixture: ComponentFixture<FileUploadPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

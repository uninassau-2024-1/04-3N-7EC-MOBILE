import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  
})
export class PhotoService {

  constructor() { }
  
  public async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto ({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
  }
}

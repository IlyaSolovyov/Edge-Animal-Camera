export class Device {
  camera: string;
  imageName: string;
  supportedClasses: string[];

  constructor(camera: string, imageName: string, supportedClasses: string[]) {
    this.camera = camera != "" ? camera : "None installed";
    this.imageName = imageName != "" ? imageName : "assets/images/camera_placeholder.png";
    this.supportedClasses = supportedClasses;
  }
}

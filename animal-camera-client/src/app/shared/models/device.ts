export class Device {
  camera: string;
  supportedClasses: string[];

  constructor(camera: string, supportedClasses: string[]) {
    this.camera = camera != "" ? camera : "None installed";
    this.supportedClasses = supportedClasses;
  }
}

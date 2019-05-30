export class Detection {
  id: number;
  detectedClass: string;
  quantity: number;

  constructor(id: number, detectedClass: string, quantity: number) {
    this.id = id;
    this.detectedClass = detectedClass;
    this.quantity = quantity;
  }
}

import { Detection } from './detection';

export class Encounter {
  id: number;
  timestamp: Date;
  detections: Detection[];

  constructor(id: number, timestamp: Date, detections: Detection[]) {
    this.id = id;
    this.timestamp = timestamp;
    this.detections = detections;
  }
}

import { Component } from '@angular/core';
import { DetectionService } from '../../../shared/services/detection.service';

@Component({
  selector: 'camera-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss']
})
export class RecentComponent {

  constructor(private detectionService: DetectionService) {}
}

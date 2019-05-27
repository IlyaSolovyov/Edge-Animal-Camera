import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Detection } from '../../../shared/models/detection';
import { Encounter } from '../../../shared/models/encounter';
import { DetectionService } from '../../../shared/services/detection.service';
import { ConnectionStore } from '../../../shared/stores/connection.store';

@Component({
  selector: 'camera-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss']
})
export class RecentComponent implements OnInit {

  encounters: Encounter[];

  constructor(private detectionService: DetectionService, private connectionStore: ConnectionStore) { }

  ngOnInit(): void {
    this.connectionStore.address.subscribe(address => {
      this.detectionService.getRecentEncounters(address).subscribe(encounters => {
        let encounterEntities: Encounter[] = [];

        for (let i = 0; i < encounters.length; i++) {
          let detectionEntities: Detection[] = [];

          for (let j = 0; j < encounters[i].detections.length; j++) {
            let detection: Detection = new Detection(encounters[i].detections[j].id,
              encounters[i].detections[j].detectedClass,
              encounters[i].detections[j].quantity);
            detectionEntities.push(detection);
          }

          let encounter: Encounter = new Encounter(encounters[i].id, encounters[i].timestamp, detectionEntities);
          encounterEntities.push(encounter);
        }

        this.encounters = encounterEntities;
      });
    });
  }
}

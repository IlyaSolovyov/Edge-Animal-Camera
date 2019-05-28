import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Detection } from '../../../shared/models/detection';
import { Encounter } from '../../../shared/models/encounter';
import { DetectionService } from '../../../shared/services/detection.service';
import { ConnectionStore } from '../../../shared/stores/connection.store';
import { ConnectionMode } from 'src/app/shared/models/connection-mode';

@Component({
  selector: 'camera-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss']
})
export class RecentComponent implements OnInit {

  encounters: Encounter[];

  constructor(private detectionService: DetectionService, private connectionStore: ConnectionStore) { }

  ngOnInit(): void {
    this.connectionStore.connectionMode.subscribe(mode => {
      if (mode == ConnectionMode.Connected) {
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
      } else if (mode == ConnectionMode.DemoMode) {
        this.encounters = this.getDemoEncounters();
      }
    });
  }

  getDemoEncounters(): Encounter[] {
    let testDetection1: Detection = new Detection(1, "Test Class 1", 1);
    let testDetection2: Detection = new Detection(2, "Test Class 2", 3);
    let testDetection3: Detection = new Detection(3, "Test Class 1", 2);
    let testDetection4: Detection = new Detection(4, "Test Class 2", 2);
    let testDetection5: Detection = new Detection(5, "Test Class 1", 3);
    let testDetection6: Detection = new Detection(6, "Test Class 2", 1);
    let testDetection7: Detection = new Detection(7, "Test Class 1", 3);

    let testEncounter1: Encounter = new Encounter(1, new Date(), [testDetection1, testDetection2]);
    let testEncounter2: Encounter = new Encounter(2, new Date(), [testDetection3, testDetection4]);
    let testEncounter3: Encounter = new Encounter(3, new Date(), [testDetection5]);
    let testEncounter4: Encounter = new Encounter(4, new Date(), [testDetection6]);
    let testEncounter5: Encounter = new Encounter(5, new Date(), [testDetection7]);

    return [testEncounter1, testEncounter2, testEncounter3, testEncounter4, testEncounter5];
  }
}

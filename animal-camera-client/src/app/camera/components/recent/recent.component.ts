import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Detection } from '../../../shared/models/detection';
import { Encounter } from '../../../shared/models/encounter';
import { DetectionService } from '../../../shared/services/detection.service';
import { ConnectionStore } from '../../../shared/stores/connection.store';
import { ConnectionMode } from 'src/app/shared/models/connection-mode';
import { DemoService } from 'src/app/shared/services/demo.service';

@Component({
  selector: 'camera-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss']
})
export class RecentComponent implements OnInit {

  encounters: Encounter[];

  constructor(private detectionService: DetectionService, private connectionStore: ConnectionStore, private demoService: DemoService) { }

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
        this.encounters = this.demoService.getRecentDemoEncounters();
      }
    });
  }

}

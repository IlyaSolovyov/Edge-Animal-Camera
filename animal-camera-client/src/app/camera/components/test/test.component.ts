import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ConnectionStore } from 'src/app/shared/stores/connection.store';
import { DemoService } from 'src/app/shared/services/demo.service';
import { DetectionService } from 'src/app/shared/services/detection.service';
import { ConnectionMode } from 'src/app/shared/models/connection-mode';
import { Encounter } from 'src/app/shared/models/encounter';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'camera-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  detectionForm: FormGroup;

  filename: string;
  filetype: string;
  imageBase64: string;

  resultImage: SafeResourceUrl;

  displayResults: boolean;
  displayTable: boolean;
  resultsTitle: string;
  resultEncounter: Encounter[];

  constructor(private detectionService: DetectionService, private connectionStore: ConnectionStore, private demoService: DemoService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.detectionForm = new FormGroup({
      imageControl: new FormControl()
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.filename = file.name;
        this.filetype = file.type;
        this.imageBase64 = (<string>reader.result).split(',')[1];
      };
    }
  }

  runDetection() {
    this.displayResults = false;

    this.connectionStore.connectionMode.subscribe(mode => {
      if (mode == ConnectionMode.Connected) {

      } else if (mode == ConnectionMode.DemoMode) {
        this.demoService.getDemoEncounter().subscribe(resultEncounter => {
          this.displayDetectionResults(resultEncounter);
        });
      }
    });
  }
  displayDetectionResults(resultEncounter: Encounter): any {
    if (resultEncounter != undefined && resultEncounter.detections.length > 0) {
      this.displayTable = true;
      this.resultsTitle = "Detections results";
      this.resultEncounter = [resultEncounter];

      if (resultEncounter.resultImageBase64.includes("assets/images")) {
        this.resultImage = this.sanitizer.bypassSecurityTrustResourceUrl(resultEncounter.resultImageBase64);
      } else {
        this.resultImage = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
          + resultEncounter.resultImageBase64);
      }

      this.displayResults = true;
    } else {
      this.displayTable = false;
      this.resultsTitle = "No objects found on image " + this.filename;
      this.displayResults = true;
    }
  }

}

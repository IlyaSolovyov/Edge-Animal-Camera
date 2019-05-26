import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSelectModule,
  MatTabsModule,
  MatDatepickerModule,
  MatInputModule,
  MatExpansionModule,
  MatIconModule,
  MatSlideToggleModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatSnackBarModule,
  MatDialogModule,
  MatTooltipModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatCardModule
  } from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule, MatCheckboxModule, MatRadioModule, MatSelectModule, MatTabsModule, MatDatepickerModule,
    MatInputModule, MatExpansionModule, MatIconModule, MatSlideToggleModule, MatTableModule, MatPaginatorModule,
    MatSortModule, MatToolbarModule, MatSidenavModule, MatListModule, MatButtonToggleModule, MatAutocompleteModule,
    MatSnackBarModule, MatDialogModule, MatTooltipModule, MatProgressBarModule, MatProgressSpinnerModule, MatMenuModule,
    MatCardModule
  ],
  exports: [
    MatButtonModule, MatCheckboxModule, MatRadioModule, MatSelectModule, MatTabsModule, MatDatepickerModule,
    MatInputModule, MatExpansionModule, MatIconModule, MatSlideToggleModule, MatTableModule, MatPaginatorModule,
    MatSortModule, MatToolbarModule, MatSidenavModule, MatListModule, MatButtonToggleModule, MatAutocompleteModule,
    MatSnackBarModule, MatDialogModule, MatTooltipModule, MatProgressBarModule, MatProgressSpinnerModule, MatMenuModule,
    MatCardModule
  ]
})
export class MaterialModule {
}

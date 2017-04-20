import { NgModule, Component, OnInit, Input, NO_ERRORS_SCHEMA, Inject } from '@angular/core';
import { Router } from '@angular/router';
import * as musicxml from '../../xmlns/www.musicxml.org'
import { Http, HttpModule } from '@angular/http';
import { Note } from "../model/note.model";
import { AppConfig } from "../../app.config";
import { Store } from "@ngrx/store";

@Component({
  moduleId: module.id,
  selector: '[mxml-measure]',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.css']
})
export class MeasureComponent {

  static LAST_STAFF_SIGN = 'G';
  static BASS_STAFF_LINES = ['G2', 'B2', 'D3', 'F3', 'A3'];
  static BASS_REST_NOTE = 'E3';
  static TREBLE_STAFF_LINES = ['E4', 'G4', 'B4', 'D5', 'F5'];
  static TREBLE_REST_NOTE = 'C5';

  static BASS_KEY_SHARPS = ['F3', 'C3', 'G3', 'D3', 'A3', 'E3', 'B3'];
  static BASS_KEY_FLATS = ['B2', 'E3', 'A2', 'D3', 'G2', 'C3', 'F2'];
  static TREBLE_KEY_SHARPS = ['F5', 'C5', 'G5', 'D5', 'A4', 'E5', 'B4'];
  static TREBLE_KEY_FLATS = ['B4', 'E5', 'A4', 'D5', 'G4', 'C5', 'F4'];


  staffLines: Array<String>;

  @Input()
  measure: musicxml.ScorePartwiseTypePartTypeMeasureType;
  yMiddleC: number;
  width: number = 100;
  restNote: string;
  selectedNote: musicxml.note;
  measureText: string;
  barSign: string;
  keySharps: Array<string>;
  keyFlats: Array<string>;
  Math: any;


  // selectedMeasures: musicxml.ScorePartwiseTypePartTypeMeasureType[];
  // selectedNotes: musicxml.note[];


  constructor(
    private router: Router,
    private http: Http,
    public CONFIG: AppConfig,
    private _store: Store<musicxml.ScorePartwiseTypePartTypeMeasureType[]>) {

    this.Math = Math;

    // this._store.select('selectedMeasures').subscribe(selectedMeasures => {
    //   //if (selectedMeasures && selectedMeasures.length > 0) {
    //   this.selectedMeasures = <musicxml.ScorePartwiseTypePartTypeMeasureType[]>selectedMeasures;
    //   console.log("new measure: " + JSON.stringify(selectedMeasures[0]));
    //   //}
    // });

    // this._store.select('selectedNotes').subscribe(selectedNotes => {
    //   //if (selectedNotes && selectedNotes.length > 0) {
    //   this.selectedNotes = <musicxml.note[]>selectedNotes;
    //   console.log("new note: " + JSON.stringify(selectedNotes[0]));
    //   //}
    // });

  }

  ngOnChanges(changes) {
    console.log("measure changed");
  }

  ngOnInit(): void {
    //console.log("init:" + this.measure);
    if (this.measure && this.measure.attributes && this.measure.attributes.length > 0 && this.measure.attributes[0].clef && this.measure.attributes[0].clef.length > 0) {
      let barSign = this.measure.attributes[0].clef[0].sign;
      if (this.exists(barSign)) {
        MeasureComponent.LAST_STAFF_SIGN = barSign;
        this.barSign = barSign;
      }
    }

    if (!MeasureComponent.LAST_STAFF_SIGN) return;

    if (MeasureComponent.LAST_STAFF_SIGN == 'F') {
      // bass clef
      this.yMiddleC = 50;
      this.staffLines = MeasureComponent.BASS_STAFF_LINES;
      this.restNote = MeasureComponent.BASS_REST_NOTE;
      this.keySharps = MeasureComponent.BASS_KEY_SHARPS;
      this.keyFlats = MeasureComponent.BASS_KEY_FLATS;
    } else {
      this.yMiddleC = 110;
      this.staffLines = MeasureComponent.TREBLE_STAFF_LINES;
      this.restNote = MeasureComponent.TREBLE_REST_NOTE;
      this.keySharps = MeasureComponent.TREBLE_KEY_SHARPS;
      this.keyFlats = MeasureComponent.TREBLE_KEY_FLATS;
    }
    if (this.measure.direction && this.measure.direction.length > 0 && this.measure.direction[0].directionType[0].words[0].content) {
      this.measureText = this.measure.direction[0].directionType[0].words[0].content;
    }

    this.width = MeasureComponent.calculateWidth(this.CONFIG, this.measure)
    if (this.measure && this.measure.width) this.width = this.measure.width;
  }

  static calculateWidth(CONFIG: AppConfig, measure: musicxml.ScorePartwiseTypePartTypeMeasureType) {
    let width = CONFIG.xMarginLeft + CONFIG.xMarginRight;

    if (!measure || !measure.note) {
      return 80;
    } else {
      if (measure.attributes.length > 0) {
        if (measure.attributes[0].clef.length > 0) {
          width = width + 40;
        }
        if (measure.attributes[0].key.length > 0) {
          width = width + (Math.abs(measure.attributes[0].key[0].fifths) * 20);
        }
      }
      width = width + CONFIG.xSpacing * measure.note.length;
      return width;
    }
  }

  selectNote(note: musicxml.note) {
    this.selectedNote = note;
    //note.pitch[0].step="B";
  }

  noteToYPos(mxmlNote: musicxml.note): number {
    if (!mxmlNote) return 0;

    var note;

    if (mxmlNote.rest && mxmlNote.rest.length && mxmlNote.rest[0]._exists) {
      if (MeasureComponent.LAST_STAFF_SIGN == "G") {
        note = new Note('B', 4);
      } else {
        note = new Note('D', 3);
      }
    } else {
      note = new Note(mxmlNote.pitch[0].step, mxmlNote.pitch[0].octave);
    }

    let diff = note.stepOctaveIndex - Note.C4.stepOctaveIndex;
    // console.log(note);
    // console.log("diff:" + diff);
    return this.yMiddleC - diff * this.CONFIG.ySpacing;
  }

  noteCodeToYPos(noteCode: string): number {
    let note = new Note(noteCode);

    let diff = note.stepOctaveIndex - Note.C4.stepOctaveIndex;
    // console.log(note);
    // console.log("diff:" + diff);
    return this.yMiddleC - diff * this.CONFIG.ySpacing;

  }

  notExists(xmlElement) {
    return xmlElement._exists == false;
  }

  exists(xmlElement) {
    return !this.notExists(xmlElement);
  }

  // isMeasureSelected(measure: musicxml.ScorePartwiseTypePartTypeMeasureType): boolean {
  //   return this.selectedMeasures && this.selectedMeasures.indexOf(measure) > -1;
  // }

  // isNoteSelected(note: musicxml.note): boolean {
  //   return this.selectedNotes && this.selectedNotes.indexOf(note) > -1;
  // }

  getTranslate(index, note): string {
    let x = note.defaultX;
    if (!x || x._exists == false) x = index * this.CONFIG.xSpacing + 50;

    let y = this.noteToYPos(note)
    return 'translate(' + x + ',' + y + ')';
  }



}

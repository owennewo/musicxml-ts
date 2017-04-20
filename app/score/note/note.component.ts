import { NgModule, Component, OnInit, Input, NO_ERRORS_SCHEMA, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import * as musicxml from '../../xmlns/www.musicxml.org'
import { Http, HttpModule } from '@angular/http';
import { Note } from "../model/note.model";
import { SvgUse } from "./svg.use.model";

@Component({
  moduleId: module.id,
  selector: '[mxml-note]',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {

  static ySpacing: number = 20;

  @Input()
  note: musicxml.note;

  @Input()
  treble: boolean;

  @Input()
  selected: boolean;

  svgParts: SvgUse[] = [];

  yMiddleC: number = 100;

  constructor(
    private router: Router,
    private http: Http) {


  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("note change");
    let type = this.note.type.content;
    let stem = (this.note.stem) ? this.note.stem.content : undefined;

    this.svgParts = [];

    if (this.note.rest && this.note.rest.length > 0 && this.note.rest[0]._exists) {
      if (this.note.rest[0].measure == "yes") {
        this.svgParts.push(new SvgUse('rest-type-whole'));
      } else {
        this.svgParts.push(new SvgUse('rest-type-' + this.note.type.content));
      }

    } else {
      this.svgParts.push(new SvgUse('note-type-' + this.note.type.content));
    }


    if (stem && stem != 'none') {
      this.svgParts.push(new SvgUse("stem-type-" + stem));
    }

    if (this.note.dot && this.note.dot.length && this.note.dot[0]._exists) {
      this.svgParts.push(new SvgUse("dot"));
    }

    let stemDirection = 1;
    if (stem && stem == 'down') {
      stemDirection = -1;
    }

    switch (type) {
      case 'whole':
        break;
      case 'half':
        break;
      case 'quarter':
        break;
      case 'eighth':
        this.svgParts.push(new SvgUse("flag-type-" + stem + "-eighth"));
        break;
      case '16th':
        this.svgParts.push(new SvgUse("flag-type-" + stem + "-16th"));
        break;
      case '32nd':
        this.svgParts.push(new SvgUse("flag-type-" + stem + "-32nd"));
        break;
    }

  }

  ngOnInit(): void {



  }

  selectNote(note: musicxml.note) {
    //this.selectedNote = note;
    //note.pitch[0].step="B";
  }

  noteToYPos(mxmlNote: musicxml.note): number {

    let note = new Note(mxmlNote.pitch[0].step, mxmlNote.pitch[0].octave);
    let diff = note.stepOctaveIndex - Note.C4.stepOctaveIndex;
    return this.yMiddleC - diff * NoteComponent.ySpacing;
  }

  noteCodeToYPos(noteCode: string): number {
    let note = new Note(noteCode);

    let diff = note.stepOctaveIndex - Note.C4.stepOctaveIndex;
    return this.yMiddleC - diff * NoteComponent.ySpacing;

  }

  notExists(xmlElement) {
    return xmlElement || xmlElement._exists == false;
  }

  exists(xmlElement) {
    return !this.notExists(xmlElement);
  }


}

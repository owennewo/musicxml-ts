import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as cxml from 'cxml';
import * as musicxml from '../xmlns/www.musicxml.org'


import { Http, HttpModule } from '@angular/http';
import { MusicXmlFactory } from "../musicxml.factory";

@Component({
  moduleId: module.id,
  selector: 'my-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  //score: musicxml.document;
  notes = [];
  

  constructor(
    private router: Router,
    private http: Http) {
      //this.score.scorePartwise.part[0].
  }

  ngOnInit(): void {
    this.notes.push ( MusicXmlFactory.createNote("whole", false, 'up'));
    this.notes.push ( MusicXmlFactory.createNote("half", false, 'up'));
    this.notes.push ( MusicXmlFactory.createNote("half", false, 'down'));
    this.notes.push ( MusicXmlFactory.createNote("quarter", true, 'up'));
    
    this.notes.push ( MusicXmlFactory.createNote("quarter", true, 'down'));
    this.notes.push ( MusicXmlFactory.createNote("eighth", true, 'down'));
    this.notes.push ( MusicXmlFactory.createNote("eighth", true, 'up'));
    this.notes.push ( MusicXmlFactory.createNote("16th", true, 'down'));
    this.notes.push ( MusicXmlFactory.createNote("16th", true, 'up'));
    
    this.notes.push ( MusicXmlFactory.createNote("32nd", true, 'down'));
    this.notes.push ( MusicXmlFactory.createNote("32nd", true, 'up'));


    // console.log ("note1:" + this.note1.type.content);
    // console.log ("note2:" + this.note2.type.content);
    
  }


}

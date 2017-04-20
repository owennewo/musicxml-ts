import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as cxml from 'cxml';
import * as musicxml from '../xmlns/www.musicxml.org';
import * as scoreactions from '../reducers/state.actions';



import { Http, HttpModule } from '@angular/http';
import { Store } from "@ngrx/store";
import { ScoreService } from "../score/score.service";

@Component({
  moduleId: module.id,
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: []
})
export class LoaderComponent implements OnInit {

  scores = ["Binchois", "Chant", "Telemann"];
  pictureUri: string;
  //  score: musicxml.document;

  constructor(
    private router: Router,
    private http: Http,
    //private _store: Store<musicxml.ScorePartwiseTypePartTypeMeasureType[]>,
    private _scoreService: ScoreService
  ) {

  }

  ngOnInit(): void {
    // this._store.select('score').subscribe(score => {
    //   this.score = <musicxml.document>score;
    // });

  }

  selectScore(score) {
    this.loadXml("/examples/" + score + ".xml");
    this.pictureUri = "/examples/" + score + ".png"
  }


  loadXml(url: string) {

    console.log("Loading xml: " + url);

    this.http.get(url).subscribe(res => {
      console.log(res);
      let responseText = res.text();

      var parser = new cxml.Parser();

      var promiseResponse = parser.parse(responseText, musicxml.document);
      promiseResponse.then((doc: musicxml.document) => {

        this._scoreService.loadScore(doc);

        //      console.log(JSON.stringify(doc));  // {"dir":{"name":"empty"}}
      });
      // xml2js.parseString(res, (err, json) => {
      //     console.log(json);
    });
  }


}

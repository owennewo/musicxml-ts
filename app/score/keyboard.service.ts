import { ModeType } from "../reducers/score.state";
import * as musicxml from '../xmlns/www.musicxml.org';
import * as scoreactions from '../reducers/state.actions';
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ScoreService } from "./score.service";

@Injectable()
export class KeyboardService {

    mode: ModeType;
    score: musicxml.document;

    constructor(
        private _scoreService: ScoreService) {

    }

    handleKeyDownEvent(event: KeyboardEvent) {

        let key = event.key;

        if (key == 'm') {
            this._scoreService.switchMode("Measure");
        } else if (key == 'n') {
            this._scoreService.switchMode("Note");
        } else if (key == 'ArrowRight') {
            this._scoreService.moveNext();
        } else if (key == 'ArrowLeft') {
            this._scoreService.movePrevious();
        } else if (key == 'ArrowUp') {
            this._scoreService.increasePitch();
        } else if (key == 'ArrowDown') {
            this._scoreService.decreasePitch();
        } else if (key == 'Insert') {
            this._scoreService.insert();
        } else if (key == 'Delete') {
            this._scoreService.delete();
        } else if (isNaN(key)) {
            console.log("unknown key stroke:" + key);
            return;
        } else {
            let index = +key - 1; // human index - starts at 1
            this._scoreService.moveTo(index);
        }
        event.cancelBubble = true;
        event.preventDefault();
    }
}
import { ModeType } from "../reducers/score.state";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as musicxml from '../xmlns/www.musicxml.org';
import * as scoreactions from '../reducers/state.actions';
import { NoteUtils } from "../builders/note.utils";

@Injectable()
export class ScoreService {

    mode: ModeType = "Measure";
    indexes = new Map<ModeType, number>();
    partIndex = 0;
    measureIndex = 0;
    noteIndex = 0;
    score: musicxml.document;
    //selectedIndex = 1;

    constructor(private _store: Store<musicxml.ScorePartwiseTypePartTypeMeasureType[]>) {
        this.indexes.set("Part", 0);
        this.indexes.set("Measure", 0);
        this.indexes.set("Note", 0);
        this._store.select('score').subscribe(score => {
            this.score = <musicxml.document>score;
        });
    }

    loadScore(score: musicxml.document) {
        console.log("Score loaded");
        this._store.dispatch({ type: scoreactions.LOAD_SCORE, payload: score });
    }

    switchMode(mode: ModeType) {
        this.mode = mode;
        console.log("switchMode '" + mode + "'");

        let index = this.indexes.get(mode);
        this.moveTo(index);
    }

    moveTo(index: number, mode?: ModeType) {
        if (!mode) mode = this.mode;
        this.indexes.set(mode, index);

        console.log("move '" + mode + "' to " + index);
        let partIndex = this.indexes.get("Part");
        let measureIndex = this.indexes.get("Measure");

        switch (this.mode) {
            case "Measure":
                this.indexes.set("Note", 0);
                this._store.dispatch({ type: scoreactions.SELECT_NOTES, payload: [] });
                this._store.dispatch({ type: scoreactions.SELECT_MEASURES, payload: [{ partIndex: partIndex, measureIndex: measureIndex }] });
                //this._store.dispatch({ type: scoreactions.SELECT_MEASURES, payload: [this.score.scorePartwise.part[partIndex].measure[measureIndex]] });
                break;
            case "Note":
                let noteIndex = this.indexes.get("Note");
                if (noteIndex >= this.score.scorePartwise.part[partIndex].measure[measureIndex].note.length) {
                    measureIndex = this.indexes.get("Measure") + 1;
                    this.indexes.set("Measure", measureIndex);
                    this.indexes.set("Note", 0);
                    noteIndex = 0;
                } else if (noteIndex < 0) {
                    measureIndex = this.indexes.get("Measure") - 1;
                    this.indexes.set("Measure", measureIndex);
                    noteIndex = this.score.scorePartwise.part[partIndex].measure[measureIndex].note.length - 1;
                    this.indexes.set("Note", noteIndex);
                }
                this._store.dispatch({ type: scoreactions.SELECT_MEASURES, payload: [] });
                //this._store.dispatch({ type: scoreactions.SELECT_NOTES, payload: [this.score.scorePartwise.part[partIndex].measure[measureIndex].note[noteIndex]] });
                this._store.dispatch({ type: scoreactions.SELECT_NOTES, payload: [{ partIndex: partIndex, measureIndex: measureIndex, noteIndex: noteIndex }] });

                break;
        }
    }

    increasePitch() {
        switch (this.mode) {
            case "Measure":
                break;
            case "Note":
                let partIndex = this.indexes.get("Part");
                let measureIndex = this.indexes.get("Measure");
                let noteIndex = this.indexes.get("Note");

                for (let pitch of this.score.scorePartwise.part[partIndex].measure[measureIndex].note[noteIndex].pitch) {
                    NoteUtils.increasePitch(pitch);
                }

                break;
        }
    }

    decreasePitch() {
        switch (this.mode) {
            case "Measure":
                break;
            case "Note":
                let partIndex = this.indexes.get("Part");
                let measureIndex = this.indexes.get("Measure");
                let noteIndex = this.indexes.get("Note");

                for (let pitch of this.score.scorePartwise.part[partIndex].measure[measureIndex].note[noteIndex].pitch) {
                    NoteUtils.decreasePitch(pitch);
                }

                break;
        }
    }

    insert() {
        let partIndex = this.indexes.get("Part");
        let measureIndex = this.indexes.get("Measure");
        let noteIndex = this.indexes.get("Note");

        switch (this.mode) {
            case "Measure":
                this._store.dispatch({ type: scoreactions.INSERT_MEASURE, payload: { partIndex: partIndex, measureIndex: measureIndex } });
                break;
            case "Note":
                this._store.dispatch({ type: scoreactions.INSERT_NOTE, payload: { partIndex: partIndex, measureIndex: measureIndex, noteIndex: noteIndex } });
                break;
        }
    }

    delete() {
        let partIndex = this.indexes.get("Part");
        let measureIndex = this.indexes.get("Measure");
        let noteIndex = this.indexes.get("Note");

        switch (this.mode) {
            case "Measure":
                this._store.dispatch({ type: scoreactions.DELETE_MEASURE, payload: { partIndex: partIndex, measureIndex: measureIndex } });
                break;
            case "Note":
                this._store.dispatch({ type: scoreactions.DELETE_NOTE, payload: { partIndex: partIndex, measureIndex: measureIndex, noteIndex: noteIndex } });
                break;
        }
    }

    moveNext(mode?: ModeType) {
        if (!mode) mode = this.mode;
        let index = this.indexes.get(mode) + 1;
        this.moveTo(index, mode);
    }

    movePrevious(mode?: ModeType) {
        if (!mode) mode = this.mode;
        let index = this.indexes.get(mode) - 1;
        this.moveTo(index, mode);
    }

}
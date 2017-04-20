import { Action } from '@ngrx/store';
import * as musicxml from '../xmlns/www.musicxml.org'


export const SELECT_MEASURES = '[Score] Select Measures';
export const SELECT_NOTES = '[Score] Select Notes';
export const INSERT_NOTE = '[Score] Insert Note';
export const DELETE_NOTE = '[Score] Delete Note';
export const INSERT_MEASURE = '[Score] Insert Measure';
export const DELETE_MEASURE = '[Score] Delete Measure';
export const SELECT_MODE = '[Score] Select Mode';
export const LOAD_SCORE = '[Score] Load';


export class SelectMeasuresAction implements Action {
    readonly type = SELECT_MEASURES;
    constructor(public payload: musicxml.ScorePartwiseTypePartTypeMeasureType[]) { }
}

export class SelectNotesAction implements Action {
    readonly type = SELECT_NOTES;
    constructor(public payload: musicxml.note[]) { }
}

export class SelectModeAction implements Action {
    readonly type = SELECT_MODE;
    constructor(public payload: musicxml.note[]) { }
}

export class InsertNoteAction implements Action {
    readonly type = INSERT_NOTE;
    constructor(public payload: {}) { }
}

export class DeleteNoteAction implements Action {
    readonly type = DELETE_NOTE;
    constructor(public payload: {}) { }
}

export class InsertMeasureAction implements Action {
    readonly type = INSERT_MEASURE;
    constructor(public payload: {}) { }
}

export class DeleteMeasureAction implements Action {
    readonly type = DELETE_MEASURE;
    constructor(public payload: {}) { }
}

export class LoadScoreAction implements Action {
    readonly type = LOAD_SCORE;
    constructor(public payload: musicxml.document) { }
}

export type Actions
    = SelectMeasuresAction
    | SelectNotesAction
    | InsertNoteAction
    | DeleteNoteAction
    | SelectModeAction
    | LoadScoreAction
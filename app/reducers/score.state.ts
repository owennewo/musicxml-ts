import * as scoreactions from './state.actions';
import * as musicxml from '../xmlns/www.musicxml.org'
import { ScoreConstants } from '../score/score.constants';
import { NoteUtils } from "../builders/note.utils";

// export abstract class ModeType {
//   //readonly type;
//   params: string;
//   constructor() { 
//   }
// };

// export class ScoreModeType extends ModeType {
//   //readonly type = SCORE_MODE_TYPE;
//   constructor() {
//     super();
//    }
// }

// export class MeasureModeType extends ModeType {
//   //readonly type = MEASURE_MODE_TYPE;
//   params: string;
//   constructor() {
//     super();
//    }
// }

// export class NoteModeType extends ModeType {
//   //readonly type = NOTE_MODE_TYPE;
//   constructor() {
//     super();
//    }
// }

export interface ScoreState {
  mode: ModeType;
  score: musicxml.document;
  selectedMeasures: Array<any>;
  selectedNotes: Array<any>;
};


const initialState: ScoreState = {
  mode: "Measure",
  score: undefined,
  selectedMeasures: [],
  selectedNotes: []
};

export const scorestate = (state = initialState, action): ScoreState => {
  switch (action.type) {
    case scoreactions.SELECT_MEASURES: {
      //state.selectedMeasures = action.payload;
      for (let measure of state.selectedMeasures) {
        state.score.scorePartwise.part[measure.partIndex].measure[measure.measureIndex].selected = false;
      }

      for (let measure of action.payload) {
        state.score.scorePartwise.part[measure.partIndex].measure[measure.measureIndex].selected = true;
      }

      state.selectedMeasures = action.payload;

      return state;
      // let newState = Object.assign({}, state, {
      //   selectedMeasures: action.payload
      // }); 
      // return newState; 
    }

    case scoreactions.SELECT_NOTES: {

      for (let note of state.selectedNotes) {
        state.score.scorePartwise.part[note.partIndex].measure[note.measureIndex].note[note.noteIndex].selected = false;
      }

      for (let note of action.payload) {
        if (NoteUtils.noteExists(note, state.score)) {
          state.score.scorePartwise.part[note.partIndex].measure[note.measureIndex].note[note.noteIndex].selected = true;
        }

      }

      state.selectedNotes = action.payload;
      return state;
      // return Object.assign({}, state, {
      //   selectedNotes: action.payload
      // });
    }

    case scoreactions.INSERT_NOTE: {
      let score = state.score;
      let oldNote = score.scorePartwise.part[action.payload.partIndex].measure[action.payload.measureIndex].note[action.payload.noteIndex];
      let note = Object.assign({}, oldNote, {
        defaultX: oldNote.defaultX + 20
      });
      state.score.scorePartwise.part[action.payload.partIndex].measure[action.payload.measureIndex].note.splice(action.payload.noteIndex, 0, note);
      return Object.assign({}, state, {
        store: state.score
      });
    }

    case scoreactions.DELETE_NOTE: {
      let score = state.score;
      let measure = score.scorePartwise.part[action.payload.partIndex].measure[action.payload.measureIndex];

      let newMeasure = Object.assign({}, measure, {});
      newMeasure.note.splice(action.payload.noteIndex, 1);
      score.scorePartwise.part[action.payload.partIndex].measure.splice(action.payload.measureIndex, 1, newMeasure);

      return Object.assign({}, state, {
        score: score
      });
    }

    case scoreactions.INSERT_MEASURE: {
      let score = state.score;
      let measure = score.scorePartwise.part[action.payload.partIndex].measure[action.payload.measureIndex];
      state.score.scorePartwise.part[action.payload.partIndex].measure.splice(action.payload.measureIndex, 0, measure);
      return Object.assign({}, state, {
        store: state.score
      });
    }

    case scoreactions.DELETE_MEASURE
      : {
        let score = state.score;
        let part = score.scorePartwise.part[action.payload.partIndex];

        let newPart = Object.assign({}, part, {});
        newPart.measure.splice(action.payload.measureIndex, 1);
        score.scorePartwise.part.splice(action.payload.partIndex, 1, newPart);

        return Object.assign({}, state, {
          score: score
        });
      }

    case scoreactions.LOAD_SCORE: {
      state.score = action.payload;
      return state;
    }

    case scoreactions.SELECT_MODE: {
      let mode = action.payload;
      console.log("switching mode to " + mode);
      return Object.assign({}, state, {
        mode: mode
      });
    }

    default: {
      return state;
    }
  }
}

export type ModeType = "Part" | "Measure" | "Note";
//   = ScoreModeType
//   | MeasureModeType
//   | NoteModeType


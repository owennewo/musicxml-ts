import * as musicxml from '../xmlns/www.musicxml.org'


export class NoteUtils {
    static NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

    static parsePitch(pitchCode: string): musicxml.pitch {
        let pitch = new musicxml.pitch();
        pitch.step = <musicxml.step>pitchCode.charAt(0);
        pitch.octave = +pitchCode.charAt(1);
        return pitch;
    }

    static increasePitch(pitch: musicxml.pitch) {

        let nextIndex = NoteUtils.NOTES.indexOf(pitch.step) + 1;
        let nextOctave = pitch.octave;
        if (nextIndex > 6) {
            nextIndex = 0;
            nextOctave = nextOctave + 1;
        }
        let nextStep = NoteUtils.NOTES[nextIndex];
        pitch.step = <musicxml.step>nextStep;
        pitch.octave = nextOctave;
    }

    static decreasePitch(pitch: musicxml.pitch) {

        let nextIndex = NoteUtils.NOTES.indexOf(pitch.step) - 1;
        let nextOctave = pitch.octave;
        if (nextIndex < 0) {
            nextIndex = 6;
            nextOctave = nextOctave - 1;
        }
        let nextStep = NoteUtils.NOTES[nextIndex];
        pitch.step = <musicxml.step>nextStep;
        pitch.octave = nextOctave;
    }

    static noteExists(note, score) {
        if (note.partIndex < 0 || note.partIndex >= score.scorePartwise.part.length) {
            return false;
        } else if (note.measureIndex < 0 || note.measureIndex >= score.scorePartwise.part[note.partIndex].measure.length) {
            return false;
        } else if (note.noteIndex < 0 || note.noteIndex >= score.scorePartwise.part[note.partIndex].measure[note.measureIndex].note.length) {
            return false;
        } else {
            return true;
        }

    }

    // static fixMeasure(measure: musicxml.ScorePartwiseTypePartTypeMeasureType) {

    // }

} 
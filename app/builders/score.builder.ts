import * as musicxml from '../xmlns/www.musicxml.org'
import { NoteUtils } from './note.utils';

export class ScoreBuilder {

    score: musicxml.document;
    //score: musicxml.ScorePartwiseType;
    currentPart: musicxml.ScorePartwiseTypePartType;
    currentMeasure: musicxml.ScorePartwiseTypePartTypeMeasureType;
    currentNote: musicxml.note;

    constructor() {

    }

    scorePartwise() {
        //this.score = {};
        this.currentNote = new musicxml.note();

        this.score = <musicxml.document>{};

        // duck typing!!
        this.score.scorePartwise = <musicxml.ScorePartwiseType>{ part: [] };
        ///this.score.scorePartwise = new musicxml.ScorePartwiseType();
        return this;
    }

    part() {
        if (!this.score) throw "can't add measure before scorePartwise()";
        this.currentPart = <musicxml.ScorePartwiseTypePartType>{ measure: [] };
        this.score.scorePartwise.part.push(this.currentPart);
        return this;
    }

    measure(newSytem: boolean = false) {
        if (!this.part) throw "can't add measure before part()";
        this.currentMeasure = <musicxml.ScorePartwiseTypePartTypeMeasureType>{ note: [], attributes: [], direction: [], barline: [], print: [] };
        if (newSytem) {
            this.currentMeasure.print.push(<musicxml.print>{ newSystem: "yes" })
        }
        this.currentPart.measure.push(this.currentMeasure);
        return this;
    }

    measureAttributes(clefSign: string = 'F', fifths: number = 0) {
        let attribute = <musicxml.attributes>{ clef: [], key: [] };
        let clef = <musicxml.clef>{ sign: clefSign };
        if (fifths != 0) {
            attribute.key.push(<musicxml.key>{ "fifths": fifths });
        }
        attribute.clef.push(clef);
        this.currentMeasure.attributes.push(attribute);
        return this;
    }

    measureDirection(words: string, placement: musicxml.aboveBelow = "above") {
        if (!this.currentMeasure) throw "Can't add direction if measure hasn't been created";
        let direction = <musicxml.direction>{ directionType: [] };
        direction.placement = placement;
        let formattedText = <musicxml.formattedText>{};
        formattedText.content = words;
        formattedText.defaultX = -46;
        formattedText.defaultY = 37;
        let directionType = <musicxml.directionType>{ "words": [formattedText] };
        direction.directionType.push(directionType);
        this.currentMeasure.direction.push(direction);
        return this;
    }

    measureBarline() {
        if (!this.currentMeasure) throw "Can't add barline if measure hasn't been created";
        let barline = <musicxml.barline>{ location: 'right', barStyle: { content: 'light-light' } };
        this.currentMeasure.barline.push(barline);
        return this;
    }

    note(pitch: string, noteType: musicxml.noteTypevalue = "quarter", dotted: boolean = false, stemValue: musicxml.stemValue = "up"): ScoreBuilder {
        if (!this.currentMeasure) throw "Can't add note if measure hasn't been created";
        let n = <musicxml.note>{ pitch: [] };

        n.type = new musicxml.noteType();
        n.type.content = noteType

        n.pitch.push(NoteUtils.parsePitch(pitch));

        if (dotted) {
            n.dot = [new musicxml.emptyPlacement()];
        }
        if (noteType != 'whole') {
            n.stem = new musicxml.stem();
            n.stem.content = stemValue;
        }

        this.currentMeasure.note.push(n);

        return this;
    }

    rest(noteType: musicxml.noteTypevalue = "quarter", dotted: boolean = false): ScoreBuilder {
        if (!this.currentMeasure) throw "Can't add note if measure hasn't been created";
        let n = <musicxml.note>{ rest: [] };

        n.rest.push(new musicxml.rest());
        n.type = new musicxml.noteType();
        n.type.content = noteType

        if (dotted) {
            n.dot = [new musicxml.emptyPlacement()];
        }

        this.currentMeasure.note.push(n);

        return this;
    }

    build(): musicxml.document {
        let returnScore = this.score;
        return returnScore;
    }


}
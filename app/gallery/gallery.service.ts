import * as musicxml from '../xmlns/www.musicxml.org';
import { ScoreBuilder } from "../builders/score.builder";
import { Injectable } from "@angular/core";
import { GallerySection } from "./section/gallery.section.model";

@Injectable()
export class GalleryService {

    builder: ScoreBuilder;

    constructor() {
        this.builder = new ScoreBuilder();
    }


    sections(): GallerySection[] {
        let sections = [];
        sections.push(this.sectionTrebleClef());
        sections.push(this.sectionBassClef());
        sections.push(this.sectionTrebleRests());
        sections.push(this.sectionBassRests());
        sections.push(this.sectionKeySignature());

        return sections;
    }

    sectionTrebleClef(): GallerySection {
        let section = new GallerySection("Treble Clef");

        section.scores = <musicxml.document[]>[];

        let score = this.builder.scorePartwise().part()
            .measure()
            .measureAttributes("G")
            .measureDirection("empty")
            .measure()
            //.measureAttributes()
            .measureDirection("middle c")
            .note('C4', "whole")
            .measure()
            .measureDirection("scale")
            .note('C4', "quarter")
            .note('D4', "quarter")
            .note('E4', "quarter")
            .note('F4', "quarter")
            .note('G4', "quarter")
            .note('A4', "quarter")
            .note('B4', "quarter")
            .note('C5', "quarter")
            .measureBarline()
            .build();

        section.scores.push(score);
        return section;

    }

    sectionKeySignature(): GallerySection {
        let section = new GallerySection("KeySignature");

        section.scores = <musicxml.document[]>[];

        let score = this.builder.scorePartwise().part()
            .measure()
            .measureAttributes("G", 0)
            .measureDirection("KEY=C")
            .measure()
            .measureAttributes("G", 1)
            .measureDirection("KEY=G")
            .measure()
            .measureAttributes("G", 2)
            .measureDirection("KEY=D")
            .measure()
            .measureAttributes("G", 3)
            .measureDirection("KEY=A")
            .measure()
            .measureAttributes("G", 4)
            .measureDirection("KEY=E")
            .measure()
            .measureAttributes("G", 5)
            .measureDirection("KEY=B")
            .measure()
            .measureAttributes("G", 6)
            .measureDirection("KEY=F#")
            .measure()
            .measureAttributes("G", 7)
            .measureDirection("KEY=C#")

            .measure(true)
            .measureAttributes("G", 0)
            .measureDirection("KEY=C")
            .measure()
            .measureAttributes("G", -1)
            .measureDirection("KEY=F")
            .measure()
            .measureAttributes("G", -2)
            .measureDirection("KEY=Bb")
            .measure()
            .measureAttributes("G", -3)
            .measureDirection("KEY=Eb")
            .measure()
            .measureAttributes("G", -4)
            .measureDirection("KEY=Ab")
            .measure()
            .measureAttributes("G", -5)
            .measureDirection("KEY=Db")
            .measure()
            .measureAttributes("G", -6)
            .measureDirection("KEY=Gb")
            .measure()
            .measureAttributes("G", -7)
            .measureDirection("KEY=Cb")

            .measure(true)
            .measureAttributes("F", 0)
            .measureDirection("KEY=C")
            .measure()
            .measureAttributes("F", 1)
            .measureDirection("KEY=G")
            .measure()
            .measureAttributes("F", 2)
            .measureDirection("KEY=D")
            .measure()
            .measureAttributes("F", 3)
            .measureDirection("KEY=A")
            .measure()
            .measureAttributes("F", 4)
            .measureDirection("KEY=E")
            .measure()
            .measureAttributes("F", 5)
            .measureDirection("KEY=B")
            .measure()
            .measureAttributes("F", 6)
            .measureDirection("KEY=F#")
            .measure()
            .measureAttributes("F", 7)
            .measureDirection("KEY=C#")

            .measure(true)
            .measureAttributes("F", 0)
            .measureDirection("KEY=C")
            .measure()
            .measureAttributes("F", -1)
            .measureDirection("KEY=F")
            .measure()
            .measureAttributes("F", -2)
            .measureDirection("KEY=Bb")
            .measure()
            .measureAttributes("F", -3)
            .measureDirection("KEY=Eb")
            .measure()
            .measureAttributes("F", -4)
            .measureDirection("KEY=Ab")
            .measure()
            .measureAttributes("F", -5)
            .measureDirection("KEY=Db")
            .measure()
            .measureAttributes("F", -6)
            .measureDirection("KEY=Gb")
            .measure()
            .measureAttributes("F", -7)
            .measureDirection("KEY=Cb")
            .build();
        section.scores.push(score);
        console.log(score);
        return section;

    }

    sectionBassClef(): GallerySection {
        let section = new GallerySection("Bass Clef");

        section.scores = <musicxml.document[]>[];

        let score = this.builder.scorePartwise().part()
            .measure()
            .measureAttributes()
            .measureDirection("empty")
            .measure()
            //.measureAttributes()
            .measureDirection("middle c")
            .note('C4', "whole")

            .measure()
            .measureDirection("scale")
            .note('C3', "quarter")
            .note('D3', "quarter")
            .note('E3', "quarter")
            .note('F3', "quarter")
            .note('G3', "quarter")
            .note('A3', "quarter")
            .note('B3', "quarter")
            .note('C4', "quarter")
            .measureBarline()
            .build();
        section.scores.push(score);
        return section;

    }

    sectionBassRests(): GallerySection {
        let section = new GallerySection("Bass Rests");

        section.scores = <musicxml.document[]>[];

        let score = this.builder.scorePartwise().part()
            .measure()
            .measureAttributes()
            .measureDirection("empty")
            .measure()
            .measureDirection("whole")
            .rest("whole")
            .measure()
            .measureDirection("half")
            .rest("half")
            .rest("half")
            .measure()
            .measureDirection("quarter")
            .rest("half")
            .rest("quarter")
            .rest("quarter")
            .measure()
            .measureDirection("eighth")
            .rest("half")
            .rest("quarter")
            .rest("eighth")
            .rest("eighth")
            .measure()
            .measureDirection("16th")
            .rest("half")
            .rest("quarter")
            .rest("eighth")
            .rest("16th")
            .rest("16th")
            .measure()
            .measureDirection("32nd")
            .rest("half")
            .rest("quarter")
            .rest("eighth")
            .rest("16th")
            .rest("32nd")
            .rest("32nd")
            .measureBarline()
            .build();
        section.scores.push(score);
        return section;

    }

    sectionTrebleRests(): GallerySection {
        let section = new GallerySection("Treble Rests");

        section.scores = <musicxml.document[]>[];

        let score = this.builder.scorePartwise().part()
            .measure()
            .measureAttributes("G")
            .measureDirection("empty")
            .measure()
            .measureDirection("whole")
            .rest("whole")
            .measure()
            .measureDirection("half")
            .rest("half")
            .rest("half")
            .measure()
            .measureDirection("quarter")
            .rest("half")
            .rest("quarter")
            .rest("quarter")
            .measure()
            .measureDirection("eighth")
            .rest("half")
            .rest("quarter")
            .rest("eighth")
            .rest("eighth")
            .measure()
            .measureDirection("16th")
            .rest("half")
            .rest("quarter")
            .rest("eighth")
            .rest("16th")
            .rest("16th")
            .measure()
            .measureDirection("32nd")
            .rest("half")
            .rest("quarter")
            .rest("eighth")
            .rest("16th")
            .rest("32nd")
            .rest("32nd")
            .measureBarline()
            .build();
        section.scores.push(score);
        return section;

    }


}


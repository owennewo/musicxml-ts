import * as musicxml from '../../xmlns/www.musicxml.org';

export class GallerySection {

    name: string;
    scores: musicxml.document[] = [];

    constructor(name: string, scores?: musicxml.document[]) {
        this.name = name;
        if (scores) {
            this.scores = scores;
            
        }
    }

}
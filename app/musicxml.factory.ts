import * as musicxml from './xmlns/www.musicxml.org'

export class MusicXmlFactory {
    static createNote(noteType: musicxml.noteTypevalue, dotted?: boolean, stemValue?: musicxml.stemValue  ): musicxml.note {
        let n = new musicxml.note();
        
        n.type = new musicxml.noteType();
        n.type.content = noteType 
        
        if (dotted) {
            n.dot = [new musicxml.emptyPlacement()];
        }
        if (noteType != 'whole') {
            n.stem = new musicxml.stem();
            n.stem.content = stemValue;
        }
        
        return n;
    }
}
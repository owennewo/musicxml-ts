export class Note {
    
    static STEPS = [ 'C', 'D', 'E', 'F', 'G', 'A', 'B'];

    static C4 = new Note('C4');

    step: string;
    octave: number;
    stepIndex: number; // this is octave * 8 + step
    stepOctaveIndex: number;
    code: string;

    constructor(code: string, octave?: any) {
        if (octave) {
            code = code + octave;
        } 
        this.code = code;
        this.step = code[0];
        this.octave = +code[1];
        
        this.stepIndex = Note.STEPS.indexOf(this.step);
        this.stepOctaveIndex = this.octave * 7 + this.stepIndex;

    }


}
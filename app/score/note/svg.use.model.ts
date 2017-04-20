export class SvgUse {
    linkId: string;
    x: number;
    y: number;
    
    constructor(linkId: string, x: number = 0, y: number = 0) {
        this.linkId = '/notation.svg#' + linkId;
        this.x = x;
        this.y = y;
    }
}
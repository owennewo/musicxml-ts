import * as Primitive from '../../../xml-primitives';

// Source files:
// http://www.musicxml.org/xsd/xml.xsd


interface BaseType {
	_exists: boolean;
	_namespace: string;
}
export type LangType = string;
type _LangType = Primitive._string;

export type SpaceType = ("default" | "preserve");
interface _SpaceType extends Primitive._string { content: SpaceType; }

export interface document extends BaseType {
}
export var document: document;

//declare module 'vanil-stopwatch-js';
type Template = {
    tag: string,
    cls: string|string[],
    attrs?:Object,
    content?: string|Template|Template[] 
}
type CardResult = {fistCard?:String,secondCard?:String}
type Time = {min?:String,sek?:String}
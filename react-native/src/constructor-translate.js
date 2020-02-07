export class Translation {
    constructor(text,newText){
        this.id = Date.now();
        this.text = text;
        this.translatedText = newText;
    }
}
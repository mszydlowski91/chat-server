
export class Message {
    type: string;
    text: string;
    author: string;

    constructor(type: string, text: string, author: string) {
        this.type = type;
        this.text = text;
        this.author = author;
    }
}
export class Message {
    constructor(
        public text: string,
        public timestamp: Date,
        public user: string,
        public session_id: number
    ) {
        
    }
}
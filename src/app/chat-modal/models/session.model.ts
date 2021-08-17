export class Session {
    constructor(
        public channel_id: string,
        public channel_name: string,
        public is_active: boolean,
        public name: string,
        public session_id: number,
        public text: string
    ) {}
}
export type Session = {
    telegramId: string;
    password: string;
    token: string;
    createdAt: string;
}

export default class SessionStorage {
    private static storage: Session;

    static saveSession(session: Session) {
        SessionStorage.storage = session;
    }

    static getToken() {
        return SessionStorage.storage.token;
    }

    static getSession(){
        return SessionStorage.storage;
    }
};
import { json } from '@sveltejs/kit';
import jwt from 'jsonwebtoken'
import SessionStorage, { Session } from '../storage';

type SignUp = {
    telegramID: string;
    password: string;
}

function generateToken (telegramId: string, password: string, createdAt: string): string {
    return jwt.sign({ telegramId, password}, `${createdAt}`);
}

function saveSession(telegramId: string, password: string){
    const createdAt= new Date().toUTCString();
    const token = generateToken(telegramId, password, createdAt);
    const session: Session = {token, telegramId, password, createdAt };
    SessionStorage.saveSession(session);
}

export async function POST({ request }) {
    const body: SignUp = await request.json();
    saveSession(body.telegramID, body.password);
    return json({ token: SessionStorage.getToken() }, { status: 201 });
}
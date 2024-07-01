import { json } from '@sveltejs/kit';
import SessionStorage, { Session } from '../../storage';
import type { Login } from '$lib';


function doLogin(login:Login): boolean {
    const session  =  SessionStorage.getSession();
    if (!session) return false;
    if (session.telegramId === login.telegramID && session.password === login.password) {
        return true;
    }
    return false;
}

export async function POST({ request }) {
    const login: Login = await request.json();
    const authorised = doLogin(login);
    const code = authorised && 201 || 401
    return json({ authorised }, { status: code });
}
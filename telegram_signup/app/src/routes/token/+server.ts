import { json } from '@sveltejs/kit';
import jwt from 'jsonwebtoken'
import SessionStorage from '../../storage';
import type { ValidationResponse } from '$lib';


function validate(token:string): ValidationResponse | null {
    const session = SessionStorage.getSession();
    const valid  =  jwt.verify(token, session.createdAt);
    if (valid) {
        return {telegramID: session.telegramId, createdAt: session.createdAt}
    }
    return null;
}

export async function POST({ request }) {
    const token: string = await request.json();
    console.log('token: ', token)
    const validationResponse = validate(token);
    console.log('validationResponse: ', validationResponse)
    const code = validationResponse && 200 || 401
    return json({ validationResponse }, { status: code });
}
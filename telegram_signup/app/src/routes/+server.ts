import { json } from '@sveltejs/kit';

type Login = {
    telegramID: string;
    password: string;
}

var rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function() {
    return rand() + rand() + rand() + "-" + rand() + rand() + rand(); // to make it longer
};


export async function POST({ request }) {
    const body: Login = await request.json();
    return json({  }, { status: 201 });
}
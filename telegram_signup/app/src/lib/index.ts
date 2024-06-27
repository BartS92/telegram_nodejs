// place files you want to import through the `$lib` alias in this folder.
export type Login = {
    telegramID: string;
    password: string;
}

export type ValidationResponse = {
    telegramID: string;
    createdAt: string;
}
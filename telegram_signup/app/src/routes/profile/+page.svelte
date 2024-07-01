<style>
    form {
        border: 3px solid #f1f1f1;
        width: 500px;
        margin: 0 auto;
        margin-top: 5%;
    }

    /* Full-width inputs */
    input[type=text], input[type=password] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }

    /* Set a style for all buttons */
    button {
        background-color: #045faa;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
    }
    .login_disabled {
        background-color: #cbcdc5;
        cursor: not-allowed;
    }
</style>

<script>
    import { goto } from '$app/navigation';


    let telegramId='', password='', token = '';
    let isValid =  false;

    const handleLogin = async () => {
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ telegramID: telegramId, password: password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const { authorised } = await response.json();

        if (authorised) {
            isValid = true;
        }
        else {
            alert(`Telegram Id or Password is incorrect, please sign up again`);
            goto('/');
        }
    }

    const handleTokenVerification = async () => {
        const response = await fetch('/token', {
            method: 'POST',
            body: JSON.stringify(token),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const { validationResponse } = await response.json();

        if (validationResponse) {
            alert(`
            --------
            ${validationResponse.telegramID}
            *********
            Created: ${validationResponse.createdAt}
            --------
            `);
        }
        else {
            alert('token is invalid, sign up again');
            goto('/');
        }
    }
</script>


<form>
    <div class="container">
        <label ><b>Telegram id</b></label>
        <input type="text" placeholder="Enter Telegram id" required on:change={(e) => {telegramId = e.target.value}}>

        <label><b>Password</b></label>
        <input type="password" placeholder="Enter Password" required on:change={(e) => { password = e.target.value}}>
        {#if isValid}
            <label><b>Token</b></label>
            <input type="text" placeholder="Enter Token" required on:change={(e) => { token = e.target.value}}>
        {/if}
    </div>
    {#if isValid}
        <button class={!token.length ? 'login_disabled' : ''} disabled={!token.length} on:click={handleTokenVerification}>CHECK TOKEN</button>
        {:else}
        <button class={!telegramId.length || !password.length ? 'login_disabled' : ''} disabled={!telegramId.length || !password.length} on:click={handleLogin}>LOGIN</button>
    {/if}
</form>
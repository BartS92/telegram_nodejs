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
            isValid = true
        }
        else {
            goto('/');
        }
    }

    const handleTokenVerification = async () => {
        const response = await fetch('/token', {
            method: 'POST',
            body: JSON.stringify({ telegramID: telegramId, password: password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const { authorised } = await response.json();

        if (authorised) {
            isValid = true
        }
        else {
            console.log('redirect')
            goto('/');
        }
    }
</script>


<form>
    <div class="container">
        <label for="tlgid"><b>Telegram id</b></label>
        <input type="text" placeholder="Enter Telegram id" name="tlgid" required on:change={(e) => {telegramId = e.target.value}}>

        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required on:change={(e) => { password = e.target.value}}>
        {#if isValid}
            <label for="psw"><b>Token</b></label>
            <input type="text" placeholder="Enter Token" name="token" required on:change={(e) => { token = e.target.value}}>
        {/if}
    </div>
    {#if isValid}
        <button class={!token.length ? 'login_disabled' : ''} disabled={!token.length} on:click={handleTokenVerification}>CHECK TOKEN</button>
        {:else}
        <button class={!telegramId.length || !password.length ? 'login_disabled' : ''} disabled={!telegramId.length || !password.length} on:click={handleLogin}>LOGIN</button>
    {/if}

</form>
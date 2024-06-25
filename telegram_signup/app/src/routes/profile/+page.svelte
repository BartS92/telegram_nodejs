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
        background-color: #04AA6D;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
    }
</style>

<script>
    let count = 0;

    function handleLogin() {
        count += 1;
    }

</script>


<form>
    <div class="container">
        <label for="tlgid"><b>Telegram id</b></label>
        <input type="text" placeholder="Enter Telegram id" name="tlgid" required>

        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required>
    </div>
    <button>LOGIN</button>
</form>
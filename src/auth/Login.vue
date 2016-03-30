<template>
    <div class="login">
        <h2 class="header">Dolphin Operation</h2>
        <div class="input-field">
           <input id="username" name="username" type="text" v-model="credentials.username">
           <label for="username">Your user name</label>
        </div>
        <div class="input-field">
            <input id="password" name="password" type="password" v-model="credentials.password">
            <label for="password">Your user password</label>
        </div>
        <a class="waves-effect waves-light btn" @click="submit()">Login</a>
    </div>

</template>

<script>
import md5 from '../common/utils/md5.js'
import auth from '../auth/login.js'

export default {

    data() {
        return {
            credentials: {
                username: '',
                password: ''
            },
            error: ''
        }
    },
    methods: {
        submit() {
            var password = md5.hex_md5(this.credentials.password);

            var credentials = {
                user_name: this.credentials.username,
                password: password
            }

            auth.login(this, credentials, 'turbot_admin');
            
        }
    }

}
</script>
<style>

.login{
    position: absolute;
    top: 10%;
    left: 50%;
    text-align: center;
  transform: translateY(-10%);
  transform: translateX(-50%);

}
.login .header{
    margin-bottom: 15%;
}
</style>
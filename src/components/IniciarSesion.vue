<template>
<div>
    <nav class="blue"></nav>
    <div class="container center">
        <div class="row" style="margin:0,auto; width:50%;">
            <div class="col s12 m12 l12">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">Iniciar sesion</span>
                        <form id="inicioSesion" autocomplete="off" @submit.prevent="login">
                            <input type="email" name="email" placeholder="Correo electronico">
                            <input type="password" name="pass" placeholder="Password" required pattern="[A-Za-z0-9]{8,15}">
                            <input type="submit" value="Entrar" class="btn blue">
                        </form>
                    </div>
                    <div class="card-action">
                        <router-link to="/registro">Registrarse</router-link>
                    </div>
                    <!-- <input type="text" v-model="msg">
                    <button @click="guardar">guardar localStorage</button>-->
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'
export default {
    name: 'inicisrSesion',
    data() {
        return {
            msg: ''
        }
    },
    methods: {
        login() {
            if (this.email == '') {
                swal('debe indicar el correo');
            } else {

                const form = document.getElementById('inicioSesion')
                axios.post('http://localhost/api/Servicio/userLogin', new FormData(form))
                    .then(res => {
                        this.respuesta = res.data
                        if (res.data.res == 'success') {
                            this.$localStorage.set('token', JSON.stringify(res.data.token))
                            this.$router.push('inicio')
                        } else {
                            swal('Usuario y/o contraseña incorrectos')
                        }

                    })
            }

        },
        guardar() {
            alert('entro');
            // this.$localStorage.set('token', JSON.stringify(this.msg))//guardar storage
            // this.$localStorage.remove('token')//destruir storage
        },

    },
    created() {
        const token = JSON.parse(this.$localStorage.get('token'))
        if (token) {
            this.$router.push('inicio')
        }
    }
}
</script>

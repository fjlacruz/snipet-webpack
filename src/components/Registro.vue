<template>
<div>
    <nav class="blue"></nav>
    <div class="container center">

        <div class="row" style="margin:0,auto; width:50%;">
            <div class="col s12 m12 l12">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">Registro</span>
                        <form id="formRegistro" autocomplete="off" @submit.prevent="registro" enctype="multipart/form-data">
                            <input type="text" name="usuario" placeholder="Nombre de usuario" required pattern="[A-Za-z]{5,30}">
                            <input type="password" v-model="pass" name="pass" placeholder="Password" required pattern="[A-Za-z0-9]{8,15}">
                            <input type="password" v-model="passC" placeholder="Confirmar Password" required pattern="[A-Za-z0-9]{8,15}">
                            <input type="email" v-model="correo" name="email" placeholder="Correo electronico" @blur="validarCorreo" required>
                            <div class="file-field input-field">
                                <div class="btn">
                                    <span>Imagen de perfil</span>
                                    <input type="file" name="foto">
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text">
                                </div>
                            </div>

                            <input type="submit" value="Registrarse" :class="boton">
                        </form>
                    </div>
                    <div class="card-action">
                        <router-link to="/">Iniciar sesion</router-link>
                    </div>
                </div>
            </div>
        </div>
        <!--<h5>Res: {{ respuesta }}</h5>-->
    </div>
</div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'

export default {
    name: 'registro',
    data() {
        return {
            pass: '',
            passC: '',
            respuesta: '',
            correo: '',
            boton: 'btn blue disabled'
        }
    },
    methods: {
        registro() {
            if (this.pass == this.passC) {
                const form = document.getElementById('formRegistro');
                axios.post('http://localhost/snippetWebpack/api/loginRegistro/registro.php', new FormData(form))
                    .then(res => {
                        this.respuesta = res.data
                        this.direccionamiento()
                    })
            } else {
                swal('Las claves no son iguales');
            }
        },
        direccionamiento() {
            if (this.respuesta === 'success') {
                this.$router.push('/')
            } else {
                swal('No se pudo registrar');
            }
        },
        validarCorreo() {
            if (this.validEmail(this.correo)) {
                const formData = new FormData()
                formData.append('correo', this.correo)
                axios.post('http://localhost/snippetWebpack/api/loginRegistro/validarEmail.php', formData)
                    .then(res => {
                        this.respuesta = res.data
                        if (res.data === 'success') {
                            this.boton = 'btn blue'
                        } else {
                            swal('El correo ya existe');
                            this.correo = '';
                        }

                    })
            } else {
                swal('Direccion de correo no valida');
            }
        },
        validEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
}
</script>

<template>
<div>
    <cabecera></cabecera>
    <div class="container center">

        <div class="row" style="margin:0,auto; width:80%;">
            <div class="col s12 m12 l12">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">Postea tu codigo</span>
                        <form id="altaPost" autocomplete="off" @submit.prevent="alta">
                            <input type="text" name="titulo" placeholder="Titulo" required>
                            <textarea name="codigo" placeholder="Escribe tu codigo" class="materialize-textarea" cols="30" rows="10"></textarea>
                            <textarea name="descripcion" placeholder="Escribe tu descripcion" class="materialize-textarea" cols="30" rows="10"></textarea>
                            <select name="categoria" class="browser-default" required>
                                <option value="" disabled selected>Escoge una opcion</option>
                                <option value="php">PHP</option>
                                <option value="css">CSS</option>
                                <option value="html5">HTML5</option>
                                <option value="mysql">MYSQL</option>
                                <option value="vue">VUE</option>
                            </select>
                            <input type="hidden" name="token" :value="token">
                            <input type="submit" value="Guardar" class="btn blue">
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Cabecera from './Cabecera'
import sesion from '../mixins/sesion.js'
import axios from 'axios'
import swal from 'sweetalert'

export default {
    name: 'alta',
    computed:{
        token(){
            return JSON.parse(this.$localStorage.get('token'))
        }
    },
    methods:{
        alta() {
            const form = document.getElementById('altaPost');
            axios.post('http://localhost/snippetWebpack/api/crud/altaPost.php', new FormData(form))
                .then(res => {
                    this.respuesta = res.data
                    if (res.data == 'success') {
                        swal({
                            title: 'Buen Trabajo',
                            text: 'Post guardado',
                            icon: 'success',
                            button: 'ok'
                        })
                        form.reset();
                        this.$router.push('/')
                    } else {
                        swal({
                            title: 'Error..!!!',
                            text: 'No se pudo guardar el Post',
                            icon: 'error',
                            button: 'ok'
                        });
                    }
                })
        }
    },
    components: {
        Cabecera
    },
    mixins:[sesion]
}
</script>

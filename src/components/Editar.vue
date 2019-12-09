<template>
<div>
    <cabecera></cabecera>
    <div class="container center">

        <div class="row" style="margin:0,auto; width:80%;">
            <div class="col s12 m12 l12">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">Editar post</span>
                        <form id="editarPost" autocomplete="off" @submit.prevent="editar">
                            <input type="text" name="titulo" placeholder="Titulo" required :value="formEditar.titulo">
                            <textarea name="codigo" placeholder="Escribe tu codigo" class="materialize-textarea" cols="30" rows="10" :value="formEditar.codigo"></textarea>
                            <textarea name="descripcion" placeholder="Escribe tu descripcion" class="materialize-textarea" cols="30" rows="10" :value="formEditar.descripcion"></textarea>
                            <select name="categoria" class="browser-default" required>
                                <option :value="formEditar.categoria" v-text="formEditar.categoria"></option>
                                <option value="php">PHP</option>
                                <option value="css">CSS</option>
                                <option value="html5">HTML5</option>
                                <option value="mysql">MYSQL</option>
                                <option value="vue">VUE</option>
                            </select>
                            <input type="hidden" name="id" :value="$route.params.id">
                            <input type="submit" value="Editar" class="btn blue">
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
    name: 'editar',
    data() {
        return {
            formEditar: {}
        }
    },
    computed: {
        token() {
            return JSON.parse(this.$localStorage.get('token'))
        }
    },
    methods: {
        getId() {
            const id = this.$route.params.id
            axios.get('http://localhost/snippetWebpack/api/crud/getId.php?id=' + id)
                .then(res => {
                    this.formEditar = res.data
                })
        },
        editar() {
            const form = document.getElementById('editarPost')
            axios.post('http://localhost/snippetWebpack/api/crud/editarPost.php', new FormData(form))
                .then(res => {
                    this.respuesta = res.data
                    if (res.data == 'success') {

                        swal({
                            title: 'Buen Trabajo',
                            text: 'Post guardado',
                            icon: 'success',
                            button: 'ok',
                            position: 'top-end',
                        })
                        this.$router.push('/')
                    } else {
                        swal('El post no se pudo editar')
                    }
                })
        }
    },
    components: {
        Cabecera
    },
    created() {
        this.getId()
    },
    mixins: [sesion]
}
</script>

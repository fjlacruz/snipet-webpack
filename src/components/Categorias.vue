<template>
<div>
    <cabecera></cabecera>
    <nav>
        <div class="nav-wrapper indigo lighten-5">
            <form>
                <div class="input-field">
                    <input id="search" type="search" v-model="buscar" required>
                    <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                    <i class="material-icons">close</i>
                </div>
            </form>
        </div>
    </nav>

    <div class="container">

        <div class="row" v-for="item in datosFiltrados" :key="item.id">
            <div class="col s12 m12 l12">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title"><img :src="item.foto" :alt="item.foto" width="50" class="circle"> {{item.user}}</span>
                        <span class="card-title">{{item.titulo}}</span>
                        <pre :id="'copy' + item.id ">
                        {{item.codigo}}
                        </pre>
                        <p>{{item.descripcion}}</p>
                    </div>
                    <div class="card-action">
                        <router-link v-if="item.user == userPost" :to="'/editar/'+item.id">EDITAR</router-link>
                        <a v-if="item.user == userPost" href="#" @click="eliminar(item.id)">ELIMINAR</a>
                        <button v-clipboard="item.codigo">COPIAR</button>
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
import eliminar from '../mixins/eliminar.js'
import axios from 'axios'
import swal from 'sweetalert'

export default {
    name: 'categorias',
    data() {
        return {
            respuesta: '',
            listar: [],
            buscar: '',
            userPost: ''
        }
    },
    created() {
        this.getUser();
        this.getCategoria();
    },
    beforeRouteUpdate(to, from, next) { //para detectar cambios en las rutas y hacer un tipo refresh
        next()
        this.getCategoria();
    },
    computed: {
        datosFiltrados() {
            return this.listar.filter((filtro) => {
                return filtro.titulo.toUpperCase().match(this.buscar.toUpperCase()) || filtro.descripcion.toUpperCase().match(this.buscar.toUpperCase())
            })
        }
    },
    methods: {
        getUser() {
            const token = JSON.parse(this.$localStorage.get('token'))
            axios.get('http://localhost/snippetWebpack/api/crud/getUser.php?token=' + token)
                .then(res => {
                    this.userPost = res.data
                })
        },
        getCategoria() {
            const cat = this.$route.params.cat
            axios.get('http://localhost/snippetWebpack/api/crud/getCategoria.php?cat=' + cat)
                .then(res => {
                    this.listar = res.data
                    if(this.listar != ''){
                       this.listar = res.data
                    }else{
                       swal ('No Hay Registros');
                    }
                })
        }
    },
    components: {
        Cabecera
    },
    mixins: [sesion,eliminar]
}
</script>

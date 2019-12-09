<template>
<div>
    <cabecera></cabecera>
    <div class="container" style="margin:0,auto; width:60%;">
        <h4>Buscador</h4>
        <input type="text" v-model="buscar" @keyup.enter="buscarDatos">
        <button class="btn blue" @click="buscarDatos">Buscar</button><br>
        <button class="btn blue" @click="mostrarDiv">div 2</button><br>

        <div v-if="mostrar==1" class="container" style="margin:0,auto; width:30%;">
         id:{{id}}   id:{{id}} usuario:{{user}} titulo.{{titulo}} codigo:{{codigo}} foto:<img :src="foto" :alt="foto" width="50" class="circle">
            <input type="text" :value="id">
               </div>
        <div v-if="mostrar==2">segundo div</div>
        <div v-show="mensaje" align="center">
            <img src="https://127.0.0.1/casa_cambio/application/recursos/imagenes/loader1.gif">
            Cargando...!!!
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
    name: 'buscador',
    data() {
        return {
            buscar: '',
            id: '',
            user: '',
            titulo: '',
            codigo: '',
            descripcion: '',
            foto: '',
            mostrar: 0,
            mensaje :false
        }
    },
    created() {

    },


    methods: {
        buscarDatos() {
            if (this.buscar != '') {
                this.mensaje = true
                axios.post('http://localhost/snippetWebpack/api/crud/buscador.php?titulo=' + this.buscar)
                    .then(res => {
                        this.respuesta = res.data
                        if (res.data == null) {
                            swal('Sin informacion')
                            this.buscar = ''
                            this.mostrar = 0
                            this.mensaje = false
                        } else {
                            this.mostrar = 1
                            this.id = res.data.id
                            this.user = res.data.user
                            this.titulo = res.data.titulo
                            this.codigo = res.data.codigo
                            this.descripcion = res.data.descripcion
                            this.foto = res.data.foto
                            this.mensaje = false
                        }
                    })
            } else {
                swal('ingrese un dato a buscar')
                this.mostrar = 0
                this.mensaje = false
            }
        },
        mostrarDiv() {
            this.mostrar = 2
        }
    },

    components: {
        Cabecera
    },
    mixins: [sesion, eliminar],

}
</script>

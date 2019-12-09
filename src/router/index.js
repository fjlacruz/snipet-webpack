import Vue from 'vue'
import Router from 'vue-router'
import IniciarSesion from '@/components/IniciarSesion'
import Registro from '@/components/Registro'
import Inicio from '@/components/Inicio'
import Categorias from '@/components/Categorias'
import Alta from '@/components/Alta'
import Editar from '@/components/Editar'
import Buscador from '@/components/Buscador'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'IniciarSesion',
            component: IniciarSesion
        },
        {
            path: '/registro',
            name: 'Registro',
            component: Registro
        },
        {
            path: '/inicio',
            name: 'Inicio',
            component: Inicio
        },
        {
            path: '/categorias/:cat',
            name: 'Categorias',
            component: Categorias
        },
        {
            path: '/alta',
            name: 'Alta',
            component: Alta
        },
        {
            path: '/editar/:id',
            name: 'Editar',
            component: Editar
        },
        {
            path: '/buscador',
            name: 'Buscador',
            component: Buscador
        }
    ]
})
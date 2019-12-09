import axios from 'axios'
import swal from 'sweetalert'

export default {
    methods: {
        eliminar(id) {
            swal({
                    title: 'Seguro que deseas eliminar el post',
                    text: 'Al eliminarlo no podras recuperarlo',
                    icon: 'warning',
                    buttons: true,
                    dangerMode: true,
                })
                .then((aceptar) => {
                    if (aceptar) {
                        axios.get('http://localhost/snippetWebpack/api/crud/eliminar.php?id=' + id)
                            .then(res => {
                                if (res.data == 'success') {
                                    swal({
                                        title: 'Post Eliminado',
                                        text: 'El post ya fue eliminado de la lista',
                                        icon: 'success',
                                        button: 'ok'
                                    })
                                    this.getCategoria()
                                } else {
                                    swal({
                                        title: 'Post Eliminado',
                                        text: 'El post ya fue eliminado de la lista',
                                        icon: 'success',
                                        button: 'ok'
                                    })
                                }
                            })
                    } else {
                        return false
                    }
                })
        }
    }
}
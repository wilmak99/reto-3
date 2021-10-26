/**
 * Controlador de Mensajes
 * @author Ing William Mahecha
 * @version 1.0.0 2021
 */
 
/////*      Carga tabla con los datos de los Mensajes     */////
$.ajax({
    method: "GET",
    url: "http://localhost:8080/api/Message/all",
})
.done(function(data) {
    if (data.length > 0) {
        $.each(data, function(key, value) {
            $('#listMensajes').append('<tr align="center"><td>' + value['messageText'] + '</td><td>' + value['client']['name'] + '</td><td>' + value['motorbike']['brand'] + '</td><td><img src="img/editar.png" alt="editar" width="40" height="40" onclick="edMensaje(' + value['idMessage'] + ', this)"/> <img src="img/papelera.png" alt="eliminar" width="40" height="40" onclick="elMensaje(' + value['idMessage'] + ')" /></td></tr>')
        });
    } else {
        $('#listMensajes').append('<tr align="center"><td colspan="4"> No hay registros de Mensajes </td></tr>')
    }
})
.fail(function() {
})
.always(function() {
});

/////*      Registra un nuevo Mensaje     */////
$('#registroMensaje').on('submit', registro);
function registro(tag){
    tag.preventDefault(); // Prevenir evento.
    tag.stopPropagation(); // Prevenir propagación.
    var mensaje = {
        messageText: $("#mensaje").val(),
        motorbike: {
            id: $("#motocicleta").val(),
        },
        client: {
            idClient: $("#cliente").val(),
        }
    }
    var data = JSON.stringify(mensaje);
    $.ajax({
        data: data,
        url: "http://localhost:8080/api/Message/save",
        type:'POST',
        async: true,
        contentType:'application/json',
        success:function() {
            Swal.fire({
                text: "Mensaje Creado Correctamente",
                icon: 'success',
            }).then(() => {
                window.location.reload();
            });
        },
        error: function() {
            Swal.fire({
                text: 'No se pudo registrar el mensaje, por favor comunicarse con el administrador.',
                icon: 'error',
            })
        }
    });
}

/////*      Trae datos del mensaje Seleccionada     */////
function edMensaje(idMensaje, fila) {
    let seleccion = fila.parentElement.parentElement
    seleccion.remove();
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/Message/" + idMensaje,
    })
    .done(function(data) {
        $('#listMensajes').append('<tr align="center"><td><input type="text" value="' + data['messageText'] + '" id="editMensaje' + data['idMessage'] + '"</td><td><input type="text" value="' + data['client']['name'] + '" id="editClient' + data['idMessage'] + '"</td><td><input type="text" value="' + data['motorbike']['brand'] + '" id="editMotorbike' + data['idMessage'] + '"</td><td><img src="img/aceptar.png" alt="aceptar" width="40" height="40" onclick="editarMensaje(' + data['idMessage'] + ')"/></td></tr>')
    })
    .fail(function() {
    })
    .always(function() {
    });
};

/////*      Edita y actualizar el mensaje Seleccionado     */////
function editarMensaje(idMensaje) {
    Swal.fire({
        title: '<h5> ESTÁ SEGURO DE QUE DESEA ACTUALIZAR EL MENSAJE? </h5>',
        icon: "info",
        confirmButtonText: 'Aceptar',
        cancelButtonColor: '#d33',
        showCancelButton: true,
    }).then((result) => {
        if (result.value) {
            let mensaje = {
                id: idMensaje,
                messagetext:$("#editMensaje" + idMensaje).val(),
                motorbike: {
                    id: $("#editMotorbike" + idMensaje).val(),
                },
                client: {
                    idClient: $("#editClient" + idMensaje).val(),
                }
            }
            var data = JSON.stringify(mensaje);
            $.ajax({
                data: data,
                url: "http://localhost:8080/api/Message/update",
                type: 'PUT',
                async: true,
                contentType:'application/json',
                success: function() {
                    Swal.fire({
                        text: "Mensaje Actualizado Correctamente",
                        icon: 'success',
                    }).then(() => {
                        window.location.reload();
                    });
                },
                error: function(){
                    Swal.fire({
                        text: 'No se pudo actualizar el mensaje, por favor comunicarse con el administrador.',
                        icon: 'error',
                    })
                }
            });
        }
    });
};

/////*      Elimina el mensaje seleccionado     */////
function elMensaje(idMensaje) {
    Swal.fire({
        title: '<h5> ESTÁ SEGURO DE QUE DESEA ELIMINAR EL MENSAJE? </h5>',
        icon: "info",
        confirmButtonText: 'Aceptar',
        cancelButtonColor: '#d33',
        showCancelButton: true,
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: "http://localhost:8080/api/Message/" + idMensaje,
                type: 'DELETE',
                async: true,
                contentType:'application/json',
                success: function() {
                    Swal.fire({
                        text: "Mensaje Eliminado Correctamente",
                        icon: 'success',
                    }).then(() => {
                        window.location.reload();
                    });
                },
                error: function(){
                    Swal.fire({
                        text: 'No se pudo eliminar el mensaje, por favor comunicarse con el administrador.',
                        icon: 'error',
                    });
                }
            });
        }
    });
};
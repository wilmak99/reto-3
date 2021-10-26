/**
 * Controlador de Clientes
 * @author Ing William Mahecha
 * @version 1.0.0 2021
 */
 
/////*      Carga tabla con los datos de los Clientes     */////
$.ajax({
    method: "GET",
    url: "http://129.151.124.116:8080/api/Client/all",
})
.done(function(data) {
    if (data.length > 0) {
        $.each(data, function(key, value) {
            $('#listClientes').append('<tr align="center"><td>' + value['name'] + '</td><td>' + value['email'] + '</td><td>' + value['password'] + '</td><td>' + value['age'] + '</td><td><img src="img/editar.png" alt="editar" width="40" height="40" onclick="edCliente(' + value['idClient'] + ', this)"/> <img src="img/papelera.png" alt="eliminar" width="40" height="40" onclick="elCliente(' + value['idClient'] + ')" /></td></tr>')
        });
    } else {
        $('#listClientes').append('<tr align="center"><td colspan="5"> No hay registros de Clientes </td></tr>')
    }
})
.fail(function() {
})
.always(function() {
});

/////*      Registra un nuevo Cliente     */////
$('#registroClientes').on('submit', registro);
function registro(tag){
    tag.preventDefault(); // Prevenir evento.
    tag.stopPropagation(); // Prevenir propagación.
    var clientes = {
        name:$("#nombre").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        age:$("#edad").val()
    }
    var data = JSON.stringify(clientes);
    $.ajax({
        data: data,
        url: "http://129.151.124.116:8080/api/Client/save",
        type:'POST',
        async: true,
        contentType:'application/json',
        success:function() {
            Swal.fire({
                text: "Cliente Creado Correctamente",
                icon: 'success',
            }).then(() => {
                window.location.reload();
            });
        },
        error: function() {
            Swal.fire({
                text: 'No se pudo registrar el cliente, por favor comunicarse con el administrador.',
                icon: 'error',
            })
        }
    });
}

/////*      Trae datos del Cliente Seleccionado     */////
function edCliente(idCliente, fila) {
    let seleccion = fila.parentElement.parentElement
    seleccion.remove();
    $.ajax({
        method: "GET",
        url: "http://129.151.124.116:8080/api/Client/" + idCliente,
    })
    .done(function(data) {
        $('#listClientes').append('<tr align="center"><td><input type="text" value="' + data['name'] + '" id="editName' + data['idClient'] + '"</td><td><input type="email" value="' + data['email'] + '" id="editEmail' + data['idClient'] + '"</td><td><input type="text" value="' + data['password'] + '" id="editPassword' + data['idClient'] + '"</td><td><input type="number" value="' + data['age'] + '" id="editAge' + data['idClient'] + '"</td><td><img src="img/aceptar.png" alt="aceptar" width="40" height="40" onclick="editarCliente(' + data['idClient'] + ')"/></td></tr>')
    })
    .fail(function() {
    })
    .always(function() {
    });
};

/////*      Edita y actualizar el cliente Seleccionado     */////
function editarCliente(idCliente) {
    Swal.fire({
        title: '<h5> ESTÁ SEGURO DE QUE DESEA ACTUALIZAR EL CLIENTE? </h5>',
        icon: "info",
        confirmButtonText: 'Aceptar',
        cancelButtonColor: '#d33',
        showCancelButton: true,
    }).then((result) => {
        if (result.value) {
            let cliente = {
                idClient: idCliente,
                name: $("#editName" + idCliente).val(),
                email: $("#editEmail" + idCliente).val(),
                password: $("#editPassword" + idCliente).val(),
                age: $("#editAge" + idCliente).val(),
            }
            var data = JSON.stringify(cliente);
            $.ajax({
                data: data,
                url: "http://localhost:8080/api/Client/update",
                type: 'PUT',
                async: true,
                contentType:'application/json',
                success: function() {
                    Swal.fire({
                        text: "Cliente Actualizado Correctamente",
                        icon: 'success',
                    }).then(() => {
                        window.location.reload();
                    });
                },
                error: function(){
                    Swal.fire({
                        text: 'No se pudo actualizar el cliente, por favor comunicarse con el administrador.',
                        icon: 'error',
                    })
                }
            });
        }
    });
};

/////*      Elimina el cliente seleccionada     */////
function elCliente(idCliente) {
    Swal.fire({
        title: '<h5> ESTÁ SEGURO DE QUE DESEA ELIMINAR EL CLIENTE? </h5>',
        icon: "info",
        confirmButtonText: 'Aceptar',
        cancelButtonColor: '#d33',
        showCancelButton: true,
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: "http://129.151.124.116:8080/api/Client/" + idCliente,
                type: 'DELETE',
                async: true,
                contentType:'application/json',
                success: function() {
                    Swal.fire({
                        text: "Cliente Eliminado Correctamente",
                        icon: 'success',
                    }).then(() => {
                        window.location.reload();
                    });
                },
                error: function(){
                    Swal.fire({
                        text: 'No se pudo eliminar el cliente, por favor comunicarse con el administrador.',
                        icon: 'error',
                    });
                }
            });
        }
    });
};
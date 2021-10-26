/**
 * Controlador de Clientes
 * @author Ing William Mahecha
 * @version 1.0.0 2021
 */
 
/////*      Carga tabla con los datos de las motocicletas     */////
$.ajax({
    method: "GET",
    url: "http://129.151.124.116:8080/api/Reservation/all",
})
.done(function(data) {
    if (data.length > 0) {
        $.each(data, function(key, value) {
            $('#listReservas').append('<tr align="center"><td>' + value['startDate'] + '</td><td>' + value['devolutionDate'] + '</td><td>' + value.client['name'] + '</td><td>' + value.motorbike['brand'] + '</td><td><img src="img/editar.png" alt="editar" width="40" height="40" onclick="edReserva(' + value['idReservation'] + ', this)"/> <img src="img/papelera.png" alt="eliminar" width="40" height="40" onclick="elReserva(' + value['idReservation'] + ')" /></td></tr>')
        });
    } else {
        $('#listReservas').append('<tr align="center"><td colspan="6"> No hay registros de reservas </td></tr>')
    }
})
.fail(function() {
})
.always(function() {
});

/////*      Registra una nueva reserva     */////
$('#registroReserva').on('submit', registro);
function registro(tag){
    tag.preventDefault(); // Prevenir evento.
    tag.stopPropagation(); // Prevenir propagación.
    var reserva = {
        startDate: $("#fechaInicio").val(),
        devolutionDate: $("#fechaFin").val(),
        client: {
            idClient: $("#cliente").val(),
        },
        motorbike: {
            id: $("#motocicleta").val(),
        },
    }
    var data = JSON.stringify(reserva);
    $.ajax({
        data: data,
        url: "http://129.151.124.116:8080/api/Reservation/save",
        type:'POST',
        async: true,
        contentType:'application/json',
        success:function() {
            Swal.fire({
                text: "Reserva Creada Correctamente",
                icon: 'success',
            }).then(() => {
                window.location.reload();
            });
        },
        error: function() {
            Swal.fire({
                text: 'No se pudo registrar la reservacion, por favor comunicarse con el administrador.',
                icon: 'error',
            })
        }
    });
}

/////*      Trae datos de la reserva Seleccionada      */////
function edReserva(idReserva, fila) {
    let seleccion = fila.parentElement.parentElement
    seleccion.remove();

    $.ajax({
        method: "GET",
        url: "http://129.151.124.116:8080/api/Reservation/" + idReserva,
    })
    .done(function(data) {
        var fechaInicio = data['startDate'];
        fechaInicio = fechaInicio.substr(0, 10);
        var fechaFin = data['devolutionDate'];
        fechaFin = fechaFin.substr(0, 10);
        $('#listReservas').append('<tr align="center"><td><input type="date" value="' + fechaInicio + '" id="editFechaInicio' + data['idReservation'] + '"</td><td><input type="date" value="' + fechaFin + '" id="editFechaFin' + data['idReservation'] + '"</td><td><input type="number" value="' + data['client']['idClient'] + '" id="editClient' + data['idReservation'] + '"</td><td><input type="number" value="' + data['motorbike']['id'] + '" id="editMotorbike' + data['idReservation'] + '"</td><td><img src="img/aceptar.png" alt="aceptar" width="40" height="40" onclick="editarReserva(' + data['idReservation'] + ')"/></td></tr>')
    })
    .fail(function() {
    })
    .always(function() {
    });
};

/////*      Edita y actualiza la reserva Seleccionada      */////
function editarReserva(idReserva) {
    Swal.fire({
        title: '<h5> ESTÁ SEGURO DE QUE DESEA ACTUALIZAR LA RESERVA? </h5>',
        icon: "info",
        confirmButtonText: 'Aceptar',
        cancelButtonColor: '#d33',
        showCancelButton: true,
    }).then((result) => {
        if (result.value) {
            let reserva = {
                idReservation: idReserva,
                startDate: $("#editFechaInicio" + idReserva).val(),
                devolutionDate: $("#editFechaFin" + idReserva).val(),
                client: {
                    idClient: $("#editClient" + idReserva).val(),
                },
                motorbike: {
                    id: $("#editMotorbike" + idReserva).val(),
                },
            }
            var data = JSON.stringify(reserva);
            $.ajax({
                data: data,
                url: "http://129.151.124.116:8080/api/Reservation/update",
                type: 'PUT',
                async: true,
                contentType:'application/json',
                success: function() {
                    Swal.fire({
                        text: "Reserva Actualizada Correctamente",
                        icon: 'success',
                    }).then(() => {
                        window.location.reload();
                    });
                },
                error: function(){
                    Swal.fire({
                        text: 'No se pudo actualizar la reserva, por favor comunicarse con el administrador.',
                        icon: 'error',
                    })
                }
            });
        }
    });
};


/////*      Elimina la reserva seleccionada     */////
function elReserva(idReserva) {
    Swal.fire({
        title: '<h5> ESTÁ SEGURO DE QUE DESEA ELIMINAR LA RESERVA? </h5>',
        icon: "info",
        confirmButtonText: 'Aceptar',
        cancelButtonColor: '#d33',
        showCancelButton: true,
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: "http://129.151.124.116:8080/api/Reservation/" + idReserva,
                type: 'DELETE',
                async: true,
                contentType:'application/json',
                success: function() {
                    Swal.fire({
                        text: "Reserva Eliminada Correctamente",
                        icon: 'success',
                    }).then(() => {
                        window.location.reload();
                    });
                },
                error: function(){
                    Swal.fire({
                        text: 'No se pudo eliminar la reserva, por favor comunicarse con el administrador.',
                        icon: 'error',
                    });
                }
            });
        }
    });
};
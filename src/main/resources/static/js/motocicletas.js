/**
 * Controlador de Clientes
 * @author Ing William Mahecha
 * @version 1.0.0 2021
 */
 
/////*      Carga tabla con los datos de las motocicletas     */////
$.ajax({
    method: "GET",
    url: "http://localhost:8080/api/Motorbike/all",
})
.done(function(data) {
    if (data.length > 0) {
        $.each(data, function(key, value) {
            $('#listMotocicletas').append('<tr align="center"><td>' + value['brand'] + '</td><td>' + value['year'] + '</td><td>' + value.category['name'] + '</td><td>' + value['name'] + '</td><td>' + value['description'] + '</td><td><img src="img/editar.png" alt="editar" width="40" height="40" onclick="edMoto(' + value['id'] + ', this)"/> <img src="img/papelera.png" alt="eliminar" width="40" height="40" onclick="elMoto(' + value['id'] + ')" /></td></tr>')
        });
    } else {
        $('#listMotocicletas').append('<tr align="center"><td colspan="6"> No hay registros de motocicletas </td></tr>')
    }
})
.fail(function() {
})
.always(function() {
});

/////*      Registra una nueva moto     */////
$('#registroMotos').on('submit', registro);
function registro(tag){
    tag.preventDefault(); // Prevenir evento.
    tag.stopPropagation(); // Prevenir propagación.
    var moto = {
        brand:$("#marca").val(),
        year:$("#modelo").val(),
        category: {
            id: $("#categoria").val(),
        },
        name:$("#nombre").val(),
        description:$("#descripcion").val(),
    }
    var data = JSON.stringify(moto);
    $.ajax({
        data: data,
        url: "http://localhost:8080/api/Motorbike/save",
        type:'POST',
        async: true,
        contentType:'application/json',
        success:function() {
            Swal.fire({
                text: "Motocicleta Creada Correctamente",
                icon: 'success',
            }).then(() => {
                window.location.reload();
            });
        },
        error: function() {
            Swal.fire({
                text: 'No se pudo registrar la moto, por favor comunicarse con el administrador.',
                icon: 'error',
            })
        }
    });
}

/////*      Trae datos de la motocicleta Seleccionado     */////
function edMoto(idMoto, fila) {
    let seleccion = fila.parentElement.parentElement
    seleccion.remove();

    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/Motorbike/" + idMoto,
    })
    .done(function(data) {
        $('#listMotocicletas').append('<tr align="center"><td><input type="text" value="' + data['brand'] + '" id="editBrand' + data['id'] + '"</td><td><input type="number" value="' + data['year'] + '" id="editModel' + data['id'] + '"</td><td><input type="number" value="' + data['category']['id'] + '" id="editCategory' + data['id'] + '"</td><td><input type="text" value="' + data['name'] + '" id="editName' + data['id'] + '"</td><td><input type="text" value="' + data['description'] + '" id="editDescription' + data['id'] + '"</td><td><img src="img/aceptar.png" alt="aceptar" width="40" height="40" onclick="editarMoto(' + data['id'] + ')"/></td></tr>')
    })
    .fail(function() {
    })
    .always(function() {
    });
};

/////*      Edita y actualizar el cliente Seleccionado     */////
function editarMoto(idMoto) {
    Swal.fire({
        title: '<h5> ESTÁ SEGURO DE QUE DESEA ACTUALIZAR LA MOTOCICLETA? </h5>',
        icon: "info",
        confirmButtonText: 'Aceptar',
        cancelButtonColor: '#d33',
        showCancelButton: true,
    }).then((result) => {
        if (result.value) {
            let moto = {
                id: idMoto,
                brand: $("#editBrand" + idMoto).val(),
                year: $("#editModel" + idMoto).val(),
                category: {
                    id: $("#editCategory" + idMoto).val(),
                },
                name: $("#editName" + idMoto).val(),
                description: $("#editDescription" + idMoto).val(),
            }
            var data = JSON.stringify(moto);
            $.ajax({
                data: data,
                url: "http://localhost:8080/api/Motorbike/update",
                type: 'PUT',
                async: true,
                contentType:'application/json',
                success: function() {
                    Swal.fire({
                        text: "Motocicleta Actualizada Correctamente",
                        icon: 'success',
                    }).then(() => {
                        window.location.reload();
                    });
                },
                error: function(){
                    Swal.fire({
                        text: 'No se pudo actualizar la motocicleta, por favor comunicarse con el administrador.',
                        icon: 'error',
                    })
                }
            });
        }
    });
};


/////*      Elimina la motocicleta seleccionada     */////
function elMoto(idMoto) {
    Swal.fire({
        title: '<h5> ESTÁ SEGURO DE QUE DESEA ELIMINAR LA MOTOCICLETA? </h5>',
        icon: "info",
        confirmButtonText: 'Aceptar',
        cancelButtonColor: '#d33',
        showCancelButton: true,
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: "http://localhost:8080/api/Motorbike/" + idMoto,
                type: 'DELETE',
                async: true,
                contentType:'application/json',
                success: function() {
                    Swal.fire({
                        text: "Motocicleta Eliminada Correctamente",
                        icon: 'success',
                    }).then(() => {
                        window.location.reload();
                    });
                },
                error: function(){
                    Swal.fire({
                        text: 'No se pudo eliminar la motocicleta, por favor comunicarse con el administrador.',
                        icon: 'error',
                    });
                }
            });
        }
    });
};
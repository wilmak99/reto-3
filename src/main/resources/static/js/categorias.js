/**
 * Controlador de Categorias
 * @author Ing William Mahecha
 * @version 1.0.0 2021
 */
 
/////*      Carga tabla con los datos de las categorias     */////
$.ajax({
    method: "GET",
    url: "http://129.151.124.116:8080/api/Category/all",
})
.done(function(data) {
    if (data.length > 0) {
        $.each(data, function(key, value) {
            $('#listCategorias').append('<tr align="center"><td>' + value['name'] + '</td><td>' + value['description'] + '</td><td><img src="img/editar.png" alt="editar" width="40" height="40" onclick="edCategoria(' + value['id'] + ', this)"/> <img src="img/papelera.png" alt="eliminar" width="40" height="40" onclick="elCategoria(' + value['id'] + ')" /></td></tr>')
        });
    } else {
        $('#listCategorias').append('<tr align="center"><td colspan="3"> No hay registros de Categorias </td></tr>')
    }
})
.fail(function() {
})
.always(function() {
});

/////*      Registra una nueva Categoria     */////
$('#registroCategoria').on('submit', registro);
function registro(tag){
    tag.preventDefault(); // Prevenir evento.
    tag.stopPropagation(); // Prevenir propagación.
    var categoria = {
        name: $("#nombre").val(),
        description: $("#descripcion").val(),
    }
    var data = JSON.stringify(categoria);
    $.ajax({
        data: data,
        url:"http://129.151.124.116:8080/api/Category/save",
        type:'POST',
        async: true,
        contentType:'application/json',
        success:function() {
            Swal.fire({
                text: "Categoria Creada Correctamente",
                icon: 'success',
            }).then(() => {
                window.location.reload();
            });
        },
        error: function() {
            Swal.fire({
                text: 'No se pudo registrar la categoria, por favor comunicarse con el administrador.',
                icon: 'error',
            })
        }
    });
}

/////*      Trae datos de la categoria Seleccionado     */////
function edCategoria(idCategoria, fila) {
    let seleccion = fila.parentElement.parentElement
    seleccion.remove();
    $.ajax({
        method: "GET",
        url:"http://129.151.124.116:8080/api/Category/" + idCategoria,
    })
    .done(function(data) {
        $('#listCategorias').append('<tr align="center"><td><input type="text" value="' + data['name'] + '" id="editName' + data['id'] + '"</td><td><input type="text" value="' + data['description'] + '" id="editDescription' + data['id'] + '"</td><td><img src="img/aceptar.png" alt="aceptar" width="40" height="40" onclick="editarCategoria(' + data['id'] + ')"/></td></tr>')
    })
    .fail(function() {
    })
    .always(function() {
    });
};

/////*      Edita y actualizar el categoria Seleccionado     */////
function editarCategoria(idCategoria) {
    Swal.fire({
        title: '<h5> ESTÁ SEGURO DE QUE DESEA ACTUALIZAR LA CATEGORIA? </h5>',
        icon: "info",
        confirmButtonText: 'Aceptar',
        cancelButtonColor: '#d33',
        showCancelButton: true,
    }).then((result) => {
        if (result.value) {
            let categoria = {
                id: idCategoria,
                name: $("#editName" + idCategoria).val(),
                description: $("#editDescription" + idCategoria).val(),
            }
            var data = JSON.stringify(categoria);
            $.ajax({
                data: data,
                url:"http://129.151.124.116:8080/api/Category/update",
                type: 'PUT',
                async: true,
                contentType:'application/json',
                success: function() {
                    Swal.fire({
                        text: "Categoria Actualizada Correctamente",
                        icon: 'success',
                    }).then(() => {
                        window.location.reload();
                    });
                },
                error: function(){
                    Swal.fire({
                        text: 'No se pudo actualizar la categoria, por favor comunicarse con el administrador.',
                        icon: 'error',
                    })
                }
            });
        }
    });
};


/////*      Elimina la categoria seleccionada     */////
function elCategoria(idCategoria) {
    Swal.fire({
        title: '<h5> ESTÁ SEGURO DE QUE DESEA ELIMINAR LA CATEGORIA? </h5>',
        icon: "info",
        confirmButtonText: 'Aceptar',
        cancelButtonColor: '#d33',
        showCancelButton: true,
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url:"http://129.151.124.116:8080/api/Category/" + idCategoria,
                type: 'DELETE',
                async: true,
                contentType:'application/json',
                success: function() {
                    Swal.fire({
                        text: "Categoria Eliminada Correctamente",
                        icon: 'success',
                    }).then(() => {
                        window.location.reload();
                    });
                },
                error: function(){
                    Swal.fire({
                        text: 'No se pudo eliminar la categoria, por favor comunicarse con el administrador.',
                        icon: 'error',
                    });
                }
            });
        }
    });
};
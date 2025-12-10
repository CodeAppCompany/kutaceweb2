$(".service-btn").on("click", function () {

    // Marcar botón activo
    $(".service-btn").removeClass("btn-outline-primary");
    $(".service-btn").addClass("btn-darkblue");
    $(this).removeClass("btn-darkblue");
    $(this).addClass("btn-outline-primary");

    // Mostrar solo el contenido seleccionado
    const target = $(this).data("target");

    $(".services-content").addClass("d-none");
    $("#" + target).removeClass("d-none");
});
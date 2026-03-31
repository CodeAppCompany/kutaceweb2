$(window).on("load", () => {
    system.htmlObjects.hide(
        'loading-page', false
    );
});

$(document).ready(() => {

    //Initialized the initial components
    async function ngOnInit(){
        let date = new Date();
        let year = date.getFullYear();
        $('#footerYear').text(year);
        WebStatus();
    }
    ngOnInit();

    sendMail = async function(form){
        console.log('sendMail');
        console.log(form);
        try{
            //form validation
            if(!validation(form)){
                return await system.notifications.open(
                    'Formulario', 
                    'Es importante llenar todos los campos del formulario', 
                    3500, 
                    'TopRigth', 
                    'warning', 
                    ''
                );
            }

            system.platform.loading.enabled();
            var url = V_Global + "services/api/modules/contact/send-message-private.service.php";
            $.ajax({
                type: "POST",
                url: url,
                dataType: 'json',
                data: jQuery.param({
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    message: form.message
                }),
                success: function (result){
                    var response = result.response;
                    setTimeout(() => {
                        system.platform.loading.disable();
                        if(!system.http.validation(response)) return;
                        
                        $('#user_name').val("");
                        $('#user_email').val("");
                        $('#user_message').val("");
                        
                        return system.notifications.open(
                            'Formulario', 
                            '¡Listo! hemos enviado un correo a los administradores, pronto se pondran en contacto con tigo.', 
                            9500, 
                            'BottomRigth', 
                            'success', 
                            ''
                        );
                    }, 1000);
                }
            });
        }catch(error){
            console.log(error);
        }
    }

    //to validate the form
    function validation(form){
        if(
            (
                (!form['name']) || 
                (form['name'].split === '')
            ) || (
                (!form['email']) || 
                (form['email'].split === '')
            ) || (
                (!form['message']) || 
                (form['message'].split === '')
            )
        ) return false;

        return true;
    }

    //method to check the statos of the platform
    function WebStatus(){
        var url = V_Global + "services/api/api/platform-status.service.php";
        $.ajax({
            type: "GET",
            url: url,
            dataType: 'json',
            success: function (result){
                var response = result.response;

                if(response !== "serv 01 | HOST__HTTPS : 200"){
                    system.notifications.open(
                        'Servidor', 
                        'Por el momento este sitio web se encuentra fuera de servicio...', 
                        false, 
                        'BottomRigth', 
                        'error', 
                        false
                    );

                    $('#fake-body').html("");
                }
            }
        });
    }

});
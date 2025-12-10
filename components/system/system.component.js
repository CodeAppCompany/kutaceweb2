
//Includes
var V_Global = 'http://localhost/cmf/';//Global server connection
//var V_Global = 'http://192.168.1.123/slg/';//Global server connection
var V_Domain = '';//Global cookies domain
var notificationsKey = [];

//System methods to excecute...
var system = {
	/*
	you will type your methods that you will need in your platform in same modules here 
		Example: 
			getTime()...
			getToken()...
			convertTime()...
	*/
	objects: {
		screenSize: (porcentage, _id) => {
			var porcent = porcentage / 100;//85 -> 0.85
	        var pixels = window.innerHeight * porcent;//85% of the page
	        $('#' + _id).attr('style', 'height: '+ pixels +'px !important;');
	        
	        //printing in the browser's console
	        system.console.print(
	        	'Table id: ' + name + ', scroll screen height: ' + pixels + ' px', 'info'
	        );
		},
		scroll: (_id, less) => {//id = the object to seek, less = to scrolling aprox
            var posicion = $("#" + _id).offset().top;
            var less = less;
            if(posicion <= 657) less = 200;
            $("html, body").animate({
                scrollTop: (posicion - less)
            }, 1000);
        },
        keys: {
			get: (size) => {
				return new Promise((resolve, reject) => {
		            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		            var result = '';
		            for(var i=0; i < size ;i++){
		                result += Math.floor(Math.random()*(9 - 1 + 1) + 1);
		                var numericValidate = Math.random() >= 0.5;
		                if(numericValidate) result += characters.charAt(Math.floor(Math.random() * characters.length));
		            }

		            return resolve(result);
		        });
			}
		},
        mobile: {
            openMenu: (_id) => {
                //$('#body_page').addClass('not_scroll');
                document.getElementById(_id).style.width = "100%";
            },
            closeMenu: (_id) => {
                document.getElementById(_id).style.width = "0";
            }
        }
	},
	htmlObjects: {
		hide(_id, _container){//Method to hide slowly any element with style
	        $('#' + _id).removeClass('show_element');
	        $('#' + _id).addClass('hide_element');
	        setTimeout(() => {
	            if(_container)$('#' + _container).addClass('d-flex align-items-center justify-content-center');
	            if(_container != 'no hide class') $('#' + _id).addClass('hide');
	            $('#' + _id).removeClass('show');
	        }, 100);
	    },
	    show(_id, _container){//Method to see any element with styles
	        setTimeout(() => {
	            if(_container) $('#' + _container).removeClass('d-flex align-items-center justify-content-center');
	            $('#' + _id).removeClass('hide');
	            $('#' + _id).removeClass('hide_element');
	            $('#' + _id).addClass('show_element');
	            $('#' + _id).addClass('show');
	        }, 100);
	    },
        scroll: (_id) => {
            var posicion = $("#" + _id).offset().top;
            var less = 0;
            if(posicion <= 657) less = 200;
            $("html, body").animate({
                scrollTop: (posicion - less)
            }, 1000);
        },
        openWhatsApp: () => {
            system.dialogs.open({
                title: 'Cambio de Ventana',
                container: `
                    <p>Estas apunto de abrir otra ventana del Navegado con el Contacto de Whjats App de la página.</p>
                    <p>¿Deseas continuar?</p>
                `,
                confirm: {
                    active: true,
                    _function: () => {
                        const phone = "3141036185"; // Número completo con código de país
                        const message = "Hola quiero más información";
                        const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
                        window.open(url, "_blank");
                    }
                },
                buttons: {
                    close: 'Cerrar ventana', // as default
                    confirm: 'Abrir Whats App' // as default
                }
            });
        },
        mobile: {
            openMenu: (_id) => {
                //$('#body_page').addClass('not_scroll');
                document.getElementById(_id).style.width = "100%";
            },
            closeMenu: (_id) => {
                document.getElementById(_id).style.width = "0";
            }
        }
	},
	http: {
		send: {
			authorization: () => {
                try{
                    var SSID = $.cookie('SSID');
                    var SSK = $.cookie('SSK');
                    var APISS__NME = $.cookie('APISS__NME');
                    if(
                        (!SSID) || 
                        (!SSK) || 
                        (!APISS__NME)
                    ) return system.platform.session.force();
                    
                    //return the session authorization
                    return btoa(JSON.stringify({
                        SSID: SSID,
                        SSK: SSK,
                        APISS__NME: APISS__NME
                    }));
                }catch(error){
                    return system.platform.session.force();
                }
            }
		},
        validation: (message) => {
            if(
                (message == 'internal server error') || 
                (message == 'form params incomplete') || 
                (message == 'out of order')
            ){
                system.platform.error();
                return false;
            }
            /*
            else if(message == 'authorization denied'){
                return system.platform.session.force();
            }
            */

            return true;
        }
	},
	console:{
		print: (message, type) => {
			if(type == 'success') type = 'color: green';
	        if(type == 'info') type = 'color: blue';
	        if(type == 'error') type = 'color: red';
	        if(type == 'warning') type = 'color: yellow';
	        console.log('%c ' + message, type)
		}
	},
	platform: {
		event: {
	        click: (_id) => {
	            if(!_id) return false;
	            console.log('the object ' + _id + ' has been clicked');
	            $('#' + _id).trigger('click');
	        },
	        focus: (_id, time) => {
	            if(!_id) return false;
	            if(!time) return $("#" + _id).first().focus();
	            setTimeout(() => { $("#" + _id).first().focus(); }, time);
	        }
	    },
        form: {
            disabled: (_id) => {
                if(!_id) return;
                for(var i=0; i < _id.length ;i++){
                    $('#' + _id[i]).attr('disabled', 'disabled');
                }
            },
            enabled: (_id) => {
                if(!_id) return;
                for(var i=0; i < _id.length ;i++){
                    $('#' + _id[i]).removeAttr('disabled');
                }
            }
        },
        error: () => {
            //Error message
            system.notifications.close('all');
            return system.notifications.open(
                'Error en sistema', 
                'Ocurrió un error al intentar resolver los datos del servidor, intenta de nuevo más tarde, si el problema persiste contacta al administrador.', 
                false, 
                'BottomRigth', 
                'error', 
                ''
            );
        },
        loading: {
            enabled: () => {
                const $modal = $('#publicModalOfDialogs');
                $('#satelliteModalLabel').text('Cargando....');
                $('#dialog-text-message').html(`
                    <div class="d-flex justify-content-center">
                        <div 
                            class="spinner loading-size spinner-blue"
                        ></div> 
                    </div>
                `);
                $modal.attr("data-backdrop", "static").modal('show');
                system.htmlObjects.hide('modal-close-button');
                system.htmlObjects.hide('modal-confirm-button');
                //$modal.modal('show');
                /*
                $("#publicModalOfDialogs").modal({
                    backdrop: false,   // clicking outside WILL close
                    keyboard: false,   // ESC WILL close
                    show: true        // show the modal immediately
                });
                */
            }, 
            disable: () => {
                const $modal = $('#publicModalOfDialogs');
                $modal.modal('hide');
            }
        }
	},
	notifications: {
        open: async function(title, message, duration, position, type, cookie){
            try{
                if(
                    (!title) && 
                    (!message) && 
                    (!position) && 
                    (!duration)
                ) return 'params incomplete';
                
                //Notification type
                var typeStyle = 'infoClass';//Default type
                var spinner = '';
                if(type == 'info') typeStyle = 'infoClass';
                if(type == 'warning') typeStyle = 'warningClass';
                if(type == 'success') typeStyle = 'successClass';
                if(type == 'error') typeStyle = 'errorClass';
                if(type == 'loading'){
                    typeStyle = '';
                    spinner = '<div class="spinner-border text-secondary notificationSpinner" role="status"><span class="visually-hidden"></span></div>';
                }

                var key = await system.objects.keys.get(20);
                var notification = $('<div id="' + key + '" class="hide_element messageAbsolute shadow notificationHover"></div>');
                var head = $('<div class="headMessage"></div>');
                var status = $(`<div class="notificationStatus `+ typeStyle +`">` + spinner + `</div>`);
                var _title = $('<label class="font titleNotification">' + title + '</label>');
                var close = $(`
                    <div class="closeMessageNotification">
                        <i class="material-icons pointer" id="closeMessageNotification">close</i>
                    </div>`);
                if(cookie) close = $(`
                    <div class="closeMessageNotification">
                        <p class="not-margin pointer" id="closeMessageNotification">` + cookie + `</p>
                    </div>
                `)
                var hr_separation = $('<hr class="hrNotification">');
                head.append(status); head.append(_title);
                if(type != 'loading') head.append(close); 
                head.append(hr_separation);

                var bodyMessage = $(`
                    <div class="bodyMessage">
                        <p id="text_` + key + `" class="notificationMessage text-truncate">` + message +`</p>
                    </div>`);
                notification.append(head); notification.append(bodyMessage);
                //Append in the notification sections
                var _position = position;//Default position
                if((position != 'TopLeft') && (position != 'TopRigth') && (position != 'BottomLeft') && (position != 'BottomRigth')) _position = 'TopRigth';//Default position
                $('#notification' + _position).append(notification);

                //Register the notification key
                notificationsKey.push({
                    key: key,
                    title: title,
                    message: message,
                    duration: duration
                })

                //Clic close notification event
                close.click({_id: key}, (params) => {
                    var _id = params.data._id;
                    if(cookie) localStorage['cookie-message'] = true;
                    //Removing data
                    system.notifications.close(_id);
                });

                //Duration method
                if(duration){
                    //If the notification don´t contains duraion, is infinite, duration: null -> infinite
                    var time = parseInt(duration);
                    setTimeout(function(){
                        system.htmlObjects.hide(key, false);
                        setTimeout(() => { $('#' + key).remove() }, 500);
                    }.bind(this), time);
                }

                //Show it
                system.htmlObjects.show(key, false);

                return {status: 'done', _id: key};
            }catch(error){
                return 'insernal module error: ' + error;
            }
        },
        close: (_id) => {
            try{
                if(!_id) return 'params incomplete';//'all' => if we receive an id like 'all', we will delete all all notifications

                var newNotifications = [];
                $.each(notificationsKey, (i, val) => {
                    //Remove html element
                    if(
                        (val.key == _id) || 
                        (_id == 'all')
                    ){
                        system.htmlObjects.hide(val.key, false);
                        setTimeout(() => { $('#' + val.key).remove() }, 500);
                    }
                    //Removing from internal array
                    if(
                        (val.key != _id) && 
                        (_id != 'all')
                    ){
                        newNotifications.push({
                            key: val.key,
                            title: val.title,
                            message: val.message,
                            duration: val.duration
                        });
                    }
                });
                notificationsKey = newNotifications;
            }catch(error){
                return 'insernal module error: ' + error;
            }
        }
    },
    dialogs: {
        oppened: false,
        open: (
            params = {
                title: '', // dialog title
                container: '', // full dialog message
                confirm: {
                    active: false,
                    _function: () => {}
                },
                buttons: {
                    close: 'Cerrar ventana', // as default
                    confirm: 'Contactar' // as default
                }
            }
        ) => {
            const $modal = $('#publicModalOfDialogs');
            const isOpen = $modal.hasClass('show');

            if(isOpen){
                $modal.modal('hide');

                // Esperar 5 segundos antes de abrir con nuevos parámetros
                setTimeout(() => {
                    $('.modal-backdrop').remove(); // elimina el backdrop viejo
                    $modal.removeClass('show').css('display', 'none');

                    $modal.modal('show');
                    $('#satelliteModalLabel').text(params.title);
                    $('#dialog-text-message').html(params.container);
                    'buttons' in params ? $('#modal-close-button').text(params.buttons.close) : '';
                    'buttons' in params ? $('#modal-confirm-button').text(params.buttons.confirm) : '';
                    system.dialogs.oppened = true;
                    if('confirm' in params && params.confirm.active){
                        $('#modal-confirm-button').off('click').on('click', function(event) {
                            //event.stopPropagation();
                            //event.preventDefault();
                            params.confirm._function();
                            $modal.modal('hide');
                        });
                    }
                }, 400);

                return;
            }

            $('#satelliteModalLabel').text(params.title);
            $('#dialog-text-message').html(params.container);
            'buttons' in params ? $('#modal-close-button').text(params.buttons.close) : '';
            'buttons' in params ? $('#modal-confirm-button').text(params.buttons.confirm) : '';
            if('confirm' in params && params.confirm.active){
                $('.dialogs-btn-primary').off('click').on('click', () => {
                    $modal.modal('hide');
                    params.confirm._function();
                });
            }

            system.htmlObjects.show('modal-close-button');
            system.htmlObjects.show('modal-confirm-button');
            $modal.removeAttr("data-backdrop data-keyboard").modal('show');
            /*
            $("#publicModalOfDialogs").modal({
                backdrop: true,   // clicking outside WILL close
                keyboard: true,   // ESC WILL close
                show: true        // show the modal immediately
            });
            */
            system.dialogs.oppened = true;
        }
    }
}
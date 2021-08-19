//alert("Si llegamos a esta funcrion");

			//alert("Llegamos "+data.action);

			//VALIDAMOS EL METODO QUE UTILIZAREMOS
			//var metodo = jQuery("select[name='action_sw']").val();
            /*

			var accion = "notify_button_click_local_hold";
			//var accion = "notify_button_click_demo_probar";

			//alert("Esta es la accion: "+accion);

			//alert(JSON.stringify(variables[i]));

			var orden_id = 916;

			var data = {
				//'action': 'notify_button_click',
				'action': accion,
				//'orden': JSON.stringify(variables[i])
				'orden': orden_id
			};

			console.log("Esta es la variable: "+orden_id);

			//return new Promise(resolve => {
				jQuery.post(ajaxurl, data, function(response) {
					//alert('Got this from the server: ' + response);
					//console.log("este llega");
					console.log("----> "+response); 
					console.log(response);
					//resolve(response);
				});
			//});
            */


            //alert("Holas!");

//AGREGAMOS LOS METAS A LOS CAMPOS
//ID FORMULARIO
jQuery(function(){
    /*

    1. data-threeds="amount"
    2. data-threeds="pan"
    3. data-threeds="month"
    4. data-threeds="year"

    */
   //alert("llegaremos!");
    jQuery(".woocommerce-checkout").attr("id", "billing-form");

    jQuery("#pan").attr("data-threeds", "pan");
    //jQuery(".wc-credit-card-form-card-number").attr("data-threeds", "pan");

    //wc-credit-card-form-card-number visa

    //REVISAMOS LA FECHA DE EXPIRACION
    

    jQuery("#ano_prueba").attr("data-threeds", "year");
    jQuery("#mes_prueba").attr("data-threeds", "month");

    //amounts
    jQuery("#amounts").attr("id", "amount-select");

    //HACEMOS QUE TODOS LOS CAMPOS SEAN DINAMICOS
    jQuery("body").on("change", ".wc-credit-card-form-card-number, .wc-credit-card-form-card-expiry, .wc-credit-card-form-card-cvc, #ccnumber, #ccexp, #cvv", function(){
        //GUARDAMOS LAS VARIABLES
        //ccnumber
        //ccexp
        //cvv

        var tarjeta = jQuery(".wc-credit-card-form-card-number, #ccnumber").val();
        console.log("La tarjeta es: "+tarjeta);
        var expira = jQuery(".wc-credit-card-form-card-expiry, #ccexp").val();
        var fecha_expiracion = expira.split("/");

        var mes = fecha_expiracion[0];
        var ano = fecha_expiracion[1];

        jQuery("#ano_prueba").val(ano);
        jQuery("#mes_prueba").val(mes);

        jQuery("#pan").val(tarjeta);


        //AQUI VIENEN TODOS LOS DEMAS DATOS:
        //authenticationValue
    });


    /*
    var tds = new ThreeDS("billing-form", "e8de2e2b5ca0d855fa74abadbde4100b", null, {
        endpoint: "https://api-sandbox.3dsintegrator.com/v2",
        verbose: true,
        iframeId :"3ds_iframe",
        showChallenge:true,
        challengeIndicator:"01",
        autoSubmit:false,
        //data: data,
    
    
        prompt: function () {
            console.log("Houston, we got a challenge");
        
            
        
            var iframe = document.getElementById("3ds_iframe"); 
                
            iframe.style.borderStyle="none";
            iframe.width ="100%";
            iframe.height = 800;
        
        
            var billingForm = document.getElementById("billing-form");
            billingForm.style.display = "none";
        
        
        }
    });
    */

        //alert("Alertamos!");

        var PayButton = document.getElementById("place_order");
        var amountSelect = document.getElementById("amount-select");
        /*
        PayButton.addEventListener("click",function(){

                    alert("Clic en enviar!");
                var billingForm = document.getElementById("billing-form");
                tds.verify(function(response){
                    console.log(response);
                    console.log("Authentication went through");

                    billingForm.style.display = "block";
                    
                    var labelMsg = document.getElementById("messageLabel"); 
                    if  (response.eci!="00" && response.eci!="07")
                    {
                    console.log("Autenticación Realizada");
                    labelMsg.innerHTML  ="";
                //llamar aqui a NMI
                }
                else
                    {
                    // No se deben enviar la transacción a NMI
                    labelMsg.innerHTML  ="No se ha podido autenticar la tarjeta";
                
                    }
                },function(response){
                    console.log(response)
                },{
                    amount:parseFloat(amountSelect.value)
                });

        });
        */
});


//PRUEBA CON LO DE EL FORMULARO


//======================> ESTE ES EL QUE SE TERMINA ENVIANDO
jQuery( document ).ready( function( $ ) {
    //$( '.woocommerce-checkout-trt' ).submit( function( e ) {//LO COMENTAMOS PARA PODER CONTINUAR
    $( '.woocommerce-checkout-tdadsasdasdadrt' ).submit( function( e ) {

        e.preventDefault();
        //alert( 'Stopping Form From Submitting.' );

        //EN ESTE PUNTO ES DONDE EJECUTAREMOS EL JS.
        /*
        $("body").on("change", ".selectpicker", function(){

        });
        */

        var PayButton = document.getElementById("place_order");
        var amountSelect = document.getElementById("amount-select");

        var tds = new ThreeDS("billing-form", "e8de2e2b5ca0d855fa74abadbde4100b", null, {
            endpoint: "https://api-sandbox.3dsintegrator.com/v2",
            verbose: true,
            iframeId :"3ds_iframe",
            showChallenge:true,
            challengeIndicator:"01",
            autoSubmit:false,
            //data: data,
        
        
        prompt: function () {
            console.log("Houston, we got a challenge");
        
            /*
              El código de esta sección se ejecuta antes de mostrar el IFrame Challenge
        
            */
        
            var iframe = document.getElementById("3ds_iframe"); 
                   
            iframe.style.borderStyle="none";
            iframe.width ="100%";
            iframe.height = 800;
        
        
            var billingForm = document.getElementById("billing-form");
            billingForm.style.display = "none";
        
        
        }
        });

        var billingForm = document.getElementById("billing-form");
tds.verify(function(response){
    console.log(response);
    console.log("Authentication went through");

     billingForm.style.display = "block";
     
     var labelMsg = document.getElementById("messageLabel"); 
     if  (response.eci!="00" && response.eci!="07")
    {
    console.log("Autenticación Realizada");
     labelMsg.innerHTML  ="";
   /*
   Llamar aquí al front end  para realizar la transación con el API NMI, enviar todos campos que 
   requiridos por la transacciön incluyendo eci,cavv, protocolVersion y dsTransactionId del objecto response o campos HTML
   */ 
        //ENVIAMOS MIS VARIABLES DESDE AJAX PARA PODERLAS UTILIZAR EN EL NMI
        var accion = "notify_button_click_local_hold";
			//var accion = "notify_button_click_demo_probar";

			//alert("Esta es la accion: "+accion);

			//alert(JSON.stringify(variables[i]));

			var orden_id = 916;

			var data = {
				//'action': 'notify_button_click',
				'action': accion,
				//'orden': JSON.stringify(variables[i])
				'orden': orden_id
			};

			console.log("Esta es la variable: "+orden_id);

			//return new Promise(resolve => {
				jQuery.post(my_ajax_object.ajax_url, data, function(response) {
					//alert('Got this from the server: ' + response);
					//console.log("este llega");
					console.log("----> "+response); 
					console.log(response);
                    alert("Llego el momento!");
                    
                    //e.submit();
					//resolve(response);
				});
			//});
   }
   else
    {
     // No se deben enviar la transacción a NMI
     labelMsg.innerHTML  ="No se ha podido autenticar la tarjeta";

     return false;
   
    }
},function(response){
    console.log(response)
},{
    amount:parseFloat(amountSelect.value)
});

       


        return false;
    } );
} );



/**
 * AGREGAMOS LA FUNCIONALIDAD PARA EL ENVIO DEL CHECKOUT
 */

jQuery(function(){
    jQuery(document).on('click', '.boton_pago_nuevo', function(e){


        //LO PRIMERO QUE DEBEMOS HACER ES AGREGAR EL CARGADOR

        jQuery(".padre_de_espera").show();

        if(jQuery('#payment_method_nmi_gateway_woocommerce_credit_card').is(':checked')){
            e.preventDefault();
        
            var PayButton = document.getElementById("place_order");
            var amountSelect = document.getElementById("amount-select");

            var tds = new ThreeDS("billing-form", "e8de2e2b5ca0d855fa74abadbde4100b", null, {
                //endpoint: "https://api-sandbox.3dsintegrator.com/v2",
                endpoint: "https://api.3dsintegrator.com/v2",
                verbose: true,
                iframeId :"3ds_iframe",
                showChallenge:true,
                challengeIndicator:"01",
                autoSubmit:false,
                //data: data,
            
            
                prompt: function () {
                    console.log("Houston, we got a challenge");
                
                    /*
                    El código de esta sección se ejecuta antes de mostrar el IFrame Challenge
                
                    */
                
                    var iframe = document.getElementById("3ds_iframe"); 
                        
                    iframe.style.borderStyle="none";
                    iframe.width ="100%";
                    iframe.height = 800;
                
                
                    var billingForm = document.getElementById("billing-form");
                    billingForm.style.display = "none";
                
                
                }
            });

            //VARIABLES QUE ENVIAREMOS A NMI
            var eci                     = '';
            var CAVV                    = '';
            var Status                  = '';
            var protocolVersion         = '';
            var authenticationValue     = '';
            var dsTransactionId         = '';

            var billingForm = document.getElementById("billing-form");
            tds.verify(function(response){
                console.log(response);
                console.log("Authentication went through");

                /* ESTO ERA EN LA VERSION 1 DE 3DS NO LA UTILIZAREMOS
                eci     = response.eci;
                cavv    = response.cavv;
                xid     = response.xid;
                status  = response.status;
                */


                eci                     = response.eci;
                CAVV                    = response.authenticationValue;
                Status                  = response.status;
                protocolVersion         = response.protocolVersion;
                authenticationValue     = response.authenticationValue;
                dsTransactionId         = response.dsTransId;

                //LLENAMOS TODOS LOS CAMPOS
                jQuery("input[name='eci']").val(eci);
                jQuery("input[name='CAVV']").val(CAVV);
                jQuery("input[name='Status']").val(Status);
                jQuery("input[name='protocolVersion']").val(protocolVersion);
                jQuery("input[name='authenticationValue']").val(authenticationValue);
                jQuery("input[name='dsTransactionId']").val(dsTransactionId);

                //alert(CAVV);

                billingForm.style.display = "block";
                
                var labelMsg = document.getElementById("messageLabel"); 
                if  (response.eci!="00" && response.eci!="07"){
                    console.log("Autenticación Realizada");
                    labelMsg.innerHTML  ="";
                    /*
                    Llamar aquí al front end  para realizar la transación con el API NMI, enviar todos campos que 
                    requiridos por la transacciön incluyendo eci,cavv, protocolVersion y dsTransactionId del objecto response o campos HTML
                    */ 
                    //ENVIAMOS MIS VARIABLES DESDE AJAX PARA PODERLAS UTILIZAR EN EL NMI
                    var accion = "notify_button_click_local_hold";
                        //var accion = "notify_button_click_demo_probar";

                        //alert("Esta es la accion: "+accion);

                        //alert(JSON.stringify(variables[i]));

                        var orden_id = 916;//BUSCAR POR SUPUESTO EL ID DE ESTA ORDEN


                        //PRUEBA PARA VER SI LLEGA
                        //alert(protocolVersion);

                        var data = {
                            //'action': 'notify_button_click',
                            'action': accion,
                            //'orden': JSON.stringify(variables[i])
                            'orden': orden_id,
                            /*'eci':  eci,
                            'cavv': cavv,
                            'xid':  xid,
                            'status':   status,//ELIMINAR DE AQUI ARRIBA*/
                            'eci': eci,
                            'CAVV': CAVV,
                            'Status': Status,
                            'protocolVersion': protocolVersion,
                            'authenticationValue': authenticationValue,
                            'dsTransactionId': dsTransactionId,
                        };

                        console.log("Esta es la variable: "+orden_id);

                        //return new Promise(resolve => {
                        jQuery.post(my_ajax_object.ajax_url, data, function(response) {
                            //alert('Got this from the server: ' + response);
                            //console.log("este llega");
                            console.log("----> "+response); 
                            console.log(response);


                            jQuery(".padre_de_espera").hide();

                            //alert("Llego el momento BOTON!");
                            jQuery( 'form.checkout' ).submit();
                            //e.submit();
                            //jQuery( 'form.checkout' ).submit();//LO QUITAMOS MIENTRAS
                            //resolve(response);
                        });
                        //});
                }else{

                    jQuery(".padre_de_espera").hide();

                    // No se deben enviar la transacción a NMI
                    labelMsg.innerHTML  ="No se ha podido autenticar la tarjeta";

                    return false;
            
                }
            },function(response){
                console.log(response)

                jQuery(".padre_de_espera").hide();

                
            },{
                amount:parseFloat(amountSelect.value)
            });



            setTimeout(function(){
                console.log("escondamos!");
                jQuery(".padre_de_espera").hide();
    
    
                //ENVIAMOS PARA QUE DE ERROR
                jQuery( 'form.checkout' ).submit();
    
            }, 4000);
            
        }else{
            jQuery(".padre_de_espera").hide();
        }

    });
});



//alert("carambas!");
/*

var accion = "notify_button_click_local_hold";
			//var accion = "notify_button_click_demo_probar";

			//alert("Esta es la accion: "+accion);

			//alert(JSON.stringify(variables[i]));

			var orden_id = 916;

			var data = {
				//'action': 'notify_button_click',
				'action': accion,
				//'orden': JSON.stringify(variables[i])
				'orden': orden_id
			};

			console.log("Esta es la variable: "+orden_id);

			//return new Promise(resolve => {
				jQuery.post(my_ajax_object.ajax_url, data, function(response) {
					//alert('Got this from the server: ' + response);
					//console.log("este llega");
					console.log("----> "+response); 
					console.log(response);
					//resolve(response);
				});
                */
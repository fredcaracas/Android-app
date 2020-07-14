window.fn = {};

window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(template, page, params) {
  //var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  //content.load(page)
  //  .then(menu.close.bind(menu));
  var nav = document.getElementById("nav");
  nav.options = {animation:"lift",animationOptions:{duration: 1}};
  menu.close();
  for(i=0;i<nav.pages.length;i++){
    if(nav.pages[i]["id"] == page){
        nav.bringPageTop(i,params);
        return;
    }
  }
  nav.pushPage(template, params);
};


function buscar_producto(productos, id_produc){
    
    for(i = 0; i < productos.length; i++){
        if(productos[i]._id == id_produc){
            return productos[i];
        }
    }
    return null;
}
ons.ready(function(){
    $("#btn_registro").on("click", function(){
        //validar todos los campos obligatorios.
        //password y repeticion sean iguales.
        var email = $("#email").val();
        var pwd = $("#password").val();
        var repwd = $("#repassword").val();
        try{
            if(!email){
                throw "Ingrese email para continuar";
            }
            if(!pwd){
                throw "Ingrese contrase&ntilde;a para continuar";
            }
            if(!pwd != repwd){
                throw "Contrase&ntilde;a y repetici&oacute;n no son iguales";
            }
            //validaciones...

            //POST API
            datos = {"email":email,"password":pwd};
            datos = JSON.stringify(datos);
            $("#cargando").show();
            $.ajax({
                url:"http://tiendanatural2020.herokuapp.com/api/user/register",
                data:datos,
                type:"POST",
                dataType:"json",
                contentType: 'application/json',
                success:function(respuesta){                    
                    ons.notification.toast("El usuario se registro correctamente", {"timeout":3000});
                    //Accedo al componente nav
                    //var nav = $("#nav")[0];
                    
                    var nav = document.getElementById("nav");
                    //Redirecciono a listado de productos
                    nav.pushPage("t_login");
                },
                error:function(xml,err,status){
                    ons.notification.toast("El email ya se encuentra registrado", { "timeout": 3000 });
                },
                complete:function()   {
                    $("#cargando").hide();
                }     
            });
        }
        catch(e){
            ons.notification.toast(e, {"timeout":3000});
        }
    });
});

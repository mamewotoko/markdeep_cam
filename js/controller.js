
function buttonPressed(b) {
  if (typeof(b) == "object") {
    return b.pressed;
  }
  return b == 1.0;
}

var sega = {

    UP_DOWN_AXES: 5,
    LEFT_RIGHT_AXES: 4,
    X: 3,
    Y: 0,
    Z: 4,
    A: 2,
    B: 1,
    C: 5,
    MODE: 8,
    START: 9,

    vender_id: 0xca3,
    product_id: 0x0024,
    up_pressed: function(gp){
        //Firefox
        return Math.abs(gp.axes[this.UP_DOWN_AXES] - (-1)) < 0.001;
    },
    down_pressed: function(gp){
        //Firefox
        return Math.abs(gp.axes[this.UP_DOWN_AXES] - (1)) < 0.001;
    },
    left_pressed: function(gp){
        //Firefox
        return Math.abs(gp.axes[this.LEFT_RIGHT_AXES] - (-1)) < 0.001;
    },
    right_pressed: function(gp){
        //Firefox
        return Math.abs(gp.axes[this.LEFT_RIGHT_AXES] - (1)) < 0.001;
    },
    x_pressed: function(gp){
        return buttonPressed(gp.buttons[this.X]);
    },
    y_pressed: function(gp){
        return buttonPressed(gp.buttons[this.Y]);
    },
    z_pressed: function(gp){
        return buttonPressed(gp.buttons[this.Z]);
    },
    a_pressed: function(gp){
        return buttonPressed(gp.buttons[this.A]);
    },
    b_pressed: function(gp){
        return buttonPressed(gp.buttons[this.B]);
    },
    c_pressed: function(gp){
        return buttonPressed(gp.buttons[this.C]);
    },

    //default handler
    handle: function(gp){
        if(this.a_pressed(gp) && this.x_pressed(gp)){
            //select 6
            select_avatar(6);
        }
        else if(this.b_pressed(gp) && this.y_pressed(gp)){
            //select 7
            select_avatar(7);
        }
        else if(this.c_pressed(gp) && this.z_pressed(gp)){
            //select 8
            select_avatar(8);
        }
        else if(this.x_pressed(gp)){
            //select 0
            select_avatar(0);
        }
        else if(this.y_pressed(gp)){
            //select 1
            select_avatar(1);
        }
        else if(this.z_pressed(gp)){
            //select 2
            select_avatar(2);
        }
        else if(this.a_pressed(gp)){
            //select 3
            select_avatar(3);
        }
        else if(this.b_pressed(gp)){
            //select 4
            select_avatar(4);
        }
        else if(this.c_pressed(gp)){
            //select 5
            select_avatar(5);
        }
    }
};

function find_handler(gp){
    //var handler_list = [ps3, sega];
    var handler_list = [sega];
    for(var i = 0; i < handler_list.length; i++){
        var vender_id = handler_list[i].vender_id.toString(16);
        var product_id = handler_list[i].product_id.toString(16);
        //TODO 正確ではない
        if(gp.id.indexOf(product_id) != -1
           && gp.id.indexOf(vender_id) != -1){
            return handler_list[i]
        }
    }
    return null;
}

var press_button_message = false;
var initialized = false;

function render() {
    //console.log("render");
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    if (!gamepads) {
        requestAnimationFrame(render);
        return;
    }
    var gp = null;
    //console.log("gamepads.length " + gamepads.length);
    for(i = 0; i < gamepads.length; i++){
        if(gamepads[i] == null){
            break;
        }
        if(gamepads[i].connected){
            gp = gamepads[i];
            break;
        }
    }
    if(gp == null){
        if(! press_button_message){
            console.log("gamepads: press some button to start")
            press_button_message = true;
        }
        requestAnimationFrame(render);
        return;
    }
    if (! initialized){
        console.log('id: ' + gp.id);
        console.log(gp);
        initialized = true;
    }
    //firefox vender-product-
    //chrome (Vender: xxxx, Product: xxxx)
    var handler = find_handler(gp);
    if(handler != null){
        handler.handle(gp);
    }
    //console.log(camera.position.x+","+camera.position.y+","+camera.position.z)
    requestAnimationFrame(render);
}
render();

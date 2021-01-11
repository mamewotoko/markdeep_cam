
function buttonPressed(b) {
    if (typeof(b) == "object") {
        return b.pressed;
    }
    return b == 1.0;
}

//vertical L con
var nintendo_switch = {
    vender_id: 0x057e,
    product_id: 0x2006,

    /* left 1, right -1 */
    STICK_X_AXES: 1,
    /* up -1, down 1 */
    STICK_Y_AXES: 0,
    AXES_BUTTON: 10,

    handle: function(gp){
        if(buttonPressed(gp.buttons[this.AXES_BUTTON])){
            select_avatar(4);
            return
        }
        var left_stick_x = gp.axes[this.STICK_X_AXES];
        var left_stick_y = gp.axes[this.STICK_Y_AXES];

        // 0, 1, 2
        // 3, 4, 5
        // 6, 7, 8
        
        if(left_stick_x < -0.8 && Math.abs(left_stick_y) < 0.2){
            //right
            select_avatar(5);
            return;
        }
        else if(0.8 < left_stick_x && Math.abs(left_stick_y) < 0.2){
            //left
            select_avatar(3);
            return;
        }
        else if(Math.abs(left_stick_x) < 0.2 && left_stick_y < -0.8){
            //up
            select_avatar(1);
            return;
        }
        else if(Math.abs(left_stick_x) < 0.2 && 0.8 < left_stick_y){
            //down
            select_avatar(7);
            return;
        }
        else if(0.8 < left_stick_x && 0.8 < left_stick_y){
            //up-left
            select_avatar(6);
            return;
        }
        else if(0.8 < left_stick_x && left_stick_y < -0.8){
            //down-left
            select_avatar(0);
            return;
        }
        else if(left_stick_x < -0.8 && 0.8 < left_stick_y){
            //up-right
            select_avatar(8);
            return;
        }
        else if(left_stick_x < -0.8 && left_stick_y < -0.8){
            //down-right
            select_avatar(2);
            return;
        }
    }
};

var ps3 = {
    vender_id: 0x054c,
    product_id: 0x0268,

    L1: 4,
    R1: 5,
    L2: 6,
    R2: 7,
    UP: 12,
    DOWN: 13,
    LEFT: 14,
    RIGHT: 15,
    CROSS: 0,
    CIRCLE: 1,
    RECTANGLE: 2,
    TRIANGLE: 3,
/* left -1, right 1 */
    LEFT_STICK_X_AXES: 0,
/* up -1, down 1 */
    LEFT_STICK_Y_AXES: 1,
/* left -1, right 1 */
    RIHGT_STICK_X_AXES: 2,
/* up -1, down 1 */
    RIGHT_STICK_X_AXES: 3,
    LEFT_AXES_BUTTON: 10,
    RIGHT_AXES_BUTTON: 11,
    
    handle: function(gp){
        //app logic...
        var l2 = buttonPressed(gp.buttons[this.L2]);
        var l1 = buttonPressed(gp.buttons[this.L1]);

        if(buttonPressed(gp.buttons[this.LEFT_AXES_BUTTON])){
            select_avatar(4);
            return
        }
        var left_stick_x = gp.axes[this.LEFT_STICK_X_AXES];
        var left_stick_y = gp.axes[this.LEFT_STICK_Y_AXES];

        // 0, 1, 2
        // 3, 4, 5
        // 6, 7, 8
        
        if(left_stick_x < -0.8 && Math.abs(left_stick_y) < 0.2){
            //left
            select_avatar(3);
            return;
        }
        else if(0.8 < left_stick_x && Math.abs(left_stick_y) < 0.2){
            //right
            select_avatar(5);
            return;
        }
        else if(Math.abs(left_stick_x) < 0.2 && left_stick_y < -0.8){
            //up
            select_avatar(1);
            return;
        }
        else if(Math.abs(left_stick_x) < 0.2 && 0.8 < left_stick_y){
            //down
            select_avatar(7);
            return;
        }
        else if(0.8 < left_stick_x && 0.8 < left_stick_y){
            //up-right
            select_avatar(8);
            return;
        }
        else if(0.8 < left_stick_x && left_stick_y < -0.8){
            //down-right
            select_avatar(2);
            return;
        }
        else if(left_stick_x < -0.8 && 0.8 < left_stick_y){
            //up-left
            select_avatar(6);
            return;
        }
        else if(left_stick_x < -0.8 && left_stick_y < -0.8){
            //down-left
            select_avatar(0);
            return;
        }
        
        if(l1 && l2 && buttonPressed(gp.buttons[this.UP])){
            select_avatar(7);
            return;
        }
        else if(l1 && l2 && buttonPressed(gp.buttons[this.RIGHT])){
            select_avatar(8);
            return;
        }
        else if(l2 && buttonPressed(gp.buttons[this.UP])){
            select_avatar(0);
            return;
        }
        else if(l2 && buttonPressed(gp.buttons[this.RIGHT])){
            select_avatar(1);
            return;
        }
        else if(l2 && buttonPressed(gp.buttons[this.DOWN])){
            select_avatar(2);
            return;
        }
        else if(l2 && buttonPressed(gp.buttons[this.LEFT])){
            select_avatar(3);
            return;
        }
        else if(l1 && buttonPressed(gp.buttons[this.UP])){
            select_avatar(4);
            return;
        }
        else if(l1 && buttonPressed(gp.buttons[this.RIGHT])){
            select_avatar(5);
            return;
        }
        else if(l1 && buttonPressed(gp.buttons[this.DOWN])){
            select_avatar(5);
            return;
        }
        else if(l1 && buttonPressed(gp.buttons[this.LEFT])){
            select_avatar(6);
            return;
        }
        // select by button index
        for (var i = 0; i <= 8; i++){
            if(buttonPressed(gp.buttons[i])){
                select_avatar(i);
                return;
            }
        }
    }
};

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
    current: 0,
    pressed_time: 0,
    
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
        var pressed_time_thres_ms = 500;
        //hide, left, normal, large
        
        if(this.a_pressed(gp) && this.x_pressed(gp)){
            //select 6
            this.current = 6;
        }
        else if(this.b_pressed(gp) && this.y_pressed(gp)){
            //select 7
            this.current = 7;
        }
        else if(this.c_pressed(gp) && this.z_pressed(gp)){
            //select 8
            this.current = 8;
        }
        else if(this.x_pressed(gp)){
            //select 0
            if(this.current == 6 && Date.now() - this.pressed_time < pressed_time_thres_ms) {
                return;
            }
            this.current = 0;
        }
        else if(this.y_pressed(gp)){
            //select 1
            if(this.current == 7 && Date.now() - this.pressed_time < pressed_time_thres_ms) {
                return;
            }
            this.current = 1;
        }
        else if(this.z_pressed(gp)){
            //select 2
            if(this.current == 8 && Date.now() - this.pressed_time < pressed_time_thres_ms) {
                return;
            }
            this.current = 2;
        }
        else if(this.a_pressed(gp)){
            if(this.current == 6 && Date.now() - this.pressed_time < pressed_time_thres_ms) {
                return;
            }
            //select 3
            this.current = 3;
        }
        else if(this.b_pressed(gp)){
            if(this.current == 7 && Date.now() - this.pressed_time < pressed_time_thres_ms) {
                return;
            }
            //select 4
            this.current = 4;
        }
        else if(this.c_pressed(gp)){
            if(this.current == 8 && Date.now() - this.pressed_time < pressed_time_thres_ms) {
                return;
            }
            //select 5
            this.current = 5;
        }
        else {
            return;
        }
        select_avatar(this.current);
        this.pressed_time = Date.now();
    }
};

function gp_handle(gp){
    var handler_list = [ps3, sega, nintendo_switch];
    //var handler_list = [sega];
    for(var i = 0; i < handler_list.length; i++){
        var vender_id = handler_list[i].vender_id.toString(16);
        var product_id = handler_list[i].product_id.toString(16);
        //TODO not correct
        if(gp.id.indexOf(product_id) != -1
           && gp.id.indexOf(vender_id) != -1){
            handler_list[i].handle(gp);
        }
    }
}

var press_button_message = false;
var initialized = false;
var last_gp_handled = 0;
var gp_handle_ms = 100;

function render() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    if (!gamepads) {
        requestAnimationFrame(render);
        return;
    }
    var gp = null;
    var now_epoch = Date.now(); 
    if(gp_handle_ms < now_epoch - last_gp_handled){
        for(i = 0; i < gamepads.length; i++){
            if(gamepads[i] == null){
                break;
            }
            if(gamepads[i].connected){
                gp = gamepads[i];
                gp_handle(gp);
            }
        }
        last_gp_handled = now_epoch;
    }
    //console.log("gamepads.length " + gamepads.length);
    //skip 
    requestAnimationFrame(render);
    return;
}
render();

var ohp_id = 'ohp';
var normal_mode = true;
var display_mode = true;
var guide_mode = true;
var border_width = 4; //px
var normal_container_style = 'border: dashed 4px #009900; z-index:1000;'
var transp_container_style = 'border: solid 4px #e0edff; pointer-events: none; touch-events:none;'
var container = document.getElementById(ohp_id);
container.style = normal_container_style;

function board_init(){
    var shapes = [];
    var color_table = {
        "R": "red",
        "N": "blue",
        "G": "green",

        "B": "black",
        "P": "pink",
        "Y": "yellow",
        "M": "purple",
        "W": "white",
        "A": "aqua",
        "O": "orange"
    };
    var index = 0;
    var last_event = null;
    var point_started = false;
    var draw = SVG(ohp_id);
    var stroke_color = 'green';
    var stroke_width = 4;
    var is_fullscreen = true;
    var removed_element = [];

    var option = {
        stroke: 'green',
        'stroke-width': 4,
        'fill-opacity': 0,
        'stroke-opacity': 0.75,
    };

    function getDrawObject() {
        var g = draw.group();
        option['stroke'] = stroke_color;
        option['stroke-width'] = stroke_width;
        return g.polyline()
            .attr(option);
            //.on('dblclick', make_dblclick_handler(g));
    }

    function pointstart(event){
        console.log('pointstart ' + event.button);

        //multiple fingers
        if('touches' in event && 1 < event.touches.length){
            //multi touch
            //scroll mode
            scrolling = true;
            point_started = false;
            scrollX = event.touches[0].clientX;
            scrollY = event.touches[0].clientY;
            return;
        }
        if('touches' in event){
            last_point_x = event.touches[0].clientX;
            last_point_y = event.touches[0].clientY;
        }
        else if('clientX' in event){
            last_point_x = event.clientX;
            last_point_y = event.clientY;
        }

        if('button' in event && event.button != 0){
            point_started = false;
            return;
        }
        point_started = true;
        event.preventDefault();
        var sh = getDrawObject();
        shapes[index] = sh;
        // https://svgjs.com/svg.draw.js/
        last_event = event;
        var snap = 1;
        console.log(event);
        shapes[index].draw('point', event);
    }

    function pointmove(event){
        //not left click
        if('button' in event && event.button != 0){
            point_started = false;
            return;
        }
        if(!shapes[index]){
            point_started = false;
            return;
        }
        if(!point_started){
            return;
        }
        event.preventDefault();
        last_event = event;
        shapes[index].draw('point', event)
    }

    function pointend(event) {
        console.log('pointend');
        console.log(event);

        //not left click
        if('button' in event && event.button != 0){
            return;
        }
        if(!point_started){
            return;
        }
        point_started = false;
        event.preventDefault();
        shapes[index].draw('stop', last_event);
        index++;
    }

    // function resize_svg(is_fullscreen){
    //     //frame size (#main div)
    //     var width = document.body.scrollWidth - 2 * border_width;
    //     // - 2 * border_width;
    //     var height = document.body.scrollHeight;

    //     console.log('w h %d %d', width, height);
    //     draw.size(width, height);

    //     var div = document.getElementById(ohp_id);
    //     div.style.width = width+"px";
    //     div.style.height = height+"px";
    // }

    // resize_svg(is_fullscreen);

    function hide_last_element(){
        var last = draw.last();
        removed_element.push(last);
        last.remove();
    }

    function update_container(display_mode, normal_mode){
        var style;
        if(normal_mode){
            style = normal_container_style;
        }
        else {
            style = transp_container_style;
        }

        if(!display_mode){
            style += "display:none;"
        }
        var container = document.getElementById(ohp_id);
        container.style = style;
    }

    document.addEventListener('keydown', function(event){
        //TODO; check focus

        console.log(event.key);
        var keyname = event.key;
        var ctrl = event.getModifierState("Control");
        if(keyname in color_table){
            stroke_color = color_table[keyname];
            return;
        }
        else if(keyname == "F"){
            normal_mode = !normal_mode;
            update_container(display_mode, normal_mode);
        }
        else if(keyname == "Q"){
            display_mode = !display_mode;
            update_container(display_mode, normal_mode);
        }
        else if(event.ctrlKey && (event.code == 'KeyZ' || keyname == '/')){
            //ctrl-z
            hide_last_element();
        }
        else if(keyname in ['1','2','3','4','5','6','7','8','9']){
            stroke_width = Math.pow(2, parseInt(keyname));
            return;
        }
    });

    draw.on('mousedown', pointstart);
    draw.on('touchstart', pointstart);

    draw.on('mousemove', pointmove);
    draw.on('touchmove', pointmove);

    draw.on('mouseup', pointend);
    draw.on('touchend', pointend);
}

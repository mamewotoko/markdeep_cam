var ohp_id = 'ohp';
var normal_mode = true;
var display_mode = true;
var guide_mode = true;
var border_width = 4; //px
var normal_container_style = 'border-bottom: solid 10px #D2691E; z-index:1000;'
var transp_container_style = 'border-bottom: solid 10px transparent; pointer-events: none; touch-events:none;'
var container = document.getElementById(ohp_id);
container.style = normal_container_style;

var draw = SVG(ohp_id);

function save_svg(){
    var current_svg = draw.svg();
    $('#svg_content').val(current_svg);
}

function board_init(){
    var shapes = [];
    var color_table = {
        'R': 'red',
        'N': 'blue',
        'G': 'green',

        'B': 'black',
        'P': 'pink',
        'Y': 'yellow',
        'M': 'purple',
        'W': 'white',
        'A': 'aqua',
        'O': 'orange'
    };
    var index = 0;
    var last_event = null;
    var point_started = false;
    var stroke_color = 'green';
    var stroke_width = 8;
    var is_fullscreen = true;
    var removed_element = [];

    var option = {
        stroke: 'green',
        'stroke-width': 4,
        'fill-opacity': 0,
        'stroke-opacity': 0.75,
    };

    function get_draw_object() {
        var g = draw.group();
        option['stroke'] = stroke_color;
        option['stroke-width'] = stroke_width;
        return g.polyline()
            .attr(option);
            //.on('dblclick', make_dblclick_handler(g));
    }

    function pointstart(event){
        //console.log('pointstart ' + event.button);
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
        var sh = get_draw_object();
        shapes[index] = sh;
        // https://svgjs.com/svg.draw.js/
        last_event = event;
        var snap = 1;
        //console.log(event);
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
        //console.log('pointend');
        //console.log(event);

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
            style += 'display:none;'
        }
        var container = document.getElementById(ohp_id);
        container.style = style;
    }

    document.addEventListener('keydown', function(event){
        //TODO; check focus
        console.log(document.activeElement);
        console.log(document.activeElement.type);
        if($('#markdeep_input').is(':focus')
           || document.activeElement.type == "text"){
            return;
        }
        console.log(event.key);
        var keyname = event.key;
        var ctrl = event.getModifierState('Control');
        //
        
        if(keyname in color_table){
            event.preventDefault();
            stroke_color = color_table[keyname];
            return;
        }
        else if(keyname == 'F'){
            //check focus
            event.preventDefault();
            normal_mode = !normal_mode;
            update_container(display_mode, normal_mode);
        }
        else if(keyname == 'Q'){
            event.preventDefault();
            display_mode = !display_mode;
            update_container(display_mode, normal_mode);
        }
        else if(event.ctrlKey && (event.code == 'KeyZ' || keyname == '/')){
            event.preventDefault();
            //ctrl-z
            hide_last_element();
        }
        else if(event.ctrlKey && event.keyCode == 46){
            //delete, clear svg
            event.preventDefault();
            draw.clear();
        }
        else if(keyname in ['1','2','3','4','5','6','7','8','9']){
            event.preventDefault();
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

function speech(){
    var text = $("#markdeep_input").val();
    var msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
}

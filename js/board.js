var ohp_id = 'ohp';
var normal_mode = true;
var display_mode = true;
var display_clock = true;
var guide_mode = true;
//TODO: config
var border_width = 4;
var normal_container_style = `border: solid 4px #D2691E; z-index:1000;`
var transp_container_style = `border: solid 4px transparent; pointer-events: none; touch-events:none;`
var container = document.getElementById(ohp_id);
container.style = normal_container_style;
//scroll by 2 finger
var scrolling = false;
var drawing = false;
var scrollX = 0;
var scrollY = 0;

var draw = SVG(ohp_id);

function save_svg(){
    var current_svg = draw.svg();
    $('#svg_content').val(current_svg);
}

function board_init(init_pen_color, init_stroke_width){
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
    window.stroke_color = init_pen_color;
    var stroke_width = init_stroke_width;
    var is_fullscreen = true;
    var removed_element = [];

    var option = {
        stroke: 'green',
        'stroke-width': init_stroke_width,
        'fill-opacity': 0,
        'stroke-opacity': 1,
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
        //multiple fingers
        if('touches' in event && 1 < event.touches.length){
            //multi touch
            //scroll mode
            scrolling = true;
            point_started = false;
            scrollX = event.touches[0].clientX;
            scrollY = event.touches[0].clientY;
            if(drawing){
                shapes[index].draw('cancel');
                drawing = false;
            }
            event.preventDefault();
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
        if(drawing){
            //end previous drawing
            shapes[index].draw('stop', last_event);
        }
        point_started = true;
        event.preventDefault();
        var sh = get_draw_object();
        shapes[index] = sh;
        // https://svgjs.com/svg.draw.js/
        last_event = event;
        var snap = 1;
        shapes[index].draw('point', event);
        drawing = true;
    }

    function pointmove(event){
        //multiple fingers
        if('touches' in event && 1 < event.touches.length){
            if(scrolling){
                var diffX = event.touches[0].clientX - scrollX;
                var diffY = event.touches[0].clientY - scrollY;
                scrollX = event.touches[0].clientX;
                scrollY = event.touches[0].clientY;
                var sign = -1;
                var scale = 1.2;
                if ($("scroll_check").prop("checked")){
                    sign = 1;
                }
                window.scrollBy(sign*scale*diffX, sign*scale*diffY);
            }
            scrolling = true;
            point_started = false;
            if(drawing){
                shapes[index].draw('cancel');
                drawing = false;
            }
            event.preventDefault();
            return;
        }
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
        drawing = true;
        shapes[index].draw('point', event)
    }

    function pointend(event) {
        //not left click
        if('button' in event && event.button != 0){
            return;
        }
        if(!point_started){
            return;
        }
        drawing = false;
        point_started = false;
        event.preventDefault();
        shapes[index].draw('stop', last_event);
        index++;
    }

    window.hide_last_element = function(){
        var last = draw.last();
        removed_element.push(last);
        last.remove();
    }

    function update_container(){
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
        $("#ohp").height($("#frame").height());

        if(display_clock){
            $("#clock").show();
        }
        else {
            $("#clock").hide();
        }
    }

    //TODO move definition
    function update_fontsize(){
        var new_style = $("#balloon_style").val();
        console.log("balloon_style is changed " + new_style);
        $("#markdeep_board").removeClass();
        $("#markdeep_board").addClass(new_style);
    }
    
    document.addEventListener('keydown', function(event){
        if(window.editor.isFocused()
           || document.activeElement.type == "text"){
            return;
        }
        var keyname = event.key;
        var ctrl = event.getModifierState('Control');
        console.log("keyname " + keyname);
        if(keyname == "+"){
            console.log("enlarge font");
            $("#balloon_style option:selected").next().attr("selected", "selected");
            update_fontsize();
            return;
        }
        else if(keyname == "-"){
            console.log("small font");
            $("#balloon_style option:selected").prev().attr("selected", "selected");
            update_fontsize();
            return;
        }
        
        //TODO move keybind of ace editor
        if(keyname in color_table){
            event.preventDefault();
            window.stroke_color = color_table[keyname];
            return;
        }
        else if(keyname === "Escape"){
            event.preventDefault();
            $(".drawer").drawer("toggle");
            return;
        }
        else if(keyname == 'i'){
            event.preventDefault();
            window.editor.focus();
            return;
        }
        else if(keyname == 'F'){
            //check focus
            event.preventDefault();
            //switch
            var checked = $("#drawing_mode").prop('checked');
            $("#drawing_mode").prop('checked', !checked);
            normal_mode = !normal_mode;
            update_container();
        }
        else if(keyname == 'D'){
            //check focus
            event.preventDefault();
            //switch
            var checked = $("#markdeep_mode").prop('checked');
            $("#markdeep_mode").prop('checked', !checked);
            //normal_mode = !normal_mode;
            update_markdown();
        }
        else if(keyname == 'Q'){
            event.preventDefault();
            display_mode = !display_mode;
            update_container();
        }
        else if(ctrl && (event.code == 'KeyZ' || keyname == '/')){
            event.preventDefault();
            //ctrl-z
            hide_last_element();
        }
        else if(ctrl && (event.keyCode == 8 || event.keyCode == 46)){
            //Backspace or Delete
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

    $("#drawing_mode").change(function (){
        normal_mode = this.checked;
        update_container();
    });

    $("#markdeep_mode").change(function (){
        normal_mode = this.checked;
        update_container();
    });

    $("#display_clock").change(function(){
        display_clock = this.checked;
        //TODO: start, stop interval Timer
        update_container();
    });
    
    $("#gum_rotate").change(function (){
        var rotate = this.checked;
        if(rotate){
            $("#gum").addClass("rotate");
        }
        else {
            $("#gum").removeClass("rotate");
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
    var text = $("#result").text();
    var msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
}

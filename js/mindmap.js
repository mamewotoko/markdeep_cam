const d3 = require('d3');
require('markmap/lib/d3-flextree');
const markmap = require('markmap/lib/view.mindmap');
const parse = require('markmap/lib/parse.markdown');
const transform = require('markmap/lib/transform.headings');

function update_markmap(text){
    const data = transform(parse(text));
    $("svg#mindmap").empty();
    //TODO clear previsous svg
    var map = markmap('svg#mindmap', data, {
        nodeHeight: 40,
        duration: 0,
        nodeFont: '8pt Mono',
        preset: 'colorful', // or default
        linkShape: 'diagonal' // or bracket
    });
    //map.zoomScale(4);
}

//function update_markdown(){
window.update_markdown = function(){
    var input = $('#markdeep_input').val() + "\n";
    var markdeep_mode = $("#markdeep_mode").is(":checked");

    if(markdeep_mode){
        $("#markdeep_board").css("display", "block");
        $("#markmap_container").css("display", "none");

        // TODO: clear markdeep?
        //console.log(window.markdeep.format(input));
        $('.markdeep').html(window.markdeep.format(input));  // <----------- magic
        postprocessMarkdeep();
    }
    else {
        // TODO: clear markdeep?
        $("#markdeep_board").css("display", "none");
        $("#markmap_container").css("display", "block");

        update_markmap(input);
    }

}
$(document).ready(function() {
    //"use strict";
    board_init();
    // $("#ohp").css("width", $("#balloon").css("width"))
    //     .css("height", $("#balloon").css("height"));
    $("#mindmap").css("width", $("#balloon").css("width"))
        .css("height", $("#balloon").css("height"));
    $("#markdeep_mode").change(update_markdown);
    document.head.innerHTML = window.markdeep.stylesheet() + document.head.innerHTML;
    update_markdown();
    $('#markdeep_input').on("change keyup paste", update_markdown);
});

function postprocessMarkdeep() {
    // for some reason, markdeep creates an additional, superflous <p> tag right
    // at the beginning, so let's get rid of that
    $('.markdeep .md > p:first-child').hide();
    
    // anchors mess up the spacing, so purge them too
    $('.markdeep .md a.target').hide();
    
    // tell mathjax to render math
    $('.markdeep').each(function() {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, $(this).get()]);
    });
}


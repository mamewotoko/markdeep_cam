//for rev. 74
window.init_greentea = function(){
    var TEXT_COLOR = "#FFFFFF";
    var TEXTURE_BACKGROUND_COLOR = "#c59606";

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    var main_canvas = $("#3dcanvas")[0];
    console.log("main canvas", main_canvas);
    var renderer = new THREE.WebGLRenderer({ alpha: true, canvas: main_canvas });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize($("#gum").width(), $("#gum").height());
    // renderer.setSize(main_canvas.parentElement.innerWidth,
    //                  main_canvas.parentElement.innerHeight);
    //document.body.appendChild(renderer.domElement);
    var control = new THREE.OrbitControls(camera, renderer.domElement);

    var light = new THREE.AmbientLight(0x888888);
    scene.add(light);
    light = new THREE.DirectionalLight(0x888888, 1.0);
    light.position.set(10, 10, 0);
    scene.add(light);

    var canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    var xc = canvas.getContext("2d");
    xc.fillStyle=TEXTURE_BACKGROUND_COLOR;
    xc.fillRect(0, 0, canvas.width, canvas.height);
    xc.fillStyle=TEXT_COLOR;
    //macでない場合どうなる?
    xc.font = "82pt ヒラギノ角ゴ";
    xc.fillText("？", 0, canvas.width * 0.8);

    for(var i = 0; i < 3; i++){
        var geometry = new THREE.BoxGeometry(32, 32, 32);
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        var material = new THREE.MeshPhongMaterial({ map: texture });
        //var material = end_material;
        var obj = new THREE.Mesh(geometry, material);
        obj.position.x -= 32 * 2 * i;
        scene.add(obj);
    }

    camera.position.set(0, 40, 30);

    window.greentea_loop = function() {
        control.update();
        renderer.render(scene, camera);
    };
}

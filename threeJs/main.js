
let scene, camera, renderer, cube , snow, snowGeo, snowFlake, snowCount = 25000;
var raycaster, intersects;
var mouse, INTERSECTED;


var mouseX = 0;
    var mouseY = 0;

    var targetX = 0;
    var targetY = 0;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
function init(){
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth/window.innerHeight,
        0.1,
        1000
    );

    scene.background = new THREE.Color( 0x252934 );
    
    renderer = new THREE.WebGLRenderer({antialias: true});
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.getElementById('canvas').appendChild(renderer.domElement);

    //snow code

    snowGeo = new THREE.Geometry();
    for (let i = 0; i < snowCount; i++){
        snowFlake = new THREE.Vector3(
            Math.random() * 600 -200,
            Math.random() * 600 -200,
            Math.random() * 600 -200
        );

        snowFlake.velocity = 0;
        snowFlake.accelaration = 0.001;
        snowGeo.vertices.push(snowFlake);
    }


    const snowMaterial = new THREE.PointsMaterial({
        color:0xffffff,
        size: 0.3,
        transparent: true
    })

    snow = new THREE.Points(snowGeo, snowMaterial);
    scene.add(snow);
    

    // snow code ends

    //camera motion
    

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );


    //camera motion ends

    
    
    camera.position.z = 5;
}

function onDocumentMouseMove( event ) {

    mouseX = ( event.clientX - windowHalfX );
    mouseY = ( event.clientY - windowHalfY );

}


function animate() {
    requestAnimationFrame(animate);

    snowGeo.vertices.forEach( p=>{
        p.velocity += p.accelaration;
        p.y -= p.velocity;

        if(p.y < -200){
            p.y = 200;

            p.velocity = 0
        }
    });


    targetX = mouseX * .001;
    targetY = mouseY * .001;

    if ( scene ) {

        scene.rotation.y += 0.02 * ( targetX - scene.rotation.y );
        scene.rotation.x += 0.02 * ( targetY - scene.rotation.x );

    }



    snowGeo.verticesNeedUpdate = true;
    renderer.render(scene, camera);
}


function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', onWindowResize, false)
init();
animate();

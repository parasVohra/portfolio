
let scene, camera, renderer, cube , snow, snowGeo, snowFlake, snowCount = 25000;
var raycaster, intersects;
var mouse, INTERSECTED;
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

    
    
    camera.position.z = 5;
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



    snowGeo.verticesNeedUpdate = true;
    renderer.render(scene, camera);
}
function onDocumentMouseMove( event ) {

    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}


function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', onWindowResize, false)
init();
animate();

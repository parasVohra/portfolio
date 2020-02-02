
let scene, camera, renderer, cube;

function init(){
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth/window.innerHeight,
        0.1,
        1000
    );
    
    renderer = new THREE.WebGLRenderer({antialias: true});
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
    
    //const geometry = new THREE.Geometry( 2, 2, 2 );
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        -1.0, -1.0, 0.0,
        1.0, -1.0, 0.0,
        1.0, 1.0, 0.0
    ])

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    
   // const texture = new THREE.TextureLoader().load('metal.jpg')
    const material = new THREE.MeshBasicMaterial( {color: 'white'} );



    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    
    camera.position.z = 9;
}


function animate() {
    requestAnimationFrame(animate);

    cube.position.x += 0.01;

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


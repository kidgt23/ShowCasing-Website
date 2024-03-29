let scene, camera, renderer, planet;

document.addEventListener('DOMContentLoaded', function() {
    initPlanet();  // Initializing the 3D planet
    document.body.style.opacity = '1';
});

function toggleNav() {
    const nav = document.querySelector('nav ul');
    nav.style.display = (nav.style.display !== 'block') ? 'block' : 'none';
}

function navigateToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    highlightSection(sectionId);
}

function highlightSection(sectionId) {
    let sections = document.querySelectorAll('section');
    for (let section of sections) {
        section.style.transition = 'background 1s';
        if (section.id === sectionId) {
            section.style.background = '#e8eaf6';
        } else {
            section.style.background = '#ffffff';
        }
    }
}

function initPlanet() {
    const container = document.getElementById('planetContainer');

    // Set up the scene
    scene = new THREE.Scene();

    // Set up the camera
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 2;

    // Set up the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Render Transparency 
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Create a sphere (planet) with the Earth texture
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const texture = new THREE.TextureLoader().load('ipcc_bluemarble_west_front.jpg'); // Make sure the path is correct
    const material = new THREE.MeshBasicMaterial({ map: texture });
    planet = new THREE.Mesh(geometry, material);
    scene.add(planet);

    animatePlanet();
}

function animatePlanet() {
    requestAnimationFrame(animatePlanet);

    // Rotate the planet
    planet.rotation.y += 0.005;

    renderer.render(scene, camera);
}

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(
    'ipcc_bluemarble_west_front.jpg',  // the URL of the texture
    undefined,  // onLoad callback, we're not using it so set to undefined
    undefined,  // onProgress callback, we're not using it so set to undefined
    function(error) {  // onError callback
        console.error('Error loading texture:', error);
    }
);

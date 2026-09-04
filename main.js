import * as THREE from 'three';
import {x_axis, y_axis, z_axis, drawLine} from './three_helpers'

var w = window.innerWidth
var h = window.innerHeight
var aspect = w/h
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
const origin = new THREE.Vector3(0,0,0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(w, h)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.IcosahedronGeometry( 1, 0 ); 
const material = new THREE.MeshPhongMaterial( {color: 0xaa00ff, wireframe: false} ); 
const cube = new THREE.Mesh( geometry, material ); 
scene.add( cube );

// drawLine(origin, new THREE.Vector3(1, 0, 0), 0xff0000, scene)

const light = new THREE.DirectionalLight(0xFFFFFF, 1)
light.position.set(0, 10, 0)
light.target.position.set(-5, 0, 0)
scene.add(light)
scene.add(light.target)

const light_ambient = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light_ambient );


camera.position.z = 5;

function animate() {
    console.log('frame')
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
	renderer.render( scene, camera )
}
renderer.setAnimationLoop( animate )
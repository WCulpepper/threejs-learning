import * as THREE from 'three';
import {x_axis, y_axis, z_axis} from './three_helpers'


var w = window.innerWidth
var h = window.innerHeight
var aspect = w/h
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(90, aspect, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(w, h)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.IcosahedronGeometry( 1, 0 ); 
const material = new THREE.MeshPhongMaterial( {color: 0x00ff00} ); 
const cube = new THREE.Mesh( geometry, material ); 
scene.add( cube );

scene.add(x_axis, y_axis, z_axis)

const light = new THREE.DirectionalLight(0xFFFFFF, 1)
light.position.set(0, 10, 0)

camera.position.z = 5;

function animate() {
    console.log('frame')
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
	renderer.render( scene, camera )
}
renderer.setAnimationLoop( animate )
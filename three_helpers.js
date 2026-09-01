import * as THREE from 'three';
import { color } from 'three/tsl';

const origin = new THREE.Vector3(0, 0, 0)
const x_end = new THREE.Vector3(1, 0, 0)
const y_end = new THREE.Vector3(0, 1, 0)
const z_end = new THREE.Vector3(0, 0, -1)

const x_mat = new THREE.LineBasicMaterial({color: 0xff0000 })
const x_axis_points = []
x_axis_points.push(origin, x_end)
const x_axis_geometry = new THREE.BufferGeometry().setFromPoints(x_axis_points)
const x_axis = new THREE.Line(x_axis_geometry, x_mat)

const y_axis_points = []
y_axis_points.push(origin, y_end)
const y_mat = new THREE.LineBasicMaterial({color: 0x00ff00 })
const y_axis_geometry = new THREE.BufferGeometry().setFromPoints(y_axis_points)
const y_axis = new THREE.Line(y_axis_geometry, y_mat)

const z_axis_points = []
z_axis_points.push(origin, z_end)
const z_mat = new THREE.LineBasicMaterial({color: 0x0000ff })
const z_axis_geometry = new THREE.BufferGeometry().setFromPoints(z_axis_points)
const z_axis = new THREE.Line(z_axis_geometry, z_mat)

export function drawLine(p1, p2, color_in, scene) {
    if (typeof p1 != THREE.Vector3 || typeof p2 != THREE.Vector3 || typeof scene != THREE.Scene) return
    const line_mat = new THREE.LineBasicMaterial({color: color_in})
    const points = []
    points.push(p1, p2)
    const line_geometrybuffer = new THREE.BufferGeometry().setFromPoints(points)
    const line = THREE.Line(line_geometrybuffer, line_mat)
    scene.add(line)
}

export {x_axis, y_axis, z_axis}
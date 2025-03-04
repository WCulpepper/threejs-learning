import for threejs scenes is just `'three'`
standard is: `import * as THREE from 'three'`

# Preface
- My experience in computer graphics comes from mostly academic work and reading SIGGRAPH publications here and there. There will be a lot of comparisons drawn here between Three.js and the OpenGL graphics pipeline, because that's what I initially learned computer graphics programming with.

# Basics of Three.js Scenes
- create scene, camera, and renderer (window) constants
  - `scene = new THREE.Scene() //case sensitive Scene object instantiation`
  - `camera = new THREE.PerspectiveCamera(FOV, aspectRatio, frustumNear, frustumFar)`
    - FOV is a javascript Number
    - aspectRatio is a Number, typically window.innerWidth/window.innerHeight
    - frustumNear and frustumFar are the near and far planes defining the camera's frustum. My notes from my old computer graphics class say this dictates the z-distance that thresholds whether fragments are rendered. In typical CG linear algebra, this is represented by a -z coordinate.
    - PerspectiveCamera is an abstraction for a perspective, or "true to life" camera. Three.js has constructors for Ortho cameras, Stereo cameras, and more constructors for CubeCamera and ArrayCamera. 
      - ArrayCamera is an array of PerspectiveCamera objects. 
      - CubeCamera renders out to...a cube? I'm gonna be honest, I have no idea what the documentation really means by the "cube render target"
        - From the code example on the site it looks like it's used to render materials onto a mesh via good old fashioned "assume it's a cube"
      - Not new to me are the Ortho and Stereo cameras. Ortho preserves parallel lines, similar to what you'd see in a rendering of a mechanical system/part. Stereo cameras are a pair of cameras used to create a true-to-life depth for the user. Think 3D movies and VR. Since it's mathematically two cameras, I imagine it doubles the total computational load.
  - `renderer = new THREE.WebGLRenderer()`
    - roughly equivalent to GLFW window object creation
- Append renderer object to document
## Before time began, there was...The Cube.
- So, this is pretty awesome. Three.js has built-in objects to encapsulate a variety of "standard" geometries you'd see in this sort of thing. 
  - Ordinarily, in OpenGL, you'd need to manually define all of these somehow. Below is some old code from my repo when I was taking Computer Graphics at Mines, defining an icosahedron. If you're big into D&D, this is a D20.
```cpp
#define IX 0.525731112119133606 
#define IZ 0.850650808352039932

Icosahedron::Icosahedron(GLfloat size) {
    std::vector<GLfloat> p = {-IX, 0.0, IZ, 
                             IX, 0.0, IZ, 
                             -IX, 0.0, -IZ, 
                             IX, 0.0, -IZ,    
		                     0.0, IZ, IX, 
                             0.0, IZ, -IX, 
                             0.0, -IZ, IX, 
                             0.0, -IZ, -IX,    
		                     IZ, IX, 0.0, 
                             -IZ, IX, 0.0, 
                             IZ, -IX, 0.0, 
                             -IZ, -IX, 0.0};

    std::vector<GLfloat> n = {-IX, 0.0, IZ, 
                             IX, 0.0, IZ, 
                             -IX, 0.0, -IZ, 
                             IX, 0.0, -IZ,    
		                     0.0, IZ, IX, 
                             0.0, IZ, -IX, 
                             0.0, -IZ, IX, 
                             0.0, -IZ, -IX,    
		                     IZ, IX, 0.0, 
                             -IZ, IX, 0.0, 
                             IZ, -IX, 0.0, 
                             -IZ, -IX, 0.0};

    std::vector<GLfloat> tex = {
        0.0f, 0.0f, 0.0f, 1.0f, 0.5f, 0.866f, 
        0.0f, 0.0f, 0.0f, 1.0f, 0.5f, 0.866f, 
        0.0f, 0.0f, 0.0f, 1.0f, 0.5f, 0.866f, 
        0.0f, 0.0f, 0.0f, 1.0f, 0.5f, 0.866f, 
        0.0f, 0.0f, 0.0f, 1.0f, 0.5f, 0.866f, 
        0.0f, 0.0f, 0.0f, 1.0f, 0.5f, 0.866f, 
        0.0f, 0.0f, 0.0f, 1.0f, 0.5f, 0.866f, 
        0.0f, 0.0f, 0.0f, 1.0f, 0.5f, 0.866f, 
        0.0f, 0.0f, 0.0f, 1.0f, 0.5f, 0.866f, 
        0.0f, 0.0f, 0.0f, 1.0f, 0.5f, 0.866f, 
        0.0f, 0.0f, 0.0f, 1.0f, 0.5f, 0.866f, 
        0.0f, 0.0f, 0.0f, 1.0f, 0.5f, 0.866f, 
        0.0f, 0.0f, 0.0f, 1.0f, 0.5f, 0.866f, 
        0.0f, 0.0f, 0.0f, 1.0f, 0.5f, 0.866f, 
        0.0f, 0.0f, 0.0f, 1.0f, 0.5f, 0.866f, 
        0.0f, 0.0f, 0.0f, 1.0f, 0.5f, 0.866f, 
        0.0f, 0.0f, 0.0f, 1.0f, 0.5f, 0.866f, 
        0.0f, 0.0f, 0.0f, 1.0f, 0.5f, 0.866f, 
        0.0f, 0.0f, 0.0f, 1.0f, 0.5f, 0.866f, 
        0.0f, 0.0f, 0.0f, 1.0f, 0.5f, 0.866f
    };

    std::vector<GLuint> el = {0,4,1, 0,9,4, 9,5,4, 4,5,8, 4,8,1,    
		8,10,1, 8,3,10, 5,3,8, 5,2,3, 2,7,3,    
		7,10,3, 7,6,10, 7,11,6, 11,0,6, 0,1,6, 
		6,1,10, 9,0,11, 9,11,2, 9,2,5, 7,2,11};
    
    initBuffers(&el, &p, &n, &tex);
} 
```
- Cool, right? What just graced your optic nerve was a pure-math representation of an icosahedron, written as a C++ class. Honestly it's really old code. I think I might've messed up my texture coordinates. If you feel like you just tried reading an Elder Scroll, that's understandable. That's how I feel when I look at my old code too.
- I will be creating the cube to start.
- After setting up the scene + cameras, create constants for the mesh, material, and use those constants to instantiate a cube Mesh object.
  - `geometry = new THREE.BoxGeometry(1, 1, 1)`
    - parameters are width, height, depth (personally I would've said width length and height but whatever that's what their documentation says)
    - There are optional parameters in there for the number of width/height/depth "segments." I don't really know what that does, but I'll find out once I render this cube.
  - `material = new THREE.MeshBasicMaterial({color: 0x00ff00})`
    - Again, another *killer* feature of Three.js: material encapsulation classes. These are WAY more fleshed out than what I was doing in my computer graphics classes. What I had was just a few things defined on the Phong model. Three.js materials have things like all of the texture maps, flags to render as wireframe, depth tests, and clipping all built-in. And I was doing all of that manually in OpenGL/C++. 
  - `const cube = new THREE.Mesh(geometry, material)`
  - Add the cube to the scene with `scene.add(cube)`
## Render? I hardly know 'er!
- It would be remiss not to include the main rendering functions:
```js
function animate() {
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );
```
- This is a srandard animation loop, nothing too crazy.
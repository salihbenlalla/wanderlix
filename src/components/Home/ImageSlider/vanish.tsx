import * as THREE from "three";
import { Tween, update, Easing } from "@tweenjs/tween.js";

export function vanish(imageUrl: string, container: HTMLDivElement): void {
  //   const container = containerRef.current;

  if (!container) {
    return;
  }

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const loader = new THREE.TextureLoader();
  loader.load(
    imageUrl,
    (texture) => {
      const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);

      // Set UV coordinates to center the image
      const uvAttribute = sphereGeometry.getAttribute("uv");
      const numVertices = uvAttribute.count;
      for (let i = 0; i < numVertices; i++) {
        const u = uvAttribute.getX(i);
        const v = uvAttribute.getY(i);
        uvAttribute.setXY(i, u - 0.5, v - 0.5);
      }
      uvAttribute.needsUpdate = true;

      const sphereMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide,
      });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      scene.add(sphere);

      //   const sphereAnimation = new Tween(sphere.rotation)
      //     .to({ x: Math.PI, y: 0, z: 0 }, 2000)
      //     .easing(Easing.Quadratic.InOut)
      //     .start();

      const cameraAnimation = new Tween(camera.position)
        .to({ z: 0 }, 2000)
        .easing(Easing.Quadratic.InOut)
        .onUpdate(() => {
          camera.lookAt(sphere.position);
        })
        .start();

      function animate() {
        requestAnimationFrame(animate);
        update();
        renderer.render(scene, camera);
      }
      animate();
    },
    undefined,
    (error) => {
      console.error(`Error loading image: ${error}`);
    }
  );
}

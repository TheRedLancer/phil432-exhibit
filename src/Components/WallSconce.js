import * as THREE from 'three'

export default class WallSconce extends THREE.Object3D {
    /**
     * @param {THREE.ColorRepresentation | undefined} color 
     * @param {number | undefined} intensity 
     */
    constructor(color, intensity, x, y, z) {
        super();
        this.lightSource = new THREE.PointLight(color, intensity, 50, 2);
        this.lightSource.castShadow = true;
        this.lightSource.position.y = -0.5;
        this.add(this.lightSource);

        this.geometry = new THREE.ConeGeometry(2, 2, 32, 1, true, 0, 2 * Math.PI);
        this.material = new THREE.MeshLambertMaterial({color: 0x404040, side: THREE.DoubleSide});
        this.mesh = new THREE.Mesh(
            this.geometry,
            this.material
        );
        this.mesh.rotateY(Math.PI / 2);
        this.mesh.rotateX(Math.PI);
        // this.mesh.castShadow = true;
        this.mesh.receiveShadow = false;
        this.add(this.mesh);
        this.position.set(x, y, z);
        this.dispose = this.dispose.bind(this);
    }

    dispose() {
        this.remove(this.mesh);
        this.mesh = null;
        this.lightSource.dispose();
        this.lightSource = null;
        this.geometry.dispose();
        this.material.dispose();
    }
}
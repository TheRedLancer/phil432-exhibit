import * as THREE from 'three'

export default class WallSconce extends THREE.Object3D {
    /**
     * @param {THREE.ColorRepresentation | undefined} color 
     * @param {number | undefined} intensity 
     */
    constructor(color, intensity) {
        super();
        this.lightSource = new THREE.PointLight(color, intensity);
        this.lightSource.castShadow = true;
        this.lightSource.position.y = -1;
        this.add(this.lightSource);

        this.geometry = new THREE.ConeGeometry(2, 2, 32, 1, true, 0, 2 * Math.PI);
        this.mesh = new THREE.Mesh(
            this.geometry,
            new THREE.MeshLambertMaterial({color: "grey", side: THREE.DoubleSide})
        );
        this.add(this.mesh);
    }
}
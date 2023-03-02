import * as THREE from 'three'

export default class ArtPicture extends THREE.Object3D {
    /**
     * @param {string} imagePath 
     * @param {number | undefined} width 
     * @param {number | undefined} height 
     */
    constructor(imagePath, width, height) {
        super();
        this.texture = new THREE.TextureLoader().load(imagePath);
        this.material = new THREE.MeshLambertMaterial({map: this.texture});
        this.geometry = new THREE.PlaneGeometry(width, height);
        this.mesh = new THREE.Mesh(
            this.geometry,
            this.material            
        );
        this.add(this.mesh);
        this.dispose = this.dispose.bind(this);
    }

    dispose() {
        this.texture.dispose();
        this.material.dispose();
        this.geometry.dispose();
    }
}


import * as THREE from "three";
import ArtPicture from "./ArtPicture";
import Player from "./Player";
import WallSconce from "./WallSconce";

export default class OpenLevel extends THREE.Object3D {
    constructor() {
        super();
        this.maxX = 200;
        this.maxY = 400;
        this.maxZ = 200;
        this.boxes = [];
    }

    /**
     * Loads the level to the passed in scene
     * @param {THREE.Scene} scene 
     * @param {THREE.PerspectiveCamera} camera
     * @returns {OpenLevel} this
     */
    load(scene, camera) { 

        let rmHeight = 10;
        let rmWidth = 20;
        let rmLength = 60;

        let ground = new THREE.Mesh(
            new THREE.PlaneGeometry(rmWidth, rmLength),
            new THREE.MeshPhongMaterial({color: "grey"})
        );
        ground.rotateX(- Math.PI / 2);
        scene.add(ground);

        let ceiling = new THREE.Mesh(
            new THREE.PlaneGeometry(rmWidth, rmLength),
            new THREE.MeshPhongMaterial({color: "blue"})
        );
        ceiling.rotateX(Math.PI / 2);
        ceiling.position.set(0, rmHeight,)
        scene.add(ceiling);

        let leftWall = new THREE.Mesh(
            new THREE.PlaneGeometry(rmLength, rmHeight),
            new THREE.MeshPhongMaterial({color: "blue", side: THREE.DoubleSide})
        );
        leftWall.rotateY(Math.PI / 2);
        leftWall.position.set(-1 * rmWidth / 2, rmHeight / 2, 0)
        scene.add(leftWall);

        let rightWall = new THREE.Mesh(
            new THREE.PlaneGeometry(rmLength, rmHeight),
            new THREE.MeshPhongMaterial({color: "blue", side: THREE.DoubleSide})
        );
        rightWall.rotateY(- Math.PI / 2);
        rightWall.position.set(rmWidth / 2, rmHeight / 2, 0)
        scene.add(rightWall);

        let backWall = new THREE.Mesh(
            new THREE.PlaneGeometry(rmWidth, rmHeight),
            new THREE.MeshPhongMaterial({color: "blue", side: THREE.DoubleSide})
        );
        backWall.position.set(0, rmHeight / 2, rmLength / 2)
        scene.add(backWall);

        let frontWall = new THREE.Mesh(
            new THREE.PlaneGeometry(rmWidth, rmHeight),
            new THREE.MeshPhongMaterial({color: "blue", side: THREE.DoubleSide})
        );
        frontWall.rotateY(Math.PI);
        frontWall.position.set(0, rmHeight / 2, -1 * rmLength / 2)
        scene.add(frontWall);
        
        let sconce1 = new WallSconce(0xFFFFFF, 1);
        sconce1.position.y = rmHeight / 2;
        scene.add(sconce1);

        let p1 = new ArtPicture('../../assets/fox.jpeg', 4, 4); 
        p1.position.set(0, 4, -20);
        scene.add(p1);

        // let ambient = new THREE.AmbientLight(0xFFFFFF, 0.1);
        // scene.add(ambient);

        this.player = new Player();
        this.player.position.set(0, 1.8, rmLength / 2 - 5);
        this.player.addCamera(camera);
        scene.add(this.player);
        
        return this;
    }
}
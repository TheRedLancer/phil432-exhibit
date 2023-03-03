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
        let rmHeight = 20;
        let rmWidth = 20;
        let rmLength = 60;
        this.makeRoom(scene, rmWidth, rmHeight, rmLength);
        
        scene.add(new WallSconce(0xFFFFFF, 1, -rmWidth / 2 + 0.1, rmHeight * 2 / 3, 0));
        scene.add(new WallSconce(0xFFFFFF, 1, rmWidth / 2 - 0.1, rmHeight * 2 / 3, 0));
        scene.add(new WallSconce(0xFFFFFF, 1, -rmWidth / 2 + 0.1, rmHeight * 2 / 3, rmLength / 4));
        scene.add(new WallSconce(0xFFFFFF, 1, rmWidth / 2 - 0.1, rmHeight * 2 / 3, rmLength / 4));
        scene.add(new WallSconce(0xFFFFFF, 1, -rmWidth / 2 + 0.1, rmHeight * 2 / 3, -1 * rmLength / 4));
        scene.add(new WallSconce(0xFFFFFF, 1, rmWidth / 2 - 0.1, rmHeight * 2 / 3, -1 * rmLength / 4));

        // let ball = (x, y, z) => {
        //     let b = new THREE.Mesh(
        //         new THREE.SphereGeometry(2),
        //         new THREE.MeshPhongMaterial({color: 0xFF0000})
        //     );
        //     b.receiveShadow = false;
        //     b.castShadow = true;
        //     b.position.set(x, y, z);
        //     return b
        // }
        // scene.add(ball(0, 4, 0));
        // scene.add(ball(7, 3, 0));

        let p1 = new ArtPicture(require('../../assets/fox.jpeg'), 4, 4); 
        p1.position.set(0, 4, -20);
        scene.add(p1);

        let ambient = new THREE.AmbientLight(0xFFFFFF, 0.2);
        scene.add(ambient);

        this.player = new Player();
        this.player.position.set(0, 7, rmLength / 2 - 5);
        this.player.addCamera(camera);
        scene.add(this.player);
        
        return this;
    }

    makeRoom(scene, rmWidth, rmHeight, rmLength) {
        let ground = new THREE.Mesh(
            new THREE.PlaneGeometry(rmWidth, rmLength),
            new THREE.MeshPhongMaterial({
                color: "grey",
                reflectivity: 0
            })
        );
        ground.rotateX(- Math.PI / 2);
        ground.receiveShadow = true;
        ground.castShadow = false;
        scene.add(ground);

        let ceiling = new THREE.Mesh(
            new THREE.PlaneGeometry(rmWidth, rmLength),
            new THREE.MeshPhongMaterial({
                color: "grey",
                reflectivity: 0
            })
        );
        ceiling.rotateX(Math.PI / 2);
        ceiling.position.set(0, rmHeight, 0);
        ceiling.receiveShadow = true;
        ceiling.castShadow = false;
        scene.add(ceiling);

        let leftWall = new THREE.Mesh(
            new THREE.PlaneGeometry(rmLength, rmHeight),
            new THREE.MeshPhongMaterial({color: "blue"})
        );
        leftWall.rotateY(Math.PI / 2);
        leftWall.position.set(-1 * rmWidth / 2, rmHeight / 2, 0);
        leftWall.receiveShadow = true;
        leftWall.castShadow = false;
        scene.add(leftWall);

        let rightWall = new THREE.Mesh(
            new THREE.PlaneGeometry(rmLength, rmHeight),
            new THREE.MeshPhongMaterial({color: "blue"})
        );
        rightWall.rotateY(- Math.PI / 2);
        rightWall.position.set(rmWidth / 2, rmHeight / 2, 0);
        rightWall.receiveShadow = true;
        rightWall.castShadow = false;
        scene.add(rightWall);

        let backWall = new THREE.Mesh(
            new THREE.PlaneGeometry(rmWidth, rmHeight),
            new THREE.MeshPhongMaterial({
                color: "blue",
                side: THREE.DoubleSide
            })
        );
        backWall.position.set(0, rmHeight / 2, rmLength / 2);
        backWall.rotateY(Math.PI);
        backWall.receiveShadow = true;
        backWall.castShadow = false;
        scene.add(backWall);

        let frontWall = new THREE.Mesh(
            new THREE.PlaneGeometry(rmWidth, rmHeight),
            new THREE.MeshPhongMaterial({color: "blue"})
        );
        frontWall.position.set(0, rmHeight / 2, -1 * rmLength / 2);
        frontWall.receiveShadow = true;
        frontWall.castShadow = false;
        scene.add(frontWall);
    }
}
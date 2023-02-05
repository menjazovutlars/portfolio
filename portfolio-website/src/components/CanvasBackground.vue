<template>
  <v-container>
    <canvas id="canvas-bg"></canvas>
    <span id="canvas-hand">
      <p>x:{{ cameraPosition.x }}</p>
      <p>y:{{ cameraPosition.y }}</p>
      <p>z:{{ cameraPosition.z }}</p>
      <p>rotX:{{ cameraPosition.rotation.x }}</p>
      <p>rotY:{{ cameraPosition.rotation.y }}</p>
      <p>rotZ:{{ cameraPosition.rotation.z }}</p>
      <p>zoom:{{ cameraPosition.zoom }}</p>
    </span>
  </v-container>
</template>

<script>
import * as THREE from "three";
//import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
//import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import gsap from "gsap";

/*
0xDB3774
0xE3E8AE
0x8FE1F2
0x8C95E6
0xF2B67C

*/

export default {
  name: "CanvasBG",
  data: function () {
    return {
      scene: "",
      camera: "",
      cameraPosition: { x: "", y: "", z: "", rotation: "" },
      cameraHand: "",
      renderer: "",
      torus: "",
      objLoader: "",
      mtlLoader: "",
      controls: "",
      ambientLight: "",
      pointLight: "",
      hx: "",
      hy: "",
      canvas: "",
      canvasHand: "",
      videoTexture: "",
      textureLoader: "",
      videoCubeVisible: "",
      videoCube: "",
      roomCenter: "",
      roomUp: "",
      roomRight: "",
      roomDown: "",
      roomLeft: "",
      rooms: [],
      currentRoom: "",
      fontLoader: "",
      signText: "",
      pointingIcon: "",
      signModels: [],
      signIndexTexts: 0,
      signIndexSymbols: 0,
      raycaster: "",
      clickMouse: new THREE.Vector2(),
      moveMouse: "",
      startPage: "",
      clickable: THREE.Object3D,
      isMoving: false,
      windowView: new THREE.Frustum(),
      inView: {
        up: false,
        right: false,
        down: false,
        left: false,
      },
    };
  },
  created() {
    this.$root.$refs.CanvasBG = this;
  },
  mounted() {
    this.canvas = document.getElementById("canvas-bg");
    this.startPage = this.$root.$refs.StartPage;
    this.initTHREE();
    this.animate();

    // this.canvasHand = this.setupSceneHand();
  },
  methods: {
    initTHREE: function () {
      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      this.camera.position.set(5, -2, 0);

      this.renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#canvas-bg"),
        alpha: true,
      });

      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMap.enabled = false;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.zoomSpeed = 5;
      this.controls.enabled = false;

      this.controls.enableZoom = true;
      this.controls.enablePan = false;
      this.controls.maxDistance = 40;

      this.raycaster = new THREE.Raycaster();
      this.raycaster.firstHitOnly = true;

      this.textureLoader = new THREE.TextureLoader();
      this.fontLoader = new FontLoader();

      const pPCenter = this.startPage.pPCenter.data();
      const pPUp = this.startPage.pPUp.data();
      const pPRight = this.startPage.pPRight.data();
      const pPDown = this.startPage.pPDown.data();
      const pPLeft = this.startPage.pPLeft.data();

      //this.createText();
      //this.createSymbol();

      this.addRoom(
        this.roomCenter,
        pPCenter.room,
        true,
        80,
        80,
        100,
        0x8fe1f2,
        0,
        0,
        0,
        {
          doors: [
            {
              direction: "up",
              sign: pPUp.room,
            },
            {
              direction: "right",
              sign: pPRight.room,
            },
            {
              direction: "down",
              sign: pPDown.room,
            },
            {
              direction: "left",
              sign: pPLeft.room,
            },
          ],
        }
      );

      this.addRoom(
        this.roomUp,
        pPUp.room,
        false,
        80,
        80,
        100,
        0xf2b67c,
        0,
        0,
        -102,
        {
          doors: [
            {
              direction: "down",
              sign: pPCenter.room,
            },
          ],
        }
      );

      this.addRoom(
        this.roomRight,
        pPRight.room,
        false,
        80,
        80,
        100,
        0x8fe1f2,
        82,
        0,
        0,
        {
          doors: [
            {
              direction: "left",
              sign: pPCenter.room,
            },
          ],
        }
      );

      this.addRoom(
        this.roomDown,
        pPDown.room,
        false,
        80,
        80,
        100,
        0x8fe1f2,
        0,
        0,
        102,
        {
          doors: [
            {
              direction: "up",
              sign: pPCenter.room,
            },
          ],
        }
      );

      this.addRoom(
        this.roomLeft,
        pPLeft.room,
        false,
        80,
        80,
        100,
        0x8fe1f2,
        -82,
        0,
        0,
        {
          doors: [
            {
              direction: "right",
              sign: pPCenter.room,
            },
          ],
        }
      );

      //this.addDoor();

      //this.addSign();
      this.currentRoom = this.rooms[0];

      this.renderer.render(this.scene, this.camera);

      window.addEventListener("mousemove", this.doorsInView);

      window.addEventListener("click", (e) => {
        this.onDoorClick(e);
      });

      window.addEventListener("resize", this.onWindowResize);
    },
    onDoorClick: function (e) {
      if (this.clickable) {
        this.clickable = null;
        return;
      }

      this.clickMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.clickMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.clickMouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.scene.children);

      if (intersects.length > 0 && intersects[0].object.userData.clickable) {
        this.clickable = intersects[0].object;

        let offset = {
          x: -10,
          y: 9.5,
          z: 0.4,
        };

        switch (true) {
          case this.clickable.userData.sign === "Center":
            switch (true) {
              case this.clickable.userData.direction === "down":
                offset = {
                  x: 0.1973,
                  y: 5.5323,
                  z: -38.092,
                };
                break;

              case this.clickable.userData.direction === "right":
                offset = {
                  x: -38.9981,
                  y: 8.5884,
                  z: -0.1939,
                };
                break;
              case this.clickable.userData.direction === "up":
                offset = {
                  x: 0.0816,
                  y: 5.9039,
                  z: 38.0365,
                };
                break;
              case this.clickable.userData.direction === "left":
                offset = {
                  x: 38.6803,
                  y: 10.1896,
                  z: -0.0668,
                };
                break;
            }

            this.moveToRoom(
              this.scene.getObjectByName(this.clickable.userData.sign).position,
              offset,
              this.clickable.userData.sign,
              "ProjectPageCenter"
            );

            console.log("moving to Center");
            break;
          case this.clickable.userData.sign === "Project 1":
            switch (true) {
              case this.clickable.userData.direction === "up":
                offset = {
                  x: 0.0116,
                  y: 5.6171,
                  z: -62.3963,
                };
                break;
            }

            this.moveToRoom(
              this.scene.getObjectByName(this.clickable.userData.sign).position,
              offset,
              this.clickable.userData.sign,
              "ProjectPageUp"
            );
            console.log("moving to Project 1");
            break;
          case this.clickable.userData.sign === "Project 2":
            offset = {
              x: 43.4376,
              y: 10.6262,
              z: 0.1676,
            };

            this.moveToRoom(
              this.scene.getObjectByName(this.clickable.userData.sign).position,
              offset,
              this.clickable.userData.sign,
              "ProjectPageRight"
            );
            console.log("moving to Project 2");
            break;
          case this.clickable.userData.sign === "Project 3":
            offset = {
              x: -0.59716,
              y: 6.2247,
              z: 62.4918,
            };
            this.moveToRoom(
              this.scene.getObjectByName(this.clickable.userData.sign).position,
              offset,
              this.clickable.userData.sign,
              "ProjectPageDown"
            );
            console.log("moving to Project 3");
            break;
          case this.clickable.userData.sign === "Project 4":
            offset = {
              x: -43.4376,
              y: 10.6262,
              z: -0.1676,
            };
            this.moveToRoom(
              this.scene.getObjectByName(this.clickable.userData.sign).position,
              offset,
              this.clickable.userData.sign,
              "ProjectPageLeft"
            );
            console.log("moving to Project 4");
            break;
          default:
            break;
        }
      }
    },
    doorsInView: function () {
      this.inView.up = false;
      this.inView.right = false;
      this.inView.down = false;
      this.inView.left = false;

      this.camera.updateMatrix();
      this.camera.updateMatrixWorld();
      this.windowView.setFromProjectionMatrix(
        new THREE.Matrix4().multiplyMatrices(
          this.camera.projectionMatrix,
          this.camera.matrixWorldInverse
        )
      );
      const doors = this.scene.getObjectsByProperty("name", "Door");

      for (const door of doors) {
        const intersects = this.windowView.intersectsObject(door);
        if (intersects && door.userData.room === this.currentRoom.name) {
          switch (door.userData.direction) {
            case "up":
              this.inView.up = true;
              break;
            case "right":
              this.inView.right = true;
              break;
            case "down":
              this.inView.down = true;
              break;
            case "left":
              this.inView.left = true;
              break;
            default:
              this.inView.up = false;
              this.inView.right = false;
              this.inView.down = false;
              this.inView.left = false;
              break;
          }
        }
      }
    },
    moveToRoom: function (coordinates, offset, room, stage) {
      if (this.isMoving) {
        return;
      } else {
        this.startPage.stageInvisible = true;
        this.isMoving = true;
        const duration = 2;
        const delay = 2;
        const y = -20;
        this.controls.enabled = false;
        console.log("stage ", stage);
        console.log("room", room);

        gsap.fromTo(
          this.camera.position,
          {
            x: this.camera.position.x,
            y: this.camera.position.y,
            z: this.camera.position.z,
          },
          {
            x: offset.x / 2,
            y: y,
            z: offset.z / 2,
            duration: duration,
            ease: "sine.out",
          }
        );

        gsap.fromTo(
          this.camera.position,
          {
            x: offset.x / 2,
            y: y,
            z: offset.z / 2,
          },
          {
            x: offset.x,
            y: offset.y,
            z: offset.z,
            delay: delay,
            duration: duration,
            ease: "sine.in",
          }
        );

        gsap.fromTo(
          this.controls.target,
          {
            x: this.controls.target.x,
            y: this.controls.target.y,
            z: this.controls.target.z,
          },
          {
            x: offset.x / 2,
            y: y,
            z: offset.z / 2,
            duration: duration,
            ease: "sine.out",
          }
        );

        gsap.fromTo(
          this.controls.target,
          {
            x: offset.x / 2,
            y: y,
            z: offset.z / 2,
          },
          {
            x: coordinates.x,
            y: coordinates.y,
            z: coordinates.z,
            delay: delay,
            duration: duration,
            ease: "sine.in",
          }
        );

        for (const r of this.rooms) {
          if (
            r.userData.name === this.currentRoom.userData.name ||
            r.userData.name === room
          ) {
            r.visible = true;
          } else {
            r.visible = false;
          }
        }

        setTimeout(() => {
          this.controls.enabled = true;
          this.controls.target.set(coordinates.x, coordinates.y, coordinates.z);
          this.currentRoom.visible = false;
          this.currentRoom = this.scene.getObjectByName(room);
          this.currentRoom.visible = true;
          this.camera.updateProjectionMatrix();
          this.startPage.stage = stage;
          this.startPage.stageInvisible = false;
          this.isMoving = false;
        }, 4000);
      }
    },
    addRoom: function (
      room,
      name,
      visible,
      width,
      height,
      depth,
      color,
      posX,
      posY,
      posZ,
      doorOptions
    ) {
      const geometry = new THREE.BoxGeometry(width, height, depth);
      const material = new THREE.MeshStandardMaterial({
        color: color,
        side: THREE.BackSide,
      });

      room = new THREE.Group();

      const roomInstance = new THREE.Mesh(geometry, material);
      roomInstance.name = "Room";

      //this.roomUp.castShadow = true;

      //room.position.set(posX, posY, posZ);
      roomInstance.receiveShadow = true;

      this.addDoorModels(
        name,
        width,
        height,
        depth,
        posX,
        posY,
        posZ,
        doorOptions
      );

      const light = new THREE.PointLight(0xffffff, 1, 300, 1);
      light.position.set(0, 35, 0);
      light.castShadow = false;
      light.shadow.mapSize.width = 512; // default
      light.shadow.mapSize.height = 512; // default
      light.shadow.camera.near = 0.5; // default
      light.shadow.camera.far = 500; // default

      room.add(roomInstance, light);
      room.position.set(posX, posY, posZ);
      room.visible = visible;
      room.name = name;
      room.userData.isRoom = true;
      room.userData.name = name;

      this.rooms.push(room);
      this.scene.add(room);
    },

    cameraReveal: function () {
      gsap.fromTo(
        this.camera.position,
        {
          x: 5,
          y: -2,
          z: 0,
        },
        {
          x: 30.011,
          y: 9.746,
          z: 6.955,
          duration: 3,
          ease: "sine.inOut",
        }
      );
      gsap.fromTo(
        this.camera.rotation,
        {
          x: 1.5707963267948954,
          y: 1.1902899496825314,
          z: -1.5707963267948954,
        },
        {
          x: -0.9509,
          y: 1.1911,
          z: 0.9156,
          duration: 3,
          ease: "sine.inOut",
        }
      );
      setTimeout(() => {
        this.camera.updateProjectionMatrix();
        this.controls.enabled = true;
      }, 3000);
    },

    createSymbol: function (direction) {
      let icon, pointingIcon, x, y;

      const material = new THREE.MeshStandardMaterial({
        color: 0xf7d4e1,
        emissive: 0xf7d4e1,
        emissiveIntensity: 1,
        metalness: 0.3,
      });

      switch (true) {
        case direction === "up":
          icon = "☝";
          x = -3;
          y = -14;
          break;
        case direction === "left":
          icon = "☜";
          x = -4.3;
          y = -13;
          break;
        case direction === "down":
          icon = "☟";
          x = -3;
          y = -14;
          break;
        case direction === "right":
          icon = "☞";
          x = -4.5;
          y = -13;
          break;
      }

      return this.fontLoader.load(
        "./assets/fonts/Noto Sans Symbols 2_Regular.json",
        (font) => {
          const textGeometry = new TextGeometry(icon, {
            font: font,
            size: 5,
            height: 0.2,
            curveSegments: 5,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: 0.1,
            bevelOffset: -0.05,
            bevelSegments: 5,
          });

          textGeometry.computeBoundingBox();

          pointingIcon = new THREE.Mesh(textGeometry, material);
          pointingIcon.position.set(x, y, 0);

          const currentSign = this.signModels[this.signIndexSymbols];
          currentSign.add(pointingIcon);
          this.signIndexSymbols += 1;
        }
      );
    },

    createText: function (text) {
      const material = new THREE.MeshStandardMaterial({
        color: 0xf7d4e1,
        emissive: 0xf7d4e1,
        emissiveIntensity: 1,
        metalness: 0.3,
      });
      let signText;

      this.fontLoader.load("./assets/fonts/Arimo_Bold.json", async (font) => {
        const textGeometry = new TextGeometry(text, {
          font: font,
          size: 1,
          height: 0.2,
          curveSegments: 8,
          bevelEnabled: true,
          bevelThickness: 0.1,
          bevelSize: 0.1,
          bevelOffset: -0.07,
          bevelSegments: 8,
        });

        textGeometry.computeBoundingBox();

        signText = new THREE.Mesh(textGeometry, material);
        signText.position.set(-4, -0.4, 0);
        const currentSign = this.signModels[this.signIndexTexts];
        currentSign.add(signText);
        this.signIndexTexts += 1;
      });
    },

    addSign: function (direction, text) {
      const signModel = new THREE.Group();
      const signFrame = new THREE.Group();
      const material = new THREE.MeshStandardMaterial({ color: 0xf2b67c });
      const part1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 6, 0.5),
        material
      );
      part1.position.set(-5.5, 0);

      const part2 = new THREE.Mesh(
        new THREE.BoxGeometry(10.5, 0.5, 0.5),
        material
      );
      part2.position.set(0, -2.75);

      const part3 = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 6, 0.5),
        material
      );
      part3.position.set(5.5, 0);

      const part4 = new THREE.Mesh(
        new THREE.BoxGeometry(10.5, 0.5, 0.5),
        material
      );
      part4.position.set(0, 2.75);

      signFrame.add(part1, part2, part3, part4);

      const sign = new THREE.Mesh(new THREE.PlaneGeometry(11, 5), material);

      this.createSymbol(direction);
      this.createText(text);

      signModel.add(signFrame, sign);

      return signModel;
    },

    constructDoor: function (room, direction, sign) {
      const doorFrameShape = new THREE.Shape();
      doorFrameShape.moveTo(0, 0);
      doorFrameShape.lineTo(1, 0);
      doorFrameShape.lineTo(1, 20);
      doorFrameShape.lineTo(12, 20);
      doorFrameShape.lineTo(12, 0);
      doorFrameShape.lineTo(13, 0);
      doorFrameShape.lineTo(13, 21);
      doorFrameShape.lineTo(0, 21);
      doorFrameShape.lineTo(0, 0);

      const extrudeSettings = {
        depth: 0.5,
        bevelEnabled: true,
        bevelSegments: 1,
        steps: 1,
        bevelSize: 0,

        bevelThickness: 0.5,
      };

      const doorFrameGeometry = new THREE.ExtrudeGeometry(
        doorFrameShape,
        extrudeSettings
      );

      const doorFrameMaterial = new THREE.MeshStandardMaterial({
        color: 0xdb3774,
      });
      const doorFrame = new THREE.Mesh(doorFrameGeometry, doorFrameMaterial);
      doorFrame.receiveShadow = true;
      doorFrame.castShadow = true;
      doorFrame.position.set(-6, -5.5, -1.3);

      const doorGeometry = new THREE.BoxGeometry(12, 20, 1);
      const doorMaterial = new THREE.MeshStandardMaterial({
        color: 0xf2b67c,
        side: THREE.DoubleSide,
      });
      const door = new THREE.Mesh(doorGeometry, doorMaterial);
      door.receiveShadow = true;
      door.castShadow = true;
      door.userData.clickable = true;
      door.userData.name = "DOOR";
      door.userData.direction = direction;
      door.userData.sign = sign;
      door.userData.room = room;
      door.position.set(0, 5, -1);
      door.name = "Door";

      const doorKnobGeometry = new THREE.SphereGeometry(0.5, 10, 10);
      const doorKnobMaterial = new THREE.MeshStandardMaterial({
        color: 0x8fe1f2,
        side: THREE.DoubleSide,
      });

      const doorKnobOne = new THREE.Mesh(doorKnobGeometry, doorKnobMaterial);
      doorKnobOne.receiveShadow = true;
      doorKnobOne.castShadow = true;

      doorKnobOne.position.set(4, 4, -0.5);

      const doorModel = new THREE.Group();
      doorModel.add(doorFrame, door, doorKnobOne);
      doorModel.name = "DoorModel";
      return doorModel;
    },

    addDoorModels: function (
      room,
      width,
      height,
      depth,
      posX,
      posY,
      posZ,
      options
    ) {
      const doors = options.doors;

      for (const i of doors) {
        if (typeof i === "object") {
          switch (true) {
            case i.direction === "up":
              {
                const doorModel = this.constructDoor(room, i.direction, i.sign);
                doorModel.position.set(
                  posX,
                  -(height / 2) + 5 + posY,
                  -(depth / 2) + 1 + posZ
                );
                doorModel.rotation.set(0, THREE.MathUtils.degToRad(0), 0);

                const signModel = this.addSign(i.direction, i.sign);

                signModel.position.set(
                  posX + 0.5,
                  -(height / 2) + 25 + posY,
                  -(depth / 2) + 0.3 + posZ
                );
                signModel.rotation.set(0, THREE.MathUtils.degToRad(0), 0);

                this.signModels.push(signModel);

                this.scene.add(doorModel, signModel);
              }
              break;
            case i.direction === "right":
              {
                const doorModel = this.constructDoor(room, i.direction, i.sign);
                doorModel.position.set(
                  width / 2 - 1 + posX,
                  -(height / 2) + 5 + posY,
                  posZ - 0.3
                );
                doorModel.rotation.set(0, THREE.MathUtils.degToRad(270), 0);

                const signModel = this.addSign(i.direction, i.sign);
                signModel.position.set(
                  width / 2 - 0.3 + posX,
                  -(height / 2) + 25 + posY,
                  posZ + 0.3
                );
                signModel.rotation.set(0, THREE.MathUtils.degToRad(270), 0);

                this.signModels.push(signModel);

                this.scene.add(doorModel, signModel);
              }
              break;
            case i.direction === "down":
              {
                const doorModel = this.constructDoor(room, i.direction, i.sign);
                doorModel.position.set(
                  posX,
                  -(height / 2) + 5 + posY,
                  depth / 2 - 1 + posZ
                );
                doorModel.rotation.set(0, THREE.MathUtils.degToRad(180), 0);

                const signModel = this.addSign(i.direction, i.sign);
                signModel.position.set(
                  posX - 0.5,
                  -(height / 2) + 25 + posY,
                  depth / 2 - 0.3 + posZ
                );
                signModel.rotation.set(0, THREE.MathUtils.degToRad(180), 0);

                this.signModels.push(signModel);

                this.scene.add(doorModel, signModel);
              }
              break;
            case i.direction === "left":
              {
                const doorModel = this.constructDoor(room, i.direction, i.sign);
                doorModel.position.set(
                  -(width / 2) + 1 + posX,
                  -(height / 2) + 5 + posY,
                  posZ
                );
                doorModel.rotation.set(0, THREE.MathUtils.degToRad(90), 0);

                const signModel = this.addSign(i.direction, i.sign);
                signModel.position.set(
                  -(width / 2) + 0.3 + posX,
                  -(height / 2) + 25 + posY,
                  posZ - 0.5
                );
                signModel.rotation.set(0, THREE.MathUtils.degToRad(90), 0);

                this.signModels.push(signModel);

                this.scene.add(doorModel, signModel);
              }
              break;
            default:
              break;
          }
        }
      }
    },

    addTorus: function () {
      const geometry = new THREE.TorusGeometry(25, 5, 20, 50);

      /*
      const material = this.loadTextures(
        "./assets/materials/chipping-painted-wall/chipping-painted-wall_albedo.png",
        "./assets/materials/chipping-painted-wall/chipping-painted-wall_normal-ogl.png",
        "./assets/materials/chipping-painted-wall/chipping-painted-wall_height.png",
        "./assets/materials/chipping-painted-wall/chipping-painted-wall_roughness.png",
        "./assets/materials/chipping-painted-wall/chipping-painted-wall_ao.png",
        "./assets/materials/chipping-painted-wall/chipping-painted-wall_metallic.png",
        0.05,
        0.5,
        1
      );
     

      const material = this.loadTextures(
        "./assets/materials/alien-panels/alien-panels_albedo.png",
        "./assets/materials/alien-panels/alien-panels_normal-ogl.png",
        "./assets/materials/alien-panels/alien-panels_height.png",
        "./assets/materials/alien-panels/alien-panels_roughness.png",
        "./assets/materials/alien-panels/alien-panels_ao.png",
        "./assets/materials/alien-panels/alien-panels_metallic.png",
        0.05,
        0.5,
        1
      );
      
       */

      const material = new THREE.MeshBasicMaterial({
        color: 0xed872d,
        wireframe: true,
      });

      this.torus = new THREE.Mesh(geometry, material);
      //this.torus.geometry.attributes.uv2 = this.torus.geometry.attributes.uv;
      this.scene.add(this.torus);
    },

    draw3dLine: function (predictions) {
      const video = this.$root.$refs.VideoBoxOffscreen.$refs.video;
      const webcam = this.$root.$refs.WebCam;
      const cv = document.getElementById("canvas-hand");

      const diffWidth = video.offsetWidth - cv.width;
      const diffHeight = video.offsetHeight - cv.height;
      const scaleX = video.offsetWidth / webcam.streamOutput.width;
      const scaleY = video.offsetHeight / webcam.streamOutput.height;
      webcam.dx = cv.width / 2;
      webcam.dy = cv.height / 2;

      if (predictions.length > 0) {
        predictions.forEach((prediction) => {
          const landmarks = prediction.landmarks;
          this.hx = landmarks[0][0] * scaleX - diffWidth;
          this.hy = landmarks[0][1] * scaleY - diffHeight;
          for (let i = 0; i < landmarks.length; i++) {
            const x = landmarks[i][0] * scaleX - diffWidth;
            const y = landmarks[i][1] * scaleY - diffHeight;
            const z = landmarks[i][2];

            const geometry = new THREE.SphereGeometry(5, 32, 16);
            const material = new THREE.MeshBasicMaterial({
              color: 0xff6347,
            });
            const sphere = new THREE.Mesh(geometry, material);

            sphere.position.set(x, y, z);

            this.scene.add(sphere);
          }
          for (let j = 0; j < Object.keys(webcam.fingerJoints).length; j++) {
            /*
            const finger = Object.keys(webcam.fingerJoints)[j];
            //  Loop through pairs of joints
            for (let k = 0; k < webcam.fingerJoints[finger].length - 1; k++) {
              // Get pairs of joints
              //const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
              //const points = [];
              const firstJointIndex = webcam.fingerJoints[finger][k];
              const secondJointIndex = webcam.fingerJoints[finger][k + 1];

              // Draw path
              this.ctx.beginPath();
              this.ctx.moveTo(
                landmarks[firstJointIndex][0] * scaleX - diffWidth,
                landmarks[firstJointIndex][1] * scaleY - diffHeight
              );
              this.ctx.lineTo(
                landmarks[secondJointIndex][0] * scaleX - diffWidth,
                landmarks[secondJointIndex][1] * scaleY - diffHeight
              );
              this.ctx.strokeStyle = "#71C6E0";
              this.ctx.lineWidth = 4;
              this.ctx.stroke();
            }
            */
          }
        });
      }
    },

    loadTextures: function (
      pathBaseColor,
      pathNormalMap,
      pathHeightMap,
      pathRoughnessMap,
      pathAmbientOcclusionsMap,
      pathMetallic,
      displacementScale,
      roughness,
      metalness,
      emissive,
      emissiveIntensity
    ) {
      const baseColor = this.textureLoader.load(pathBaseColor);
      const normalMap = this.textureLoader.load(pathNormalMap);
      const heightMap = this.textureLoader.load(pathHeightMap);
      const roughnessMap = this.textureLoader.load(pathRoughnessMap);
      const ambientOcclusionsMap = this.textureLoader.load(
        pathAmbientOcclusionsMap
      );
      const metallic = this.textureLoader.load(pathMetallic);

      return (this.material = new THREE.MeshStandardMaterial({
        map: baseColor,
        normalMap: normalMap,
        displacementMap: heightMap,
        displacementScale: displacementScale,
        roughnessMap: roughnessMap,
        roughness: roughness,
        aoMap: ambientOcclusionsMap,
        metalnessMap: metallic,
        metalness: metalness,
        emissive: emissive,
        emissiveIntensity: emissiveIntensity,
      }));
    },

    addVideoCube: function (videoID) {
      const video = document.getElementById(videoID);
      this.videoTexture = new THREE.VideoTexture(video);
      const videoMaterial = new THREE.MeshBasicMaterial({
        map: this.videoTexture,
        side: THREE.FrontSide,
        toneMapped: false,
      });
      const cylinderGeometry = new THREE.CylinderGeometry(
        5.5,
        3,
        4,
        4,
        8,
        false,
        Math.PI
      );

      /*
      const material = this.loadTextures(
        "./assets/materials/alien-panels/alien-panels_albedo.png",
        "./assets/materials/alien-panels/alien-panels_normal-ogl.png",
        "./assets/materials/alien-panels/alien-panels_height.png",
        "./assets/materials/alien-panels/alien-panels_roughness.png",
        "./assets/materials/alien-panels/alien-panels_ao.png",
        "./assets/materials/alien-panels/alien-panels_metallic.png",
        0.05,
        0.5,
        1
      );
      
    

      const material = this.loadTextures(
        "./assets/materials/cog-patterned-metal/cog-patterned-metal_albedo.png",
        "./assets/materials/cog-patterned-metal/cog-patterned-metal_normal-ogl.png",
        "./assets/materials/cog-patterned-metal/cog-patterned-metal_height.png",
        "./assets/materials/cog-patterned-metal/cog-patterned-metal_roughness.png",
        "./assets/materials/cog-patterned-metal/cog-patterned-metal_ao.png",
        "./assets/materials/cog-patterned-metal/cog-patterned-metal_metallic.png",
        0.05,
        0.5,
        1
      );
      
        */

      const material = new THREE.MeshStandardMaterial({
        color: 0x6fa8dc,
      });

      //const boxGeometry = new THREE.BoxGeometry(6.4, 4.8, 1);
      const planeGeometry = new THREE.PlaneGeometry(6.4, 4.8);

      const screenHolder = new THREE.Mesh(cylinderGeometry, material);
      screenHolder.castShadow = true;
      screenHolder.receiveShadow = true;
      const screen = new THREE.Mesh(planeGeometry, videoMaterial);
      screenHolder.position.setZ(-2.1);
      screenHolder.rotation.set(
        THREE.MathUtils.degToRad(270),
        THREE.MathUtils.degToRad(45),
        THREE.MathUtils.degToRad(180)
      );

      this.videoCube = new THREE.Group();
      this.videoCube.add(screen);
      this.videoCube.add(screenHolder);
      this.videoCube.castShadow = true;
      this.videoCube.receiveShadow = true;

      this.videoCubeVisible = true;

      this.scene.add(this.videoCube);
    },

    rotateVideoCube: function (cube, event) {
      if (event.isComposing || event.code === "ArrowUp") {
        cube.rotation.x -= 0.00002;
      }
      if (event.isComposing || event.code === "ArrowRight") {
        cube.rotation.y += 0.00002;
      }
      if (event.isComposing || event.code === "ArrowDown") {
        cube.rotation.x += 0.00002;
      }
      if (event.isComposing || event.code === "ArrowLeft") {
        cube.rotation.y -= 0.00002;
      }
    },

    makeScene: function (elem) {
      const scene = new THREE.Scene();

      const fov = 45;
      const aspect = 2; // the canvas default
      const near = 0.1;
      const far = 5;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.z = 2;
      camera.position.set(0, 1, 2);
      camera.lookAt(0, 0, 0);

      {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
      }

      return { scene, camera, elem };
    },

    setupSceneHand: function () {
      const sceneInfo = this.makeScene(document.getElementById("canvas-hand"));
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshPhongMaterial({ color: "red" });
      const mesh = new THREE.Mesh(geometry, material);
      sceneInfo.scene.add(mesh);
      sceneInfo.mesh = mesh;
      return sceneInfo;
    },

    renderSceneInfo: function (sceneInfo) {
      const { scene, camera, elem } = sceneInfo;

      // get the viewport relative position of this element
      const { left, right, top, bottom, width, height } =
        elem.getBoundingClientRect();

      const isOffscreen =
        bottom < 0 ||
        top > this.renderer.domElement.clientHeight ||
        right < 0 ||
        left > this.renderer.domElement.clientWidth;

      if (isOffscreen) {
        return;
      }

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      const positiveYUpBottom = this.renderer.domElement.height - bottom;
      this.renderer.setScissor(left, positiveYUpBottom, width, height);
      this.renderer.setViewport(left, positiveYUpBottom, width, height);

      this.renderer.render(scene, camera);
    },

    animate: function () {
      /*
      this.torus.rotation.x += 0.001;
      this.torus.rotation.y += 0.002;
      this.torus.rotation.z += 0.0004;
      */
      this.cameraPosition.x = this.camera.position.x;
      this.cameraPosition.y = this.camera.position.y;
      this.cameraPosition.z = this.camera.position.z;
      this.cameraPosition.rotation = this.camera.rotation;
      this.cameraPosition.zoom = this.camera.zoom;
      //this.renderSceneInfo(this.canvasHand);
      addEventListener("keydown", (event) => {
        if (this.videoCubeVisible) {
          this.rotateVideoCube(this.videoCube, event);
        }
      });

      // console.log(this.currentRoom.userData.name);
      // console.log(this.startPage.stage);

      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
    },

    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
  },
};
</script>

<style lang="scss" scoped>
#canvas-bg {
  position: fixed;
  top: 0;
  left: 0;
}

#canvas-hand {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 25vw;
  height: 33vh;
}
</style>

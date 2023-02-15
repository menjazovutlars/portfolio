<template>
  <v-container class="canvas-bg-container">
    <canvas id="canvas-bg" :class="['canvas-bg']"></canvas>
    <MiniMap id="canvas-hand"></MiniMap>
    <StageBackground></StageBackground>
    <div id="iframe_container"></div>
    <!-- <span id="canvas-hand">
      <p>x:{{ cameraPosition.x }}</p>
      <p>y:{{ cameraPosition.y }}</p>
      <p>z:{{ cameraPosition.z }}</p>
      <p>rotX:{{ cameraPosition.rotation.x }}</p>
      <p>rotY:{{ cameraPosition.rotation.y }}</p>
      <p>rotZ:{{ cameraPosition.rotation.z }}</p>
      <p>zoom:{{ cameraPosition.zoom }}</p>
    </span> -->
  </v-container>
</template>

<script>
import * as THREE from "three";
//import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
//import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
// import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
// import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import gsap from "gsap";

import MiniMap from "./MiniMap.vue";
import StageBackground from "./StageBackground.vue";

/*
0xDB3774
0xE3E8AE
0x8FE1F2
0x8C95E6
0xF2B67C

*/

export default {
  name: "CanvasBG",
  components: {
    MiniMap,
    StageBackground,
  },
  data: function () {
    return {
      scene: "",
      scale: 1,
      camera: "",
      cameraPosition: { x: "", y: "", z: "", rotation: "" },
      cameraHand: "",
      renderer: "",
      css3DRenderer: "",
      iframeContainer: "",
      torus: "",
      objLoader: "",
      mtlLoader: "",
      controls: "",
      trackballControls: "",
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
      videoWallTexture: "",
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
      miniMap: "",
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
      fullWhiteBackground: true,
      activateAnimation: false,
      toLeft: false,
    };
  },
  created() {
    this.$root.$refs.CanvasBG = this;
  },
  mounted() {
    this.canvas = document.getElementById("canvas-bg");
    this.iframeContainer = document.getElementById("iframe_container");
    this.startPage = this.$root.$refs.StartPage;
    this.miniMap = this.$root.$refs.MiniMap;
    this.initTHREE();
    this.animate();

    // this.canvasHand = this.setupSceneHand();
  },
  methods: {
    initTHREE: function () {
      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / 2 / window.innerHeight,
        0.1,
        1000
      );

      this.camera.position.set(5 * this.scale, -2 * this.scale, 0 * this.scale);

      this.renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#canvas-bg"),
        alpha: true,
      });

      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth / 2, window.innerHeight);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.zoomSpeed = 5 * this.scale;
      //this.controls.enabled = false;
      this.controls.enableZoom = true;
      // this.controls.enablePan = false;
      // this.controls.maxDistance = 40 * this.scale;

      this.raycaster = new THREE.Raycaster();
      this.raycaster.firstHitOnly = true;

      this.textureLoader = new THREE.TextureLoader();
      this.fontLoader = new FontLoader();

      const pPCenter = this.startPage.pPCenter;
      const pPUp = this.startPage.pPUp;
      const pPRight = this.startPage.pPRight;
      const pPDown = this.startPage.pPDown;
      const pPLeft = this.startPage.pPLeft;
      //this.createText();
      //this.createSymbol();

      //const fistIcon = "e769";

      this.addRoom(
        this.roomCenter,
        pPCenter,
        true,
        80 * this.scale,
        80 * this.scale,
        100 * this.scale,
        0x8fe1f2,
        0,
        0,
        0,
        {
          doors: [
            {
              direction: "up",
              sign: pPUp.data().room,
            },
            {
              direction: "right",
              sign: pPRight.data().room,
            },
            {
              direction: "down",
              sign: pPDown.data().room,
            },
            {
              direction: "left",
              sign: pPLeft.data().room,
            },
          ],
        },
        {
          objects: [],
        }
      );

      //0xf257 = peace
      //0xf256 = hand
      //0xf255 = fist
      //0xf164 = thumbsup
      //0xf259 = spock
      //0xf806 = middlefinger

      this.addRoom(
        this.roomUp,
        pPUp,
        false,
        80 * this.scale,
        80 * this.scale,
        100 * this.scale,
        0xf2b67c,
        0,
        0,
        -102 * this.scale,
        {
          doors: [
            {
              direction: "down",
              sign: pPCenter.data().room,
            },
          ],
        },
        {
          objects: [
            {
              oX: 25 * this.scale,
              oY: -32 * this.scale,
              oZ: -38 * this.scale,
              rotation: 315,
              icon: String.fromCodePoint(0xf806),
              linkTo: "Website",
            },
            {
              oX: 29 * this.scale,
              oY: -32 * this.scale,
              oZ: 32 * this.scale,
              rotation: 225,
              icon: String.fromCodePoint(0xf255),
              linkTo: "AboutTrack",
            },
            {
              oX: -30 * this.scale,
              oY: -32 * this.scale,
              oZ: -35 * this.scale,
              rotation: 30,
              icon: String.fromCodePoint(0xf259),
              linkTo: "TrailerTrack",
            },
            {
              oX: -28 * this.scale,
              oY: -32 * this.scale,
              oZ: 33 * this.scale,
              rotation: 330,
              icon: String.fromCodePoint(0xf257),
              linkTo: "RandomStuff",
            },
          ],
        }
      );

      this.addRoom(
        this.roomRight,
        pPRight,
        false,
        80 * this.scale,
        80 * this.scale,
        100 * this.scale,
        0x8fe1f2,
        82 * this.scale,
        0,
        0,
        {
          doors: [
            {
              direction: "left",
              sign: pPCenter.data().room,
            },
          ],
        },
        {
          objects: [
            {
              oX: 29 * this.scale,
              oY: -32 * this.scale,
              oZ: 32 * this.scale,
              rotation: 225,
              icon: String.fromCodePoint(0xf256),
              linkTo: "AboutTrack",
            },
            {
              oX: 25 * this.scale,
              oY: -32 * this.scale,
              oZ: -38 * this.scale,
              rotation: 315,
              icon: String.fromCodePoint(0xf25b),
              linkTo: "Website",
            },
            {
              oX: -30 * this.scale,
              oY: -32 * this.scale,
              oZ: -35 * this.scale,
              rotation: 30,
              icon: String.fromCodePoint(0xf6de),
              linkTo: "Video",
            },
            {
              oX: -28 * this.scale,
              oY: -32 * this.scale,
              oZ: 33 * this.scale,
              rotation: 330,
              icon: String.fromCodePoint(0xf806),
              linkTo: "RandomStuff",
            },
          ],
        }
      );

      this.addRoom(
        this.roomDown,
        pPDown,
        false,
        80 * this.scale,
        80 * this.scale,
        100 * this.scale,
        0x8fe1f2,
        0,
        0,
        102 * this.scale,
        {
          doors: [
            {
              direction: "up",
              sign: pPCenter.data().room,
            },
          ],
        },
        {
          objects: [
            {
              oX: 29 * this.scale,
              oY: -32 * this.scale,
              oZ: 32 * this.scale,
              rotation: 225,
              icon: String.fromCodePoint(0xf256),
              linkTo: "AboutTrack",
            },
            {
              oX: 25 * this.scale,
              oY: -32 * this.scale,
              oZ: -38 * this.scale,
              rotation: 315,
              icon: String.fromCodePoint(0xf25b),
              linkTo: "Website",
            },
            {
              oX: -30 * this.scale,
              oY: -32 * this.scale,
              oZ: -35 * this.scale,
              rotation: 30,
              icon: String.fromCodePoint(0xf6de),
              linkTo: "Video",
            },
            {
              oX: -28 * this.scale,
              oY: -32 * this.scale,
              oZ: 33 * this.scale,
              rotation: 330,
              icon: String.fromCodePoint(0xf806),
              linkTo: "RandomStuff",
            },
          ],
        }
      );

      this.addRoom(
        this.roomLeft,
        pPLeft,
        false,
        80 * this.scale,
        80 * this.scale,
        100 * this.scale,
        0x8fe1f2,
        -82 * this.scale,
        0,
        0,
        {
          doors: [
            {
              direction: "right",
              sign: pPCenter.data().room,
            },
          ],
        },
        {
          objects: [
            {
              oX: 29 * this.scale,
              oY: -32 * this.scale,
              oZ: 32 * this.scale,
              rotation: 225,
              icon: String.fromCodePoint(0xf256),
              linkTo: "AboutTrack",
            },
            {
              oX: 25 * this.scale,
              oY: -32 * this.scale,
              oZ: -38 * this.scale,
              rotation: 315,
              icon: String.fromCodePoint(0xf25b),
              linkTo: "Website",
            },
            {
              oX: -30 * this.scale,
              oY: -32 * this.scale,
              oZ: -35 * this.scale,
              rotation: 30,
              icon: String.fromCodePoint(0xf6de),
              linkTo: "Video",
            },
            {
              oX: -28 * this.scale,
              oY: -32 * this.scale,
              oZ: 33 * this.scale,
              rotation: 330,
              icon: String.fromCodePoint(0xf806),
              linkTo: "RandomStuff",
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
        if (this.clickable) {
          this.clickable = null;
          return;
        }
        this.clickMouse.x = (e.clientX / window.innerWidth) * 4 - 1;
        this.clickMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

        console.log(this.clickMouse.x, this.clickMouse.y);
        console.log(e.clientX, e.clientY);

        this.raycaster.setFromCamera(this.clickMouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0 && intersects[0].object.userData.clickable) {
          this.clickable = intersects[0].object;

          this.onDoorClick();
          this.onObjectClick();
        }
      });

      window.addEventListener("resize", this.onWindowResize);
    },
    onObjectClick: function () {
      if (this.clickable.userData.name === "Object") {
        console.log("clickable user data", this.clickable.userData.linkTo);

        if (this.startPage.stage === this.clickable.userData.linkTo) {
          this.startPage.stage = this.clickable.userData.defaultStage;
        } else {
          this.startPage.stage = this.clickable.userData.linkTo;
        }
      }
    },
    onDoorClick: function () {
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
          console.log("intersects", intersects);
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
        const targetRoom = this.scene.getObjectByName(room);
        this.currentRoom.children[1].castShadow = false;

        targetRoom.children[1].castShadow = false;
        targetRoom.children[1].visible = false;

        this.controls.enabled = false;

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
          targetRoom.children[1].castShadow = true;
          this.controls.enabled = true;
          this.controls.target.set(coordinates.x, coordinates.y, coordinates.z);
          this.currentRoom.visible = false;
          this.currentRoom = targetRoom;
          this.currentRoom.visible = true;
          this.currentRoom.children[1].visible = true;
          this.camera.updateProjectionMatrix();
          this.miniMap.currentRoom = stage;
          this.startPage.stage = stage;
          this.startPage.stageInvisible = false;
          this.isMoving = false;
        }, 4000);
      }
    },
    addRoom: function (
      room,
      projectPage,
      visible,
      width,
      height,
      depth,
      color,
      posX,
      posY,
      posZ,
      doorOptions,
      objects
    ) {
      const geometry = new THREE.BoxGeometry(width, height, depth);
      const material = new THREE.MeshStandardMaterial({
        color: color,
        side: THREE.BackSide,
      });

      room = new THREE.Group();

      const roomInstance = new THREE.Mesh(geometry, material);
      roomInstance.name = "Room";
      roomInstance.receiveShadow = true;

      this.addDoorModels(
        projectPage.room,
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
      light.castShadow = true;
      light.shadow.mapSize.width = 2048; // default
      light.shadow.mapSize.height = 2048; // default
      light.shadow.camera.near = 0.5; // default
      light.shadow.camera.far = 1000; // default

      room.add(roomInstance, light);
      room.position.set(posX, posY, posZ);
      room.visible = visible;
      room.name = projectPage.data().room;
      room.userData.isRoom = true;
      room.userData.name = projectPage.data().room;

      console.log(objects);

      for (const object of objects.objects) {
        this.createRoomObject(object, room, projectPage);
      }

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

    createRoomObject(object, room, projectPage) {
      //Socket
      const oX = object.oX,
        oY = object.oY,
        oZ = object.oZ,
        rotation = object.rotation,
        icon = object.icon,
        linkTo = object.linkTo,
        pX = room.position.x,
        pY = room.position.y,
        pZ = room.position.z;

      const objectModel = new THREE.Group();

      const socketGeometry = new THREE.CylinderGeometry(10, 3, 11, 8, 5);

      const socketMaterial = new THREE.MeshStandardMaterial({
        color: 0x8fe1f2,
      });

      const socket = new THREE.Mesh(socketGeometry, socketMaterial);
      socket.position.set(3.5, -3.5, 0);
      socket.rotation.set(0, THREE.MathUtils.degToRad(45), 0);
      socket.receiveShadow = true;
      socket.castShadow = true;

      objectModel.add(socket);

      const objectMaterial = new THREE.MeshStandardMaterial({
        color: 0xf7d4e1,
        emissive: 0xf7d4e1,
        emissiveIntensity: 1,
        metalness: 0.3,
      });

      this.fontLoader.load(
        "./assets/fonts/Font Awesome 6 Free Solid_Solid.json",
        (font) => {
          const objectGeometry = new TextGeometry(icon, {
            font: font,
            size: 10,
            height: 0.2,
            curveSegments: 5,
            bevelEnabled: true,
            bevelThickness: 1.5,
            bevelSize: 0.1,
            bevelOffset: -0.1,
            bevelSegments: 5,
          });

          objectGeometry.computeBoundingBox();

          const object = new THREE.Mesh(objectGeometry, objectMaterial);
          object.position.set(-2.5, 5, 0);
          object.castShadow = true;
          object.receiveShadow = true;
          object.userData.clickable = true;
          object.userData.name = "Object";
          object.userData.linkTo = linkTo;
          object.userData.defaultStage = projectPage.name;

          objectModel.add(object);
          objectModel.position.set(oX + pX, oY + pY, oZ + pZ);
          objectModel.rotation.set(0, THREE.MathUtils.degToRad(rotation), 0);
          room.add(objectModel);
          this.scene.add(objectModel);
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
      signFrame.castShadow = true;
      signFrame.receiveShadow = true;

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
      door.castShadow = false;
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

      const material = new THREE.MeshStandardMaterial({
        color: 0x6fa8dc,
      });

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

    animate: function () {
      this.cameraPosition.x = this.camera.position.x;
      this.cameraPosition.y = this.camera.position.y;
      this.cameraPosition.z = this.camera.position.z;
      this.cameraPosition.rotation = this.camera.rotation;
      this.cameraPosition.zoom = this.camera.zoom;

      addEventListener("keydown", (event) => {
        if (this.videoCubeVisible) {
          this.rotateVideoCube(this.videoCube, event);
        }
      });

      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
    },

    onWindowResize() {
      this.camera.aspect = window.innerWidth / 2 / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth / 2, window.innerHeight);
    },
  },
};
</script>

<style lang="scss" scoped>
.canvas-bg {
  position: fixed;
  top: 0;
  right: 50vw;
  width: 50vw !important;
}

#iframe_container {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
}

#canvas-hand {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 25vw;
  height: 33vh;
}
</style>

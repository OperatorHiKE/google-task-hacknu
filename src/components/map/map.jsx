import { Loader } from '@googlemaps/js-api-loader';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import './map.css';
import { useEffect } from 'react';

const Map = ({ lng, lat }) => {
	useEffect(() => {
		const mapOptions = {
			tilt: 0,
			heading: 0,
			zoom: 18,
			center: { lat, lng },
			mapId: '20159b5586cba0ad',
			disableDefaultUI: true,
		};

		const apiLoader = new Loader({
			apiKey: 'AIzaSyAnbAD_1D0e6jNmFTA6P8kBAA2zs4TOlx0',
			version: 'beta',
		});

		const initMap = async () => {
			await apiLoader.load().then((google) => {
				initWebGLOverlayView(
					new google.maps.Map(document.getElementById('map'), mapOptions)
				);
			});
		};

		const initWebGLOverlayView = (map) => {
			let scene, renderer, camera, loader;

			apiLoader.load().then((google) => {
				const webGLOverlayView = new google.maps.WebGLOverlayView();

				webGLOverlayView.onAdd = () => {
					scene = new THREE.Scene();
					camera = new THREE.PerspectiveCamera();
					const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
					scene.add(ambientLight);

					loader = new GLTFLoader();
					const source = './pin.gltf';

					loader.load(source, (gltf) => {
						gltf.scene.scale.set(15, 15, 15);
						gltf.scene.rotation.x = (180 * Math.PI) / 180;
						gltf.scene.position.z = 5;
						scene.add(gltf.scene);
					});
				};

				webGLOverlayView.onContextRestored = ({ gl }) => {
					renderer = new THREE.WebGLRenderer({
						canvas: gl.canvas,
						context: gl,
						...gl.getContextAttributes(),
					});
					renderer.autoClear = false;

					loader.manager.onLoad = () => {
						renderer.setAnimationLoop(() => {
							map.moveCamera({
								tilt: mapOptions.tilt,
								heading: mapOptions.heading,
								zoom: mapOptions.zoom,
							});

							if (mapOptions.tilt < 67.5) {
								mapOptions.tilt += 0.5;
							} else if (mapOptions.heading <= 360) {
								mapOptions.heading += 0.2;
							} else {
								renderer.setAnimationLoop(null);
							}
						});
					};
				};
				webGLOverlayView.onDraw = ({ gl, transformer }) => {
					const latLngAltitudeLiteral = {
						lat: mapOptions.center.lat,
						lng: mapOptions.center.lng,
						altitude: 120,
					};

					const matrix = transformer.fromLatLngAltitude(latLngAltitudeLiteral);
					camera.projectionMatrix = new THREE.Matrix4().fromArray(matrix);

					webGLOverlayView.requestRedraw();
					renderer.render(scene, camera);
					renderer.resetState();
				};
				webGLOverlayView.setMap(map);
			});
		};

		initMap();
	}, [lat, lng]);
};

export default Map;

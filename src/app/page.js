'use client';
import { useEffect } from 'react';
import Map from 'ol/Map';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { Overlay, View } from 'ol';
import { fromLonLat } from 'ol/proj';

export default function Home() {

  useEffect(() => {
		const container = document.getElementById('inter');

		const overlay = new Overlay({
			element: container,
			autoPan: {
				animation: {
					duration: 250,
				},
			},
      positioning: 'center-center',
      stopEvent: true,
      position: fromLonLat([78.9629, 20.5937]),
		});

		const osmLayer = new TileLayer({
			preload: Infinity,
			source: new OSM(),
		});

		const map = new Map({
			target: 'map', // Target where the map will be rendered
			layers: [osmLayer], // Adding OSM layer to the map
			view: new View({
				center: fromLonLat([78.9629, 20.5937]), // Set initial center to 28, 77 (in longitude, latitude)
				zoom: 5, // Set initial zoom level to a more reasonable value (e.g., 4)
			}),
			overlays: [overlay],
		});

    // const fixedCoordinate = fromLonLat([78.9629, 20.5937]);
    // map.on('postrender', () => {
    //   const pixelPosition = map.getPixelFromCoordinate(fixedCoordinate);

    //   if (pixelPosition) {
    //   console.log(pixelPosition)
    //   console.log(fixedCoordinate)
    //     container.style.left = `${pixelPosition[0]}px`;
    //     container.style.top = `${pixelPosition[1]}px`;
    //     container.style.position = 'absolute';
    //     container.style.zIndex='900';
    //     // Ensure the video is absolutely positioned
    //   }
    // });

		return () => map.setTarget(null); // Clean up map on component unmount
	}, []);



	return (
		<>
			<div
				style={{ height: '900px', width: '100%' }}
				id="map"
				className="map-container relativ z-1"
			/>
			<video id='inter' className='' width="750" height="500" controls>
				<source src="inter.mp4" type="video/mp4" />
			</video>
		</>
	);
}

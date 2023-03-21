import React, { useState, useEffect, useRef, useImperativeHandle, } from 'react';
import MapContext from '../context/MapContext';
import load from '../util/loader';
import { ColorScheme, Distances, LoadPriority, MapType, toMapKitColorScheme, toMapKitCoordinateRegion, toMapKitDistances, toMapKitLoadPriority, toMapKitMapType, } from '../util/parameters';
const Map = React.forwardRef(({ children = undefined, token, colorScheme = ColorScheme.Light, mapType = MapType.Standard, distances = Distances.Adaptive, loadPriority = LoadPriority.LandCover, isRotationEnabled = true, isScrollEnabled = true, isZoomEnabled = true, showsMapTypeControl = true, showsZoomControl = true, showsUserLocationControl = false, showsPointsOfInterest = true, showsUserLocation = false, tracksUserLocation = false, paddingTop = 0, paddingRight = 0, paddingBottom = 0, paddingLeft = 0, initialRegion = undefined, cameraBoundary = undefined, minCameraDistance = 0, maxCameraDistance = Infinity, region = undefined, center = undefined, onSingleTap = undefined, onDoubleTap = undefined, onLongPress = undefined, }, mapRef) => {
    const [map, setMap] = useState(null);
    const element = useRef(null);
    const exists = useRef(false);
    // Load the map
    useEffect(() => {
        load(token).then(() => {
            if (exists.current)
                return;
            const options = initialRegion
                ? { region: toMapKitCoordinateRegion(initialRegion) }
                : {};
            setMap(new mapkit.Map(element.current, options));
            exists.current = true;
        });
        return () => {
            if (map) {
                map.destroy();
                exists.current = false;
            }
        };
    }, []);
    // Expose the map using a forward ref
    useImperativeHandle(mapRef, () => map, [map]);
    // Enum properties
    useEffect(() => {
        if (!map)
            return;
        map.colorScheme = toMapKitColorScheme(colorScheme);
    }, [map, colorScheme]);
    useEffect(() => {
        if (!map)
            return;
        map.mapType = toMapKitMapType(mapType);
    }, [map, mapType]);
    useEffect(() => {
        if (!map)
            return;
        map.distances = toMapKitDistances(distances);
    }, [map, distances]);
    useEffect(() => {
        if (!map)
            return;
        // @ts-ignore
        map.loadPriority = toMapKitLoadPriority(loadPriority);
    }, [map, loadPriority]);
    // Simple values properties
    const booleanProperties = {
        isRotationEnabled,
        isScrollEnabled,
        isZoomEnabled,
        showsMapTypeControl,
        showsZoomControl,
        showsUserLocationControl,
        showsPointsOfInterest,
        showsUserLocation,
        tracksUserLocation,
    };
    Object.entries(booleanProperties).forEach(([propertyName, prop]) => {
        useEffect(() => {
            if (!map)
                return;
            // @ts-ignore
            map[propertyName] = prop;
        }, [map, prop]);
    });
    // Padding
    useEffect(() => {
        if (!map)
            return;
        map.padding = new mapkit.Padding(paddingTop, paddingRight, paddingBottom, paddingLeft);
    }, [map, paddingTop, paddingRight, paddingBottom, paddingLeft]);
    // Camera boundary
    useEffect(() => {
        if (!map)
            return;
        // @ts-ignore
        map.cameraBoundary = cameraBoundary ? toMapKitCoordinateRegion(cameraBoundary) : null;
    }, [map, cameraBoundary]);
    // region
    useEffect(() => {
        if (!map)
            return;
        // @ts-ignore
        if (region) {
            console.log('region====>', region);
            const coordinateRegion = toMapKitCoordinateRegion(region);
            console.log('coordinateRegion===>', coordinateRegion);
            map.setRegionAnimated(coordinateRegion, false);
        }
    }, [map, region]);
    // center
    useEffect(() => {
        if (!map)
            return;
        // @ts-ignore
        if (center) {
            console.log('center====>', center);
            const coordinateCenter = new mapkit.Coordinate(center.centerLatitude, center.centerLongitude);
            console.log('coordinateCenter===>', coordinateCenter);
            map.setCenterAnimated(coordinateCenter, false);
        }
    }, [map, center]);
    // Camera zoom range
    useEffect(() => {
        if (!map)
            return;
        // @ts-ignore
        map.cameraZoomRange = new mapkit.CameraZoomRange(minCameraDistance, maxCameraDistance);
    }, [map, minCameraDistance, maxCameraDistance]);
    // Events
    const events = [
        { name: 'single-tap', handler: onSingleTap },
        { name: 'double-tap', handler: onDoubleTap },
        { name: 'long-press', handler: onLongPress },
    ];
    events.forEach(({ name, handler }) => {
        useEffect(() => {
            if (!map || !handler)
                return undefined;
            const mapkitHandler = ({ domEvents, pointOnPage }) => {
                handler({
                    domEvents,
                    pointOnPage,
                    toCoordinates: () => map.convertPointOnPageToCoordinate(pointOnPage),
                });
            };
            // @ts-ignore
            map.addEventListener(name, mapkitHandler);
            return () => map.removeEventListener(name, mapkitHandler);
        }, [map, handler]);
    });
    return (React.createElement(React.StrictMode, null,
        React.createElement("div", { style: { width: '100%', height: '100%' }, ref: element },
            React.createElement(MapContext.Provider, { value: map }, children))));
});
export default Map;

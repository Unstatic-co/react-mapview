/// <reference types="apple-mapkit-js-browser" />
/**
 * Color schemes of the map.
 * @see {@link https://developer.apple.com/documentation/mapkitjs/map/colorschemes}
 */
export declare enum ColorScheme {
    Light = 0,
    Dark = 1
}
/**
 * Converts a mapkit-react color scheme value to a MapKit JS color scheme value.
 * Must be called after MapKit JS is loaded.
 * @param colorScheme The mapkit-react color scheme value
 * @returns The MapKit JS color scheme value
 */
export declare function toMapKitColorScheme(colorScheme: ColorScheme): string;
/**
 * Types of map to display.
 * @see {@link https://developer.apple.com/documentation/mapkitjs/map/maptypes}
 */
export declare enum MapType {
    /**
     * A street map that shows the position of all roads and some road names.
     * @see {@link https://developer.apple.com/documentation/mapkitjs/map/maptypes/standard}
     */
    Standard = 0,
    /**
     * A street map where your data is emphasized over the underlying map details.
     * @see {@link https://developer.apple.com/documentation/mapkitjs/map/maptypes/mutedstandard}
     */
    MutedStandard = 1,
    /**
     * A satellite image of the area with road and road name information
     * layered on top.
     * @see {@link https://developer.apple.com/documentation/mapkitjs/map/maptypes/hybrid}
     */
    Hybrid = 2,
    /**
     * A satellite image of the area.
     * @see {@link https://developer.apple.com/documentation/mapkitjs/map/maptypes/satellite}
     */
    Satellite = 3
}
/**
 * Converts a mapkit-react map type value to a MapKit JS map type value.
 * Must be called after MapKit JS is loaded.
 * @param mapType The mapkit-react map type value
 * @returns The MapKit JS map type value
 */
export declare function toMapKitMapType(mapType: MapType): string;
/**
 * System of measurement that displays on the map.
 * @see {@link https://developer.apple.com/documentation/mapkitjs/map/distances}
 */
export declare enum Distances {
    /**
     * The measurement system is adaptive, and determined based on the map's language.
     */
    Adaptive = 0,
    Metric = 1,
    Imperial = 2
}
/**
 * Converts a mapkit-react map distances to a MapKit JS map distances.
 * Must be called after MapKit JS is loaded.
 * @param distances The mapkit-react map distances
 * @returns The MapKit JS map distances
 */
export declare function toMapKitDistances(distances: Distances): string;
/**
 * A value MapKit JS uses for prioritizing the visibility of specific map features
 * before the underlaying map tiles.
 * @see {@link https://developer.apple.com/documentation/mapkitjs/mapconstructoroptions/4096368-loadpriority}
 */
export declare enum LoadPriority {
    /**
     * Prioritizes loading of the map land cover and borders, without POIs or labels.
     * @see {@link https://developer.apple.com/documentation/mapkitjs/map/loadpriorities/landcover}
     */
    LandCover = 0,
    /**
     * Prioritizes loading of the full standard map, with rendered POIs.
     * @see {@link https://developer.apple.com/documentation/mapkitjs/map/loadpriorities/pointsofinterest}
     */
    PointsOfInterest = 1,
    /**
     * Signifies no preferences over what to prioritize when loading the map.
     * @see {@link https://developer.apple.com/documentation/mapkitjs/map/loadpriorities/none}
     */
    None = 2
}
/**
 * Converts a mapkit-react load priority to a MapKit JS load priority.
 * Must be called after MapKit JS is loaded.
 * @param loadPriority The mapkit-react load priority
 * @returns The MapKit JS load priority
 */
export declare function toMapKitLoadPriority(loadPriority: LoadPriority): string | null;
/**
 * Constants indicating the visibility of different adaptive map features.
 * @see {@link https://developer.apple.com/documentation/mapkitjs/featurevisibility}
 */
export declare enum FeatureVisibility {
    /**
     * A constant indicating that the feature is always hidden.
     * @see {@link https://developer.apple.com/documentation/mapkitjs/featurevisibility/hidden}
     */
    Hidden = 0,
    /**
     * A constant indicating that the feature is always visible.
     * @see {@link https://developer.apple.com/documentation/mapkitjs/featurevisibility/visible}
     */
    Visible = 1,
    /**
     * A constant indicating that feature visibility adapts to the current map state.
     * @see {@link https://developer.apple.com/documentation/mapkitjs/featurevisibility/adaptive}
     */
    Adaptive = 2
}
/**
 * Converts a mapkit-react visibility to a MapKit JS visibility.
 * Must be called after MapKit JS is loaded.
 * @param featureVisibility The mapkit-react visibility
 * @returns The MapKit JS visibility
 */
export declare function toMapKitFeatureVisibility(featureVisibility: FeatureVisibility): string;
/**
 * A rectangular geographic region that centers around a latitude and longitude coordinate.
 * @see {@link https://developer.apple.com/documentation/mapkitjs/mapkit/coordinateregion/2973861-mapkit_coordinateregion}
 */
export interface CoordinateRegion {
    /**
     * The latitude of the center point in degrees.
     */
    centerLatitude: number;
    /**
     * The longitude of the center point in degrees.
     */
    centerLongitude: number;
    /**
     * The amount of north-to-south distance (in degrees) to display for the map
     * region. Unlike longitudinal distances, which vary based on the latitude,
     * one degree of latitude is always approximately 111 km (69 mi.).
     */
    latitudeDelta: number;
    /**
     * The amount of east-to-west distance (in degrees) to display for the map
     * region. The number of kilometers (or miles) that a longitude range spans
     * varies based on the latitude. For example, one degree of longitude spans
     * a distance of approximately 111 km (69 miles mi.) at the equator,
     * approximately 88 km (or 55mi.) at 37º north latitude (the latitude of
     * San Francisco), and shrinks to 0 km (0 mi.) at the poles.
     */
    longitudeDelta: number;
}
/**
 * Converts a mapkit-react coordinate region to a MapKit JS coordinate region.
 * Must be called after MapKit JS is loaded.
 * @param region The mapkit-react coordinate region
 * @returns The MapKit JS coordinate region
 */
export declare function toMapKitCoordinateRegion(region: CoordinateRegion): mapkit.CoordinateRegion;

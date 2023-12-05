/**
 * Color schemes of the map.
 * @see {@link https://developer.apple.com/documentation/mapkitjs/map/colorschemes}
 */
export var ColorScheme;
(function (ColorScheme) {
    ColorScheme[ColorScheme["Light"] = 0] = "Light";
    ColorScheme[ColorScheme["Dark"] = 1] = "Dark";
})(ColorScheme || (ColorScheme = {}));
/**
 * Converts a mapkit-react color scheme value to a MapKit JS color scheme value.
 * Must be called after MapKit JS is loaded.
 * @param colorScheme The mapkit-react color scheme value
 * @returns The MapKit JS color scheme value
 */
export function toMapKitColorScheme(colorScheme) {
    switch (colorScheme) {
        case ColorScheme.Dark:
            return mapkit.Map.ColorSchemes.Dark;
        case ColorScheme.Light:
            return mapkit.Map.ColorSchemes.Light;
        default:
            throw new RangeError("Invalid color scheme");
    }
}
/**
 * Converts a mapkit-react map type value to a MapKit JS map type value.
 * Must be called after MapKit JS is loaded.
 * @param mapType The mapkit-react map type value
 * @returns The MapKit JS map type value
 */
export function toMapKitMapType(mapType) {
    switch (mapType) {
        case "standard":
            return mapkit.Map.MapTypes.Standard;
        case "mutedStandard":
            return mapkit.Map.MapTypes.MutedStandard;
        case "hybrid":
            return mapkit.Map.MapTypes.Hybrid;
        case "satellite":
            return mapkit.Map.MapTypes.Satellite;
        default:
            return mapkit.Map.MapTypes.Standard;
    }
}
/**
 * System of measurement that displays on the map.
 * @see {@link https://developer.apple.com/documentation/mapkitjs/map/distances}
 */
export var Distances;
(function (Distances) {
    /**
     * The measurement system is adaptive, and determined based on the map's language.
     */
    Distances[Distances["Adaptive"] = 0] = "Adaptive";
    Distances[Distances["Metric"] = 1] = "Metric";
    Distances[Distances["Imperial"] = 2] = "Imperial";
})(Distances || (Distances = {}));
/**
 * Converts a mapkit-react map distances to a MapKit JS map distances.
 * Must be called after MapKit JS is loaded.
 * @param distances The mapkit-react map distances
 * @returns The MapKit JS map distances
 */
export function toMapKitDistances(distances) {
    switch (distances) {
        case Distances.Adaptive:
            return mapkit.Map.Distances.Adaptive;
        case Distances.Metric:
            return mapkit.Map.Distances.Metric;
        case Distances.Imperial:
            return mapkit.Map.Distances.Imperial;
        default:
            throw new RangeError("Invalid distances value");
    }
}
/**
 * A value MapKit JS uses for prioritizing the visibility of specific map features
 * before the underlaying map tiles.
 * @see {@link https://developer.apple.com/documentation/mapkitjs/mapconstructoroptions/4096368-loadpriority}
 */
export var LoadPriority;
(function (LoadPriority) {
    /**
     * Prioritizes loading of the map land cover and borders, without POIs or labels.
     * @see {@link https://developer.apple.com/documentation/mapkitjs/map/loadpriorities/landcover}
     */
    LoadPriority[LoadPriority["LandCover"] = 0] = "LandCover";
    /**
     * Prioritizes loading of the full standard map, with rendered POIs.
     * @see {@link https://developer.apple.com/documentation/mapkitjs/map/loadpriorities/pointsofinterest}
     */
    LoadPriority[LoadPriority["PointsOfInterest"] = 1] = "PointsOfInterest";
    /**
     * Signifies no preferences over what to prioritize when loading the map.
     * @see {@link https://developer.apple.com/documentation/mapkitjs/map/loadpriorities/none}
     */
    LoadPriority[LoadPriority["None"] = 2] = "None";
})(LoadPriority || (LoadPriority = {}));
/**
 * Converts a mapkit-react load priority to a MapKit JS load priority.
 * Must be called after MapKit JS is loaded.
 * @param loadPriority The mapkit-react load priority
 * @returns The MapKit JS load priority
 */
export function toMapKitLoadPriority(loadPriority) {
    switch (loadPriority) {
        case LoadPriority.LandCover:
            // @ts-ignore
            return mapkit.Map.LoadPriorities.LandCover;
        case LoadPriority.PointsOfInterest:
            // @ts-ignore
            return mapkit.Map.LoadPriorities.PointsOfInterest;
        case LoadPriority.None:
            // @ts-ignore
            return mapkit.Map.LoadPriorities.None;
        default:
            throw new RangeError("Invalid load priority");
    }
}
/**
 * Constants indicating the visibility of different adaptive map features.
 * @see {@link https://developer.apple.com/documentation/mapkitjs/featurevisibility}
 */
export var FeatureVisibility;
(function (FeatureVisibility) {
    /**
     * A constant indicating that the feature is always hidden.
     * @see {@link https://developer.apple.com/documentation/mapkitjs/featurevisibility/hidden}
     */
    FeatureVisibility[FeatureVisibility["Hidden"] = 0] = "Hidden";
    /**
     * A constant indicating that the feature is always visible.
     * @see {@link https://developer.apple.com/documentation/mapkitjs/featurevisibility/visible}
     */
    FeatureVisibility[FeatureVisibility["Visible"] = 1] = "Visible";
    /**
     * A constant indicating that feature visibility adapts to the current map state.
     * @see {@link https://developer.apple.com/documentation/mapkitjs/featurevisibility/adaptive}
     */
    FeatureVisibility[FeatureVisibility["Adaptive"] = 2] = "Adaptive";
})(FeatureVisibility || (FeatureVisibility = {}));
/**
 * Converts a mapkit-react visibility to a MapKit JS visibility.
 * Must be called after MapKit JS is loaded.
 * @param featureVisibility The mapkit-react visibility
 * @returns The MapKit JS visibility
 */
export function toMapKitFeatureVisibility(featureVisibility) {
    switch (featureVisibility) {
        case FeatureVisibility.Adaptive:
            return mapkit.FeatureVisibility.Adaptive;
        case FeatureVisibility.Visible:
            return mapkit.FeatureVisibility.Visible;
        case FeatureVisibility.Hidden:
            return mapkit.FeatureVisibility.Hidden;
        default:
            throw new RangeError("Invalid feature visibility");
    }
}
/**
 * Converts a mapkit-react coordinate region to a MapKit JS coordinate region.
 * Must be called after MapKit JS is loaded.
 * @param region The mapkit-react coordinate region
 * @returns The MapKit JS coordinate region
 */
export function toMapKitCoordinateRegion(region) {
    return new mapkit.CoordinateRegion(new mapkit.Coordinate(region.centerLatitude, region.centerLongitude), new mapkit.CoordinateSpan(region.latitudeDelta, region.longitudeDelta));
}

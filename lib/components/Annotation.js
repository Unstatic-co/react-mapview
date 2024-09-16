import React, { useContext, useEffect, useState, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import MapContext from "../context/MapContext";
export default function Annotation({ latitude, longitude, title = "", subtitle = "", accessibilityLabel = null, selected = undefined, onSelect = undefined, onDeselect = undefined, callout, children, }) {
    const [annotation, setAnnotation] = useState(null);
    const contentEl = useMemo(() => document.createElement("div"), []);
    const map = useContext(MapContext);
    // Coordinates
    useEffect(() => {
        if (map === null)
            return undefined;
        const a = new mapkit.Annotation(new mapkit.Coordinate(latitude, longitude), () => contentEl);
        map.addAnnotation(a);
        setAnnotation(a);
        return () => {
            try {
                map.removeAnnotation(a);
            }
            catch (error) {
                console.error("Failed to remove annotation", error);
            }
        };
    }, [map]);
    useEffect(() => {
        if (!annotation)
            return;
        annotation.coordinate = new mapkit.Coordinate(latitude, longitude);
    }, [annotation, latitude, longitude]);
    // Simple values properties
    const properties = {
        title,
        subtitle,
        accessibilityLabel,
        selected,
    };
    Object.entries(properties).forEach(([propertyName, prop]) => {
        useEffect(() => {
            if (!annotation)
                return;
            setTimeout(() => {
                // @ts-ignore
                annotation[propertyName] = prop;
            }, 500);
        }, [annotation, prop]);
    });
    // Events
    const onSelectRef = useRef(onSelect);
    const onDeselectRef = useRef(onDeselect);
    onSelectRef.current = onSelect;
    onDeselectRef.current = onDeselect;
    useEffect(() => {
        if (!annotation)
            return undefined;
        const events = [
            { name: "select", handler: () => { var _a; return (_a = onSelectRef.current) === null || _a === void 0 ? void 0 : _a.call(onSelectRef); } },
            { name: "deselect", handler: () => { var _a; return (_a = onDeselectRef.current) === null || _a === void 0 ? void 0 : _a.call(onDeselectRef); } },
        ];
        events.forEach(({ name, handler }) => {
            annotation.addEventListener(name, handler);
        });
        return () => {
            events.forEach(({ name, handler }) => {
                annotation.removeEventListener(name, handler);
            });
        };
    }, [annotation]);
    // Handle render custom callout
    const calloutEl = useMemo(() => document.createElement("div"), []);
    const hasCustomCallout = !!callout;
    useEffect(() => {
        if (!annotation) {
            return;
        }
        annotation.callout = hasCustomCallout ? {
            calloutElementForAnnotation() {
                return calloutEl;
            },
        } : {};
    }, [hasCustomCallout, annotation]);
    return (React.createElement(React.Fragment, null,
        hasCustomCallout ? createPortal(callout, calloutEl) : null,
        createPortal(children, contentEl)));
}

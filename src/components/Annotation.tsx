import React, { useContext, useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import MapContext from "../context/MapContext";
import AnnotationProps from "./AnnotationProps";

export default function Annotation({
  latitude,
  longitude,

  title = "",
  subtitle = "",
  accessibilityLabel = null,

  selected = undefined,
  onSelect = undefined,
  onDeselect = undefined,
  callout,
  children,
}: AnnotationProps) {
  const [annotation, setAnnotation] = useState<mapkit.Annotation | null>(null);
  const contentEl = useMemo<HTMLDivElement>(
    () => document.createElement("div"),
    []
  );
  const map = useContext(MapContext);

  // Coordinates
  useEffect(() => {
    if (map === null) return undefined;

    const a = new mapkit.Annotation(
      new mapkit.Coordinate(latitude, longitude),
      () => contentEl,
    );
    map.addAnnotation(a);
    setAnnotation(a);

    return () => {
      try {
        map.removeAnnotation(a);
      } catch (error) {
        console.error("Failed to remove annotation", error);
      }
    };
  }, [map, latitude, longitude]);

  // Simple values properties
  const properties = {
    title,
    subtitle,
    accessibilityLabel,

    selected,
  };
  Object.entries(properties).forEach(([propertyName, prop]) => {
    useEffect(() => {
      if (!annotation) return;
      setTimeout(() => {
        // @ts-ignore
        annotation[propertyName] = prop;
      }, 500);
    }, [annotation, prop]);
  });

  // Events
  const events = [
    { name: "select", handler: onSelect },
    { name: "deselect", handler: onDeselect },
  ] as const;
  events.forEach(({ name, handler }) => {
    useEffect(() => {
      if (!annotation || !handler) return undefined;

      const handlerWithoutParameters = () => handler();

      annotation.addEventListener(name, handlerWithoutParameters);
      return () =>
        annotation.removeEventListener(name, handlerWithoutParameters);
    }, [annotation, handler]);
  });

  // Handle render custom callout
  const calloutEl = useMemo<HTMLDivElement>(
    () => document.createElement("div"),
    []
  );
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

  return (
    <>
      {hasCustomCallout ? createPortal(callout, calloutEl) : null}
      {createPortal(children, contentEl)}
    </>
  );
}

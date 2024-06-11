"use client";

import { useState, useEffect } from "react";
import debounce from "@/lib/utils/debounce";
import {
  MEDIUM_DEVICE_WIDTH,
  LARGE_DEVICE_WIDTH,
} from "@/constants/deviceSize";

type WindowSize = {
  width: number;
  height: number;
};

const useDeviceSize = () => {
  const isClient = typeof window !== "undefined";

  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    const debouncedResize = debounce(handleResize, 150);
    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, []);

  const getDeviceSize = (width: number) => {
    if (MEDIUM_DEVICE_WIDTH > width) return "small";
    if (LARGE_DEVICE_WIDTH > width) return "medium";
    return "large";
  };

  return getDeviceSize(windowSize.width);
};

export default useDeviceSize;

import { useCallback, useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

let sharedFfmpeg: FFmpeg | null = null;
let loadPromise: Promise<FFmpeg> | null = null;

async function loadSharedFfmpeg(onLog: (message: string) => void): Promise<FFmpeg> {
  if (sharedFfmpeg) return sharedFfmpeg;
  if (!loadPromise) {
    loadPromise = (async () => {
      const ffmpeg = new FFmpeg();
      ffmpeg.on("log", ({ message }) => onLog(message));
      const [coreURL, wasmURL] = await Promise.all([
        toBlobURL("/ffmpeg/ffmpeg-core.js", "text/javascript"),
        toBlobURL("/ffmpeg/ffmpeg-core.wasm", "application/wasm"),
      ]);
      await ffmpeg.load({ coreURL, wasmURL });
      sharedFfmpeg = ffmpeg;
      return ffmpeg;
    })();
  }
  return loadPromise;
}

export function useFfmpeg() {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(() => sharedFfmpeg !== null);
  const [progress, setProgress] = useState(0);
  const progressHandlerRef = useRef<((event: { progress: number }) => void) | null>(null);

  const ensureLoaded = useCallback(async () => {
    if (sharedFfmpeg) {
      setLoaded(true);
      return sharedFfmpeg;
    }
    setLoading(true);
    try {
      const ffmpeg = await loadSharedFfmpeg(() => {});
      setLoaded(true);
      return ffmpeg;
    } finally {
      setLoading(false);
    }
  }, []);

  const withProgress = useCallback((ffmpeg: FFmpeg, onProgress: (ratio: number) => void) => {
    if (progressHandlerRef.current) {
      ffmpeg.off("progress", progressHandlerRef.current);
    }
    const handler = ({ progress: ratio }: { progress: number }) => {
      onProgress(Math.min(1, Math.max(0, ratio)));
    };
    progressHandlerRef.current = handler;
    ffmpeg.on("progress", handler);
  }, []);

  return { ensureLoaded, loading, loaded, progress, setProgress, withProgress };
}

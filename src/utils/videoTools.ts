import type { FFmpeg } from "@ffmpeg/ffmpeg";

export interface VideoConversionSpec {
  id: string;
  fromLabel: string;
  toLabel: string;
  accept: string;
  outputExt: string;
  outputMime: string;
  isGifOutput?: boolean;
  buildSteps: (inputName: string, outputName: string) => string[][];
  intermediateFiles?: string[];
}

const H264_MP4_ARGS = (inputName: string, outputName: string) => [
  ["-i", inputName, "-c:v", "libx264", "-preset", "ultrafast", "-crf", "23", "-c:a", "aac", "-b:a", "128k", "-pix_fmt", "yuv420p", outputName],
];

export const VIDEO_CONVERSIONS: VideoConversionSpec[] = [
  {
    id: "mp4-to-webm",
    fromLabel: "MP4",
    toLabel: "WebM",
    accept: "video/mp4,.mp4",
    outputExt: "webm",
    outputMime: "video/webm",
    buildSteps: (inputName, outputName) => [
      ["-i", inputName, "-c:v", "libvpx", "-b:v", "1M", "-c:a", "libvorbis", outputName],
    ],
  },
  {
    id: "webm-to-mp4",
    fromLabel: "WebM",
    toLabel: "MP4",
    accept: "video/webm,.webm",
    outputExt: "mp4",
    outputMime: "video/mp4",
    buildSteps: H264_MP4_ARGS,
  },
  {
    id: "mov-to-mp4",
    fromLabel: "MOV",
    toLabel: "MP4",
    accept: "video/quicktime,.mov",
    outputExt: "mp4",
    outputMime: "video/mp4",
    buildSteps: H264_MP4_ARGS,
  },
  {
    id: "avi-to-mp4",
    fromLabel: "AVI",
    toLabel: "MP4",
    accept: "video/x-msvideo,.avi",
    outputExt: "mp4",
    outputMime: "video/mp4",
    buildSteps: H264_MP4_ARGS,
  },
  {
    id: "mkv-to-mp4",
    fromLabel: "MKV",
    toLabel: "MP4",
    accept: "video/x-matroska,.mkv",
    outputExt: "mp4",
    outputMime: "video/mp4",
    buildSteps: H264_MP4_ARGS,
  },
  {
    id: "gif-to-mp4",
    fromLabel: "GIF",
    toLabel: "MP4",
    accept: "image/gif,.gif",
    outputExt: "mp4",
    outputMime: "video/mp4",
    buildSteps: (inputName, outputName) => [
      [
        "-i",
        inputName,
        "-movflags",
        "faststart",
        "-pix_fmt",
        "yuv420p",
        "-vf",
        "scale=trunc(iw/2)*2:trunc(ih/2)*2",
        outputName,
      ],
    ],
  },
  {
    id: "mp4-to-gif",
    fromLabel: "MP4",
    toLabel: "GIF",
    accept: "video/mp4,.mp4",
    outputExt: "gif",
    outputMime: "image/gif",
    isGifOutput: true,
    intermediateFiles: ["palette.png"],
    buildSteps: (inputName, outputName) => [
      ["-i", inputName, "-vf", "fps=10,scale=480:-1:flags=lanczos,palettegen", "palette.png"],
      [
        "-i",
        inputName,
        "-i",
        "palette.png",
        "-filter_complex",
        "fps=10,scale=480:-1:flags=lanczos[x];[x][1:v]paletteuse",
        outputName,
      ],
    ],
  },
];

export interface VideoCompressOptions {
  crf: number;
  maxHeight?: number;
}

export function buildCompressArgs(inputName: string, outputName: string, options: VideoCompressOptions): string[] {
  const args = ["-i", inputName, "-c:v", "libx264", "-preset", "ultrafast", "-crf", String(options.crf)];
  if (options.maxHeight) {
    args.push("-vf", `scale=-2:'min(ih,${options.maxHeight})'`);
  }
  args.push("-c:a", "aac", "-b:a", "128k", "-pix_fmt", "yuv420p", outputName);
  return args;
}

export async function compressVideo(ffmpeg: FFmpeg, file: File, options: VideoCompressOptions): Promise<Blob> {
  const inputName = `input-${Date.now()}.${file.name.split(".").pop() ?? "bin"}`;
  const outputName = `output-${Date.now()}.mp4`;

  await ffmpeg.writeFile(inputName, new Uint8Array(await file.arrayBuffer()));
  await ffmpeg.exec(buildCompressArgs(inputName, outputName, options));
  const data = await ffmpeg.readFile(outputName);
  const bytes = data as Uint8Array;

  for (const name of [inputName, outputName]) {
    try {
      await ffmpeg.deleteFile(name);
    } catch {
      // ignore missing files
    }
  }

  return new Blob([bytes.buffer as ArrayBuffer], { type: "video/mp4" });
}

export async function convertVideo(
  ffmpeg: FFmpeg,
  file: File,
  spec: VideoConversionSpec,
  onStepProgress: (step: number, totalSteps: number) => void,
): Promise<Blob> {
  const inputName = `input-${Date.now()}.${file.name.split(".").pop() ?? "bin"}`;
  const outputName = `output-${Date.now()}.${spec.outputExt}`;
  const steps = spec.buildSteps(inputName, outputName);

  await ffmpeg.writeFile(inputName, new Uint8Array(await file.arrayBuffer()));

  for (let i = 0; i < steps.length; i++) {
    onStepProgress(i, steps.length);
    await ffmpeg.exec(steps[i]);
  }

  const data = await ffmpeg.readFile(outputName);
  const bytes = data as Uint8Array;

  for (const name of [inputName, outputName, ...(spec.intermediateFiles ?? [])]) {
    try {
      await ffmpeg.deleteFile(name);
    } catch {
      // ignore missing intermediate files
    }
  }

  return new Blob([bytes.buffer as ArrayBuffer], { type: spec.outputMime });
}

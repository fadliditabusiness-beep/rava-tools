import type { FFmpeg } from "@ffmpeg/ffmpeg";

export interface AudioConversionSpec {
  id: string;
  fromLabel: string;
  toLabel: string;
  accept: string;
  outputExt: string;
  outputMime: string;
  buildArgs: (inputName: string, outputName: string) => string[];
}

const stripVideoStream = (codecArgs: string[]) => ["-vn", ...codecArgs];

export const AUDIO_CONVERSIONS: AudioConversionSpec[] = [
  {
    id: "audio-to-mp3",
    fromLabel: "Audio",
    toLabel: "MP3",
    accept: "audio/*",
    outputExt: "mp3",
    outputMime: "audio/mpeg",
    buildArgs: (inputName, outputName) => ["-i", inputName, "-c:a", "libmp3lame", "-b:a", "192k", outputName],
  },
  {
    id: "audio-to-ogg",
    fromLabel: "Audio",
    toLabel: "OGG",
    accept: "audio/*",
    outputExt: "ogg",
    outputMime: "audio/ogg",
    buildArgs: (inputName, outputName) => ["-i", inputName, "-c:a", "libvorbis", "-q:a", "5", outputName],
  },
  {
    id: "audio-to-wav",
    fromLabel: "Audio",
    toLabel: "WAV",
    accept: "audio/*",
    outputExt: "wav",
    outputMime: "audio/wav",
    buildArgs: (inputName, outputName) => ["-i", inputName, "-c:a", "pcm_s16le", outputName],
  },
  {
    id: "mp3-to-ogg",
    fromLabel: "MP3",
    toLabel: "OGG",
    accept: "audio/mpeg,.mp3",
    outputExt: "ogg",
    outputMime: "audio/ogg",
    buildArgs: (inputName, outputName) => ["-i", inputName, "-c:a", "libvorbis", "-q:a", "5", outputName],
  },
  {
    id: "video-to-mp3",
    fromLabel: "Video",
    toLabel: "MP3",
    accept: "video/*",
    outputExt: "mp3",
    outputMime: "audio/mpeg",
    buildArgs: (inputName, outputName) => [
      "-i",
      inputName,
      ...stripVideoStream(["-c:a", "libmp3lame", "-b:a", "192k"]),
      outputName,
    ],
  },
  {
    id: "mp4-to-mp3",
    fromLabel: "MP4",
    toLabel: "MP3",
    accept: "video/mp4,.mp4",
    outputExt: "mp3",
    outputMime: "audio/mpeg",
    buildArgs: (inputName, outputName) => [
      "-i",
      inputName,
      ...stripVideoStream(["-c:a", "libmp3lame", "-b:a", "192k"]),
      outputName,
    ],
  },
];

export async function convertAudio(
  ffmpeg: FFmpeg,
  file: File,
  spec: AudioConversionSpec,
): Promise<Blob> {
  const inputName = `input-${Date.now()}.${file.name.split(".").pop() ?? "bin"}`;
  const outputName = `output-${Date.now()}.${spec.outputExt}`;

  await ffmpeg.writeFile(inputName, new Uint8Array(await file.arrayBuffer()));
  await ffmpeg.exec(spec.buildArgs(inputName, outputName));
  const data = await ffmpeg.readFile(outputName);
  const bytes = data as Uint8Array;

  for (const name of [inputName, outputName]) {
    try {
      await ffmpeg.deleteFile(name);
    } catch {
      // ignore missing files
    }
  }

  return new Blob([bytes.buffer as ArrayBuffer], { type: spec.outputMime });
}

export interface AudioCompressOptions {
  bitrateKbps: number;
}

export async function compressAudio(ffmpeg: FFmpeg, file: File, options: AudioCompressOptions): Promise<Blob> {
  const inputName = `input-${Date.now()}.${file.name.split(".").pop() ?? "bin"}`;
  const outputName = `output-${Date.now()}.mp3`;

  await ffmpeg.writeFile(inputName, new Uint8Array(await file.arrayBuffer()));
  await ffmpeg.exec(["-i", inputName, "-c:a", "libmp3lame", "-b:a", `${options.bitrateKbps}k`, outputName]);
  const data = await ffmpeg.readFile(outputName);
  const bytes = data as Uint8Array;

  for (const name of [inputName, outputName]) {
    try {
      await ffmpeg.deleteFile(name);
    } catch {
      // ignore missing files
    }
  }

  return new Blob([bytes.buffer as ArrayBuffer], { type: "audio/mpeg" });
}

export interface WavCompressOptions {
  sampleRate: number;
  mono: boolean;
}

export async function compressWav(ffmpeg: FFmpeg, file: File, options: WavCompressOptions): Promise<Blob> {
  const inputName = `input-${Date.now()}.${file.name.split(".").pop() ?? "bin"}`;
  const outputName = `output-${Date.now()}.wav`;

  const args = ["-i", inputName, "-ar", String(options.sampleRate)];
  if (options.mono) args.push("-ac", "1");
  args.push("-c:a", "pcm_s16le", outputName);

  await ffmpeg.writeFile(inputName, new Uint8Array(await file.arrayBuffer()));
  await ffmpeg.exec(args);
  const data = await ffmpeg.readFile(outputName);
  const bytes = data as Uint8Array;

  for (const name of [inputName, outputName]) {
    try {
      await ffmpeg.deleteFile(name);
    } catch {
      // ignore missing files
    }
  }

  return new Blob([bytes.buffer as ArrayBuffer], { type: "audio/wav" });
}

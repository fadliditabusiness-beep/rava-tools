export interface MegaNavItem {
  title: string;
  href: string;
}

export interface MegaNavColumn {
  title: string;
  items: MegaNavItem[];
}

export const CONVERT_NAV: MegaNavColumn[] = [
  {
    title: "Video & Audio",
    items: [
      { title: "Video Converter", href: "/tools/video-converter" },
      { title: "Audio Converter", href: "/tools/audio-converter" },
      { title: "MP3 Converter", href: "/tools/mp3-converter" },
      { title: "MP4 to MP3", href: "/tools/mp4-to-mp3" },
      { title: "Video to MP3", href: "/tools/video-to-mp3" },
      { title: "MP4 Converter", href: "/tools/mp4-converter" },
      { title: "MOV to MP4", href: "/tools/convert-mov-to-mp4" },
      { title: "MP3 to OGG", href: "/tools/mp3-to-ogg" },
    ],
  },
  {
    title: "Image",
    items: [
      { title: "Image Converter", href: "/tools/image-converter" },
      { title: "WEBP to PNG", href: "/tools/convert-webp-to-png" },
      { title: "JFIF to PNG", href: "/tools/jfif-to-png" },
      { title: "PNG to SVG", href: "/tools/png-to-svg" },
      { title: "WEBP to JPG", href: "/tools/convert-webp-to-jpg" },
      { title: "SVG Converter", href: "/tools/svg-converter" },
    ],
  },
  {
    title: "PDF & Documents",
    items: [
      { title: "PDF Converter", href: "/tools/pdf-converter" },
      { title: "PDF to JPG", href: "/tools/pdf-to-jpg" },
      { title: "JPG to PDF", href: "/tools/image-to-pdf" },
    ],
  },
  {
    title: "GIF",
    items: [
      { title: "Video to GIF", href: "/tools/video-to-gif" },
      { title: "MP4 to GIF", href: "/tools/convert-mp4-to-gif" },
      { title: "WEBM to GIF", href: "/tools/webm-to-gif" },
      { title: "APNG to GIF", href: "/tools/apng-to-gif" },
      { title: "GIF to MP4", href: "/tools/convert-gif-to-mp4" },
      { title: "GIF to APNG", href: "/tools/gif-to-apng" },
      { title: "Image to GIF", href: "/tools/gif-maker" },
      { title: "MOV to GIF", href: "/tools/mov-to-gif" },
      { title: "AVI to GIF", href: "/tools/avi-to-gif" },
    ],
  },
  {
    title: "Others",
    items: [
      { title: "Unit Converter", href: "/tools/unit-converter" },
      { title: "Time Converter", href: "/tools/time-converter" },
      { title: "Archive Converter", href: "/tools/archive-converter" },
    ],
  },
];

export const COMPRESS_NAV: MegaNavColumn[] = [
  {
    title: "Video & Audio",
    items: [
      { title: "Video Compressor", href: "/tools/compress-video" },
      { title: "MP3 Compressor", href: "/tools/mp3-compressor" },
      { title: "WAV Compressor", href: "/tools/wav-compressor" },
    ],
  },
  {
    title: "Image",
    items: [
      { title: "Image Compressor", href: "/tools/image-compressor" },
      { title: "JPEG Compressor", href: "/tools/compress-jpg" },
      { title: "PNG Compressor", href: "/tools/compress-png" },
    ],
  },
  {
    title: "PDF & Documents",
    items: [{ title: "PDF Compressor", href: "/tools/compress-pdf" }],
  },
  {
    title: "GIF",
    items: [{ title: "GIF Compressor", href: "/tools/gif-compressor" }],
  },
];

export const OTHER_TOOLS_NAV: MegaNavColumn[] = [
  {
    title: "Video Tools",
    items: [
      { title: "Crop Video", href: "/tools/crop-video" },
      { title: "Trim Video", href: "/tools/trim-video" },
    ],
  },
  {
    title: "Image Tools",
    items: [
      { title: "GIF Maker", href: "/tools/gif-maker" },
      { title: "Resize Image", href: "/tools/resize-image" },
      { title: "Crop Image", href: "/tools/crop-image" },
      { title: "Color Picker", href: "/tools/color-picker" },
      { title: "Rotate Image", href: "/tools/rotate-image" },
      { title: "Flip Image", href: "/tools/flip-image" },
      { title: "Image Enlarger", href: "/tools/image-enlarger" },
    ],
  },
  {
    title: "PDF Tools",
    items: [
      { title: "PDF Merge", href: "/tools/merge-pdf" },
      { title: "PDF Split", href: "/tools/split-pdf" },
      { title: "Flatten PDF", href: "/tools/flatten-pdf" },
      { title: "Resize PDF", href: "/tools/resize-pdf" },
      { title: "Rotate PDF", href: "/tools/rotate-pdf" },
      { title: "Crop PDF", href: "/tools/crop-pdf" },
      { title: "Organize PDF", href: "/tools/organize-pdf" },
      { title: "Extract image from PDF", href: "/tools/extract-images-from-pdf" },
      { title: "PDF page remover", href: "/tools/delete-pdf-pages" },
      { title: "Extract Pages from PDF", href: "/tools/extract-pdf-pages" },
    ],
  },
];

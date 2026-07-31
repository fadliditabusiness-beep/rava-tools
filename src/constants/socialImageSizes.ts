export interface SocialImageSize {
  asset: string;
  size: string;
  ratio: string;
}

export interface SocialImagePlatform {
  platform: string;
  sizes: SocialImageSize[];
}

export const SOCIAL_IMAGE_SIZES: SocialImagePlatform[] = [
  {
    platform: "Instagram",
    sizes: [
      { asset: "Post (Persegi)", size: "1080 × 1080 px", ratio: "1:1" },
      { asset: "Post (Portrait)", size: "1080 × 1350 px", ratio: "4:5" },
      { asset: "Post (Landscape)", size: "1080 × 566 px", ratio: "1.91:1" },
      { asset: "Story / Reels", size: "1080 × 1920 px", ratio: "9:16" },
      { asset: "Foto Profil", size: "320 × 320 px", ratio: "1:1" },
    ],
  },
  {
    platform: "Facebook",
    sizes: [
      { asset: "Gambar Postingan", size: "1200 × 630 px", ratio: "1.91:1" },
      { asset: "Foto Sampul", size: "820 × 312 px", ratio: "2.63:1" },
      { asset: "Foto Profil", size: "170 × 170 px", ratio: "1:1" },
      { asset: "Story", size: "1080 × 1920 px", ratio: "9:16" },
    ],
  },
  {
    platform: "Twitter / X",
    sizes: [
      { asset: "Foto In-Stream", size: "1600 × 900 px", ratio: "16:9" },
      { asset: "Header / Banner", size: "1500 × 500 px", ratio: "3:1" },
      { asset: "Foto Profil", size: "400 × 400 px", ratio: "1:1" },
    ],
  },
  {
    platform: "LinkedIn",
    sizes: [
      { asset: "Gambar Postingan", size: "1200 × 627 px", ratio: "1.91:1" },
      { asset: "Cover Perusahaan", size: "1128 × 191 px", ratio: "5.9:1" },
      { asset: "Foto Profil", size: "400 × 400 px", ratio: "1:1" },
    ],
  },
  {
    platform: "YouTube",
    sizes: [
      { asset: "Thumbnail Video", size: "1280 × 720 px", ratio: "16:9" },
      { asset: "Channel Banner", size: "2560 × 1440 px", ratio: "16:9" },
      { asset: "Foto Profil", size: "800 × 800 px", ratio: "1:1" },
    ],
  },
  {
    platform: "TikTok",
    sizes: [
      { asset: "Video", size: "1080 × 1920 px", ratio: "9:16" },
      { asset: "Foto Profil", size: "200 × 200 px", ratio: "1:1" },
    ],
  },
  {
    platform: "Pinterest",
    sizes: [
      { asset: "Pin", size: "1000 × 1500 px", ratio: "2:3" },
      { asset: "Foto Profil", size: "165 × 165 px", ratio: "1:1" },
    ],
  },
];

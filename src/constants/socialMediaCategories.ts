import type { MegaCategoryGroup } from "@/interfaces/megaCategory";

function live(title: string, href: string, description?: string): { title: string; href: string; description?: string; status: "live" } {
  return { title, href, description, status: "live" };
}

function soon(title: string, description?: string): { title: string; description?: string; status: "coming-soon" } {
  return { title, description, status: "coming-soon" };
}

export const SOCIAL_MEDIA_CATEGORIES: MegaCategoryGroup[] = [
  {
    id: "instagram",
    title: "Instagram Tools",
    subcategories: [
      {
        id: "instagram-content",
        title: "Content",
        tools: [
          live("Instagram Caption Counter", "/tools/instagram-caption-counter", "Cek jumlah karakter & hashtag caption Instagram."),
          live("Instagram Hashtag Generator", "/tools/hashtag-generator", "Buat hashtag dari kata kunci atau topik."),
          live("Instagram Bio Generator", "/tools/instagram-bio-generator", "Susun bio Instagram dari beberapa baris & emoji."),
          live("Instagram Username Generator", "/tools/instagram-username-generator", "Buat ide username Instagram unik."),
          live("Instagram Font Generator", "/tools/instagram-font-generator", "Ubah teks jadi font unicode unik untuk bio/caption."),
          live("Instagram Emoji Picker", "/tools/emoji-picker", "Cari & salin emoji dengan cepat."),
        ],
      },
      {
        id: "instagram-images",
        title: "Images",
        tools: [
          soon("Instagram Post Resize"),
          soon("Instagram Story Resize"),
          soon("Instagram Reel Cover Resize"),
          soon("Instagram Carousel Splitter"),
          soon("Instagram Profile Picture Resize"),
        ],
      },
      {
        id: "instagram-video",
        title: "Video",
        tools: [
          soon("Instagram Reel Thumbnail Generator"),
          live("Instagram Video Compressor", "/tools/compress-video", "Perkecil ukuran file video."),
          soon("Instagram Story Video Resize"),
        ],
      },
    ],
  },
  {
    id: "tiktok",
    title: "TikTok Tools",
    subcategories: [
      {
        id: "tiktok-content",
        title: "Content",
        tools: [
          live("TikTok Caption Counter", "/tools/tiktok-caption-counter", "Cek jumlah karakter & hashtag caption TikTok."),
          live("TikTok Hashtag Generator", "/tools/hashtag-generator", "Buat hashtag dari kata kunci atau topik."),
          soon("TikTok Username Generator"),
        ],
      },
      {
        id: "tiktok-video",
        title: "Video",
        tools: [
          soon("TikTok Video Resize"),
          soon("TikTok Cover Generator"),
          soon("TikTok Thumbnail Generator"),
          live("TikTok Video Compressor", "/tools/compress-video", "Perkecil ukuran file video."),
        ],
      },
    ],
  },
  {
    id: "youtube",
    title: "YouTube Tools",
    subcategories: [
      {
        id: "youtube-seo",
        title: "SEO",
        tools: [
          soon("YouTube Title Length Checker"),
          soon("YouTube Description Length Checker"),
          live("YouTube Tag Generator", "/tools/youtube-tag-generator", "Buat daftar tag YouTube dari judul & kata kunci."),
          soon("YouTube Hashtag Generator"),
          soon("YouTube Timestamp Generator"),
        ],
      },
      {
        id: "youtube-thumbnail",
        title: "Thumbnail",
        tools: [soon("YouTube Thumbnail Resize"), soon("YouTube Thumbnail Downloader"), soon("YouTube Thumbnail Preview")],
      },
      {
        id: "youtube-content",
        title: "Content",
        tools: [soon("YouTube Chapter Generator"), soon("YouTube Description Generator"), soon("YouTube Shorts Title Checker")],
      },
    ],
  },
  {
    id: "linkedin",
    title: "LinkedIn Tools",
    subcategories: [
      {
        id: "linkedin-content",
        title: "Content",
        tools: [soon("LinkedIn Post Formatter"), soon("LinkedIn Character Counter"), soon("LinkedIn Hashtag Generator")],
      },
      {
        id: "linkedin-images",
        title: "Images",
        tools: [soon("LinkedIn Banner Resize"), soon("LinkedIn Post Resize"), soon("LinkedIn Profile Photo Resize")],
      },
    ],
  },
  {
    id: "facebook",
    title: "Facebook Tools",
    subcategories: [
      {
        id: "facebook-images",
        title: "Images",
        tools: [soon("Facebook Post Resize"), soon("Facebook Cover Resize"), soon("Facebook Profile Resize"), soon("Facebook Story Resize")],
      },
      { id: "facebook-content", title: "Content", tools: [soon("Facebook Caption Counter")] },
    ],
  },
  {
    id: "pinterest",
    title: "Pinterest Tools",
    subcategories: [
      { id: "pinterest-images", title: "Images", tools: [soon("Pinterest Pin Resize"), soon("Pinterest Cover Resize")] },
      { id: "pinterest-content", title: "Content", tools: [soon("Pinterest Title Checker"), soon("Pinterest Description Checker")] },
    ],
  },
  {
    id: "threads",
    title: "Threads Tools",
    subcategories: [
      {
        id: "threads-tools",
        title: "Threads",
        tools: [soon("Threads Character Counter"), soon("Threads Hashtag Generator"), soon("Threads Caption Formatter")],
      },
    ],
  },
  {
    id: "x-twitter",
    title: "X (Twitter) Tools",
    subcategories: [
      {
        id: "x-twitter-tools",
        title: "X (Twitter)",
        tools: [
          soon("Tweet Character Counter"),
          soon("Tweet Formatter"),
          live("X Hashtag Generator", "/tools/hashtag-generator", "Buat hashtag dari kata kunci atau topik."),
          soon("Profile Banner Resize"),
          soon("Profile Picture Resize"),
        ],
      },
    ],
  },
  {
    id: "social-image-tools",
    title: "Social Media Image Tools",
    subcategories: [
      {
        id: "social-image-tools-all",
        title: "Image Tools",
        tools: [
          soon("Social Media Image Resize"),
          soon("Social Media Banner Resize"),
          soon("Social Media Profile Picture Resize"),
          soon("Social Media Thumbnail Generator"),
          soon("Watermark for Social Media"),
          live("Compress Social Media Image", "/tools/compress-jpg", "Perkecil ukuran file JPG."),
        ],
      },
    ],
  },
  {
    id: "social-video-tools",
    title: "Social Media Video Tools",
    subcategories: [
      {
        id: "social-video-tools-all",
        title: "Video Tools",
        tools: [
          soon("Social Media Video Resize"),
          live("Social Media Video Compressor", "/tools/compress-video", "Perkecil ukuran file video."),
          soon("Convert Video to 9:16"),
          soon("Convert Video to 1:1"),
          soon("Convert Video to 16:9"),
          soon("Social Media Thumbnail Generator"),
          soon("Extract Thumbnail from Video"),
        ],
      },
    ],
  },
  {
    id: "content-creator-tools",
    title: "Content Creator Tools",
    subcategories: [
      {
        id: "content-creator-tools-all",
        title: "Creator Tools",
        tools: [
          soon("Caption Generator"),
          live("Hashtag Generator", "/tools/hashtag-generator", "Buat hashtag dari kata kunci atau topik."),
          live("Emoji Picker", "/tools/emoji-picker", "Cari & salin emoji dengan cepat."),
          soon("Line Break Formatter"),
          live("Bio Generator", "/tools/instagram-bio-generator", "Susun bio dari beberapa baris & emoji."),
          live("Username Generator", "/tools/instagram-username-generator", "Buat ide username unik."),
          soon("Text Case Converter"),
          soon("Word Counter"),
          soon("Character Counter"),
          soon("Reading Time Calculator"),
        ],
      },
    ],
  },
  {
    id: "social-size-guide",
    title: "Social Media Size Guide",
    subcategories: [
      {
        id: "size-guide-instagram",
        title: "Instagram",
        tools: [
          live("Instagram Size Guide", "/tools/social-media-image-size-guide", "Feed, Story, Reel, Carousel, Profile."),
        ],
      },
      {
        id: "size-guide-tiktok",
        title: "TikTok",
        tools: [
          live("TikTok Size Guide", "/tools/social-media-image-size-guide", "Video, Cover, Profile."),
        ],
      },
      {
        id: "size-guide-youtube",
        title: "YouTube",
        tools: [
          live("YouTube Size Guide", "/tools/social-media-image-size-guide", "Thumbnail, Banner, Shorts, Profile."),
        ],
      },
      {
        id: "size-guide-facebook",
        title: "Facebook",
        tools: [
          live("Facebook Size Guide", "/tools/social-media-image-size-guide", "Cover, Feed, Story."),
        ],
      },
      {
        id: "size-guide-linkedin",
        title: "LinkedIn",
        tools: [
          live("LinkedIn Size Guide", "/tools/social-media-image-size-guide", "Banner, Post, Company Cover."),
        ],
      },
      {
        id: "size-guide-pinterest",
        title: "Pinterest",
        tools: [
          live("Pinterest Size Guide", "/tools/social-media-image-size-guide", "Pin, Cover."),
        ],
      },
      {
        id: "size-guide-x",
        title: "X",
        tools: [
          live("X Size Guide", "/tools/social-media-image-size-guide", "Banner, Profile."),
        ],
      },
    ],
  },
];

export const SOCIAL_MEDIA_TOOL_COUNT = SOCIAL_MEDIA_CATEGORIES.reduce(
  (sum, group) => sum + group.subcategories.reduce((s, sub) => s + sub.tools.length, 0),
  0,
);

export const SOCIAL_MEDIA_LIVE_COUNT = SOCIAL_MEDIA_CATEGORIES.reduce(
  (sum, group) =>
    sum + group.subcategories.reduce((s, sub) => s + sub.tools.filter((t) => t.status === "live").length, 0),
  0,
);

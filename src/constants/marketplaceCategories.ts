import type { MegaCategoryGroup } from "@/interfaces/megaCategory";

function live(title: string, href: string, description?: string): { title: string; href: string; description?: string; status: "live" } {
  return { title, href, description, status: "live" };
}

function soon(title: string, description?: string): { title: string; description?: string; status: "coming-soon" } {
  return { title, description, status: "coming-soon" };
}

export const MARKETPLACE_CATEGORIES: MegaCategoryGroup[] = [
  {
    id: "pricing-profit",
    title: "Pricing & Profit",
    subcategories: [
      {
        id: "pricing",
        title: "Pricing",
        tools: [
          live("HPP Calculator", "/tools/hpp-calculator", "Hitung harga pokok produksi per unit."),
          live("Selling Price Calculator", "/tools/selling-price-calculator", "Hitung harga jual dari HPP & target margin."),
          live("Profit Calculator", "/tools/profit-calculator", "Hitung profit dari harga jual & modal."),
          live("Margin Calculator", "/tools/margin-calculator", "Hitung margin dari harga jual & modal."),
          live("Markup Calculator", "/tools/markup-calculator", "Hitung harga jual dari modal & markup %."),
          live("ROI Calculator", "/tools/roi-calculator", "Hitung ROI dari investasi & keuntungan."),
          live("Break Even Point Calculator", "/tools/break-even-point-calculator", "Hitung titik impas (BEP) usaha."),
          live("Discount Calculator", "/tools/marketplace-discount-calculator", "Hitung harga setelah diskon."),
          live("Cashback Calculator", "/tools/cashback-calculator", "Hitung cashback dari belanja."),
          live("Bundle Price Calculator", "/tools/bundle-price-calculator", "Hitung hemat dari harga bundling."),
          live("Wholesale Price Calculator", "/tools/wholesale-price-calculator", "Hitung harga grosir dari harga eceran."),
          live("Reseller Price Calculator", "/tools/reseller-price-calculator", "Hitung harga jual reseller dari modal & margin."),
        ],
      },
      {
        id: "marketplace-fee",
        title: "Marketplace Fee",
        tools: [
          live("Shopee Fee Calculator", "/tools/shopee-fee-calculator", "Estimasi biaya admin & pendapatan bersih Shopee."),
          live("Tokopedia Fee Calculator", "/tools/tokopedia-fee-calculator", "Estimasi biaya admin & pendapatan bersih Tokopedia."),
          live("TikTok Shop Fee Calculator", "/tools/tiktok-shop-fee-calculator", "Estimasi biaya admin & pendapatan bersih TikTok Shop."),
          live("Lazada Fee Calculator", "/tools/lazada-fee-calculator", "Estimasi biaya admin & pendapatan bersih Lazada."),
          live("Blibli Fee Calculator", "/tools/blibli-fee-calculator", "Estimasi biaya admin & pendapatan bersih Blibli."),
          live("Bukalapak Fee Calculator", "/tools/bukalapak-fee-calculator", "Estimasi biaya admin & pendapatan bersih Bukalapak."),
        ],
      },
    ],
  },
  {
    id: "shipping-packaging",
    title: "Shipping & Packaging",
    subcategories: [
      {
        id: "shipping",
        title: "Shipping",
        tools: [soon("Volumetric Weight Calculator"), soon("Actual Weight Calculator"), soon("Shipping Cost Estimator"), soon("Delivery Time Estimator")],
      },
      {
        id: "packaging",
        title: "Packaging",
        tools: [
          soon("Box Size Calculator"),
          soon("Bubble Wrap Calculator"),
          soon("Packing Cost Calculator"),
          soon("Packaging Material Estimator"),
          soon("Shipping Label Size Guide"),
        ],
      },
    ],
  },
  {
    id: "product-images",
    title: "Product Images",
    subcategories: [
      {
        id: "editing",
        title: "Editing",
        tools: [
          live("Compress Product Image", "/tools/compress-jpg", "Perkecil ukuran file JPG."),
          live("Resize Product Image", "/tools/resize-image", "Ubah ukuran gambar JPG/PNG/WebP."),
          soon("Crop Product Image"),
          soon("Rotate Product Image"),
          soon("Flip Product Image"),
          soon("Watermark Product Image"),
          soon("Blur Sensitive Information"),
        ],
      },
      {
        id: "marketplace-resize",
        title: "Marketplace Resize",
        tools: [
          soon("Shopee Product Image Resize"),
          soon("Tokopedia Product Image Resize"),
          soon("TikTok Shop Product Image Resize"),
          soon("Lazada Product Image Resize"),
          soon("Blibli Product Image Resize"),
        ],
      },
      {
        id: "marketplace-banner",
        title: "Marketplace Banner",
        tools: [soon("Shopee Banner Resize"), soon("Tokopedia Banner Resize"), soon("TikTok Shop Banner Resize"), soon("Lazada Banner Resize")],
      },
      {
        id: "gallery",
        title: "Gallery",
        tools: [soon("Product Collage Maker"), soon("Before & After Image"), soon("Image Splitter")],
      },
    ],
  },
  {
    id: "product-content",
    title: "Product Content",
    subcategories: [
      {
        id: "product",
        title: "Product",
        tools: [
          soon("Product Title Length Checker"),
          soon("Product Description Formatter"),
          soon("Bullet Point Generator"),
          soon("Product Keyword Generator"),
          soon("Product Slug Generator"),
          soon("SKU Name Generator"),
        ],
      },
      {
        id: "product-seo",
        title: "SEO",
        tools: [soon("Product Meta Title Generator"), soon("Product Meta Description Generator"), soon("Alt Text Generator")],
      },
    ],
  },
  {
    id: "labels-barcode",
    title: "Labels & Barcode",
    subcategories: [
      {
        id: "barcode",
        title: "Barcode",
        tools: [
          live("Barcode Generator", "/tools/barcode", "Buat barcode CODE128 dari teks."),
          live("QR Code Generator", "/tools/qr-code", "Buat QR code dari teks atau tautan."),
          soon("SKU Generator"),
          soon("Product Code Generator"),
        ],
      },
      {
        id: "printing",
        title: "Printing",
        tools: [soon("Price Tag Generator"), soon("Product Label Generator"), soon("Shelf Label Generator"), soon("Thermal Label Generator")],
      },
    ],
  },
  {
    id: "inventory-tools",
    title: "Inventory Tools",
    subcategories: [
      {
        id: "stock",
        title: "Stock",
        tools: [soon("SKU Generator"), soon("Stock Counter"), soon("Low Stock Reminder"), soon("Product Variant Generator")],
      },
      {
        id: "variant",
        title: "Variant",
        tools: [soon("Color Variant Generator"), soon("Size Variant Generator"), soon("SKU Combination Generator")],
      },
    ],
  },
  {
    id: "sales-tools",
    title: "Sales Tools",
    subcategories: [
      {
        id: "sales",
        title: "Sales",
        tools: [
          soon("Sales Target Calculator"),
          soon("Daily Sales Calculator"),
          soon("Monthly Sales Calculator"),
          soon("Conversion Rate Calculator"),
          soon("Average Order Value Calculator"),
          soon("Revenue Calculator"),
        ],
      },
      {
        id: "promotion",
        title: "Promotion",
        tools: [soon("Flash Sale Calculator"), soon("Voucher Calculator"), soon("Buy 1 Get 1 Calculator"), soon("Bundle Discount Calculator")],
      },
    ],
  },
  {
    id: "review-tools",
    title: "Review Tools",
    subcategories: [
      {
        id: "review-tools-all",
        title: "Review",
        tools: [soon("Rating Calculator"), soon("Review Percentage Calculator"), soon("Average Rating Calculator"), soon("Seller Performance Calculator")],
      },
    ],
  },
  {
    id: "csv-tools",
    title: "CSV Tools",
    subcategories: [
      {
        id: "csv-tools-all",
        title: "CSV",
        tools: [soon("CSV Viewer"), soon("CSV Splitter"), soon("CSV Merger"), soon("CSV to Excel"), soon("Excel to CSV"), soon("Product CSV Validator")],
      },
    ],
  },
  {
    id: "marketplace-size-guide",
    title: "Marketplace Size Guide",
    subcategories: [
      {
        id: "size-guide-shopee",
        title: "Shopee",
        tools: [soon("Product Image Size"), soon("Banner Size"), soon("Store Banner Size"), soon("Voucher Banner Size"), soon("Video Size")],
      },
      {
        id: "size-guide-tokopedia",
        title: "Tokopedia",
        tools: [soon("Product Image Size"), soon("Banner Size"), soon("Store Logo Size")],
      },
      {
        id: "size-guide-tiktok-shop",
        title: "TikTok Shop",
        tools: [soon("Product Image Size"), soon("Video Size"), soon("Cover Size")],
      },
      { id: "size-guide-lazada", title: "Lazada", tools: [soon("Product Image Size"), soon("Banner Size")] },
      { id: "size-guide-blibli", title: "Blibli", tools: [soon("Product Image Size"), soon("Banner Size")] },
    ],
  },
  {
    id: "business-calculators",
    title: "Business Calculators",
    subcategories: [
      {
        id: "business-calculators-all",
        title: "Business",
        tools: [
          soon("Profit After Marketplace Fee"),
          soon("Net Income Calculator"),
          soon("Tax Calculator"),
          soon("Cash Flow Calculator"),
          soon("Inventory Turnover Calculator"),
          soon("Restock Calculator"),
          soon("Reorder Point Calculator"),
          soon("Safety Stock Calculator"),
        ],
      },
    ],
  },
  {
    id: "seller-utilities",
    title: "Seller Utilities",
    subcategories: [
      {
        id: "seller-utilities-all",
        title: "Utilities",
        tools: [
          soon("Random Order Picker"),
          soon("Order Number Generator"),
          soon("Invoice Number Generator"),
          soon("Purchase Order Number Generator"),
          soon("Packing Checklist Generator"),
          soon("Product ID Generator"),
        ],
      },
    ],
  },
  {
    id: "logistics",
    title: "Logistics",
    subcategories: [
      {
        id: "logistics-all",
        title: "Logistics",
        tools: [
          soon("Container Volume Calculator"),
          soon("Carton Capacity Calculator"),
          soon("Box Fill Calculator"),
          soon("Pallet Calculator"),
          soon("Packing Density Calculator"),
        ],
      },
    ],
  },
  {
    id: "marketplace-seo",
    title: "Marketplace SEO",
    subcategories: [
      {
        id: "marketplace-seo-all",
        title: "SEO",
        tools: [
          soon("Product Keyword Checker"),
          soon("Product URL Slug Generator"),
          soon("Product Title Optimizer"),
          soon("Product Description Length Checker"),
          soon("Search Keyword Formatter"),
        ],
      },
    ],
  },
];

export const MARKETPLACE_TOOL_COUNT = MARKETPLACE_CATEGORIES.reduce(
  (sum, group) => sum + group.subcategories.reduce((s, sub) => s + sub.tools.length, 0),
  0,
);

export const MARKETPLACE_LIVE_COUNT = MARKETPLACE_CATEGORIES.reduce(
  (sum, group) =>
    sum + group.subcategories.reduce((s, sub) => s + sub.tools.filter((t) => t.status === "live").length, 0),
  0,
);

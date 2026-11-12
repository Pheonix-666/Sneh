/**
 * Pricing and luxury discount utility for SNEH ENTERPRISES
 */

export interface PricingDetails {
  originalPrice: number;    // Real MRP (e.g. ₹3,499)
  discountedPrice: number;  // Selling price (e.g. ₹2,499)
  discountPercent: number;  // Real calculated percentage (e.g. 29%)
  savings: number;          // Total savings amount (e.g. ₹1,000)
}

export function formatINR(amount: number): string {
  return '₹' + Math.round(amount).toLocaleString('en-IN');
}

export function getProductPricing(product: {
  id?: string | number;
  name?: string;
  price?: number;
  original_price?: number | string | null;
  originalPrice?: number | string | null;
} | null | undefined): PricingDetails {
  if (!product) {
    return {
      originalPrice: 0,
      discountedPrice: 0,
      discountPercent: 0,
      savings: 0,
    };
  }

  const basePrice = Number(product.price) || 0;
  const rawOriginal = Number(product.original_price ?? product.originalPrice);

  if (rawOriginal && rawOriginal > basePrice && basePrice > 0) {
    const originalPrice = Math.round(rawOriginal);
    const discountedPrice = Math.round(basePrice);
    const savings = Math.max(0, originalPrice - discountedPrice);
    const discountPercent = Math.round((savings / originalPrice) * 100);

    return {
      originalPrice,
      discountedPrice,
      discountPercent,
      savings,
    };
  }

  if (basePrice <= 0) {
    return {
      originalPrice: 0,
      discountedPrice: 0,
      discountPercent: 0,
      savings: 0,
    };
  }

  // Fallback: estimate MRP at ~35% higher
  const originalPrice = Math.round((basePrice * 1.35) / 50) * 50 - 1; // e.g. ends in 49 or 99
  const discountedPrice = basePrice;
  const savings = Math.max(0, originalPrice - discountedPrice);
  const discountPercent = Math.round((savings / originalPrice) * 100);

  return {
    originalPrice,
    discountedPrice,
    discountPercent,
    savings,
  };
}


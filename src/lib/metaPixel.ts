/**
 * Meta Pixel Integration & Event Dispatcher
 * Meta Pixel ID: 571071882231100
 * Website: Nashka Tourism (نشكا للسياحة)
 * 
 * Rules:
 * 1. Global asynchronous loader & noscript fallback embedded in index.html
 * 2. Prevents duplicate pixel initialization & duplicate PageView on first load
 * 3. Dispatches clean single PageView on SPA route transitions
 * 4. Prepared architecture for future conversion events (Lead, Contact, CompleteRegistration)
 *    flagged inactive until explicitly tested and enabled.
 */

export const META_PIXEL_ID = '571071882231100';

// Global window declaration for fbq
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
    __nashkaInitialPageViewFired?: boolean;
    __nashkaLastTrackedPath?: string;
  }
}

/**
 * Check if Meta Pixel (fbq) is loaded and ready
 */
export function isPixelAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
}

/**
 * Track standard PageView event safely.
 * Prevents firing duplicates on the same route or on the initial HTML render.
 */
export function trackPageView(pageIdentifier?: string): void {
  if (typeof window === 'undefined') return;

  const currentPath = pageIdentifier || window.location.pathname + window.location.hash;

  // If this is the initial load and index.html already tracked it, mark and skip
  if (!window.__nashkaInitialPageViewFired) {
    window.__nashkaInitialPageViewFired = true;
    window.__nashkaLastTrackedPath = currentPath;
    return;
  }

  // Prevent duplicate PageView if route hasn't changed
  if (window.__nashkaLastTrackedPath === currentPath) {
    return;
  }

  window.__nashkaLastTrackedPath = currentPath;

  if (isPixelAvailable()) {
    try {
      window.fbq!('track', 'PageView');
    } catch {
      // Gracefully silent if blocked by user adblocker/privacy shield
    }
  }
}

/**
 * Architecture Flag for Conversion Events:
 * Per instructions: "Do not fire conversion events until their corresponding actions are properly configured and tested."
 * Set to false until approved for production campaign launch.
 */
export const CONVERSION_TRACKING_ENABLED = false;

export interface LeadEventParams {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  applicant_count?: number;
}

export interface ContactEventParams {
  channel: 'whatsapp' | 'phone' | 'form';
  content_name?: string;
}

export interface CompleteRegistrationParams {
  content_name?: string;
  status?: string;
  value?: number;
  currency?: string;
}

/**
 * Track Lead Event (Architecture prepared for future use)
 */
export function trackLeadEvent(params?: LeadEventParams): void {
  if (!CONVERSION_TRACKING_ENABLED || !isPixelAvailable()) return;
  try {
    window.fbq!('track', 'Lead', params);
  } catch {
    // Fail-safe
  }
}

/**
 * Track Contact Event (Architecture prepared for future use)
 */
export function trackContactEvent(params?: ContactEventParams): void {
  if (!CONVERSION_TRACKING_ENABLED || !isPixelAvailable()) return;
  try {
    window.fbq!('track', 'Contact', params);
  } catch {
    // Fail-safe
  }
}

/**
 * Track CompleteRegistration Event (Architecture prepared for future use)
 */
export function trackCompleteRegistrationEvent(params?: CompleteRegistrationParams): void {
  if (!CONVERSION_TRACKING_ENABLED || !isPixelAvailable()) return;
  try {
    window.fbq!('track', 'CompleteRegistration', params);
  } catch {
    // Fail-safe
  }
}

/**
 * Custom Event helper
 */
export function trackCustomEvent(eventName: string, customData?: Record<string, any>): void {
  if (!isPixelAvailable()) return;
  try {
    window.fbq!('trackCustom', eventName, customData);
  } catch {
    // Fail-safe
  }
}

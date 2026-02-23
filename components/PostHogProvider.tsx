'use client';

import React from 'react';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && !posthog.__loaded) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.posthog.com',
        capture_pageview: true,
        autocapture: false,
        loaded: () => posthog.register({ site: 'bill-of-computational-rights' }),
      });
    }
  }, []);
  return <PHProvider client={posthog}>{children}</PHProvider>;
}

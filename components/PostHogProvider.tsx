'use client';

import { useEffect, type ReactNode } from 'react';
import posthog from 'posthog-js';

type Props = { children: ReactNode };

export function PostHogProvider({ children }: Props) {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_API_KEY) return;
    if (posthog.__loaded) return;

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.posthog.com',
      capture_pageview: true,
      autocapture: false,
      loaded: () => posthog.register({ site: 'bill-of-computational-rights' }),
    });
  }, []);

  return <>{children}</>;
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { dataStore } from '../../src/data/store';

export default function PortalPage() {
  const router = useRouter();

  useEffect(() => {
    const user = dataStore.getCurrentUser();
    if (user) {
      if (user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/student/dashboard');
      }
    } else {
      router.push('/student/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-paper-50)] text-xs text-[var(--color-ink-600)]">
      Redirecting to Online Campus...
    </div>
  );
}

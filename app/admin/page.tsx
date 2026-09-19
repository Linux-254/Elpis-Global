'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { dataStore } from '../../src/data/store';

export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    const user = dataStore.getCurrentUser();
    if (user && user.role === 'admin') {
      router.push('/admin/dashboard');
    } else {
      dataStore.login('admin@zegs.ac.ug');
      router.push('/admin/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-brand-blue-900)] text-white text-xs">
      Loading ZEGS Administrative Portal...
    </div>
  );
}

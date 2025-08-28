'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Table, 
  Menu as MenuIcon, 
  Settings,
  BarChart3
} from 'lucide-react';

const adminNavItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Tables',
    href: '/admin/tables',
    icon: Table,
  },
  {
    title: 'Menu',
    href: '/admin/menu',
    icon: MenuIcon,
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {adminNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center space-x-2 text-sm font-medium transition-colors hover:text-amber-600',
              isActive 
                ? 'text-amber-600 border-b-2 border-amber-600' 
                : 'text-gray-600'
            )}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden md:inline-block">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}

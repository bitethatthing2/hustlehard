'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';

type NavLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  group?: string;
};

interface NavDropdownProps {
  label: string;
  icon?: React.ReactNode;
  links: NavLink[];
  className?: string;
}

export default function NavDropdown({ label, icon, links, className = '' }: NavDropdownProps) {
  // Group links by their group property
  const groupedLinks = links.reduce<Record<string, NavLink[]>>((acc, link) => {
    const group = link.group || 'default';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(link);
    return acc;
  }, {});

  const groups = Object.keys(groupedLinks);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="default" 
          className={`flex items-center gap-2 px-4 py-2 h-auto shadow-md rounded-lg bg-white hover:bg-white/90 ${className}`}
          size="default"
        >
          {icon && <span className="mr-1">{icon}</span>}
          <span className="font-bold text-black">{label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white">
        <DropdownMenuLabel className="text-black font-bold">{label}</DropdownMenuLabel>
        {groups.map((group, groupIndex) => (
          <React.Fragment key={group}>
            {groupIndex > 0 && <DropdownMenuSeparator />}
            {group !== 'default' && (
              <DropdownMenuLabel className="text-black text-sm font-medium">{group}</DropdownMenuLabel>
            )}
            <DropdownMenuGroup>
              {groupedLinks[group].map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href} className="flex items-center cursor-pointer w-full text-black">
                    {link.icon && <span className="mr-2 text-black">{link.icon}</span>}
                    <span className="text-black">{link.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 
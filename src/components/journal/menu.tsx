"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";  // Utility function for conditional classNames (optional, customize as needed)

interface MenuProps extends DropdownMenu.DropdownMenuProps {}
interface MenuTriggerProps extends DropdownMenu.DropdownMenuTriggerProps {}
interface MenuContentProps extends DropdownMenu.DropdownMenuContentProps {}
interface MenuItemProps extends DropdownMenu.DropdownMenuItemProps {}

export function Menu({ children, ...props }: MenuProps) {
    return <DropdownMenu.Root {...props}>{children}</DropdownMenu.Root>;
}

export function MenuTrigger({ children, ...props }: MenuTriggerProps) {
    return (
        <DropdownMenu.Trigger asChild {...props}>
            {children}
        </DropdownMenu.Trigger>
    );
}

export function MenuContent({ className, ...props }: MenuContentProps) {
    return (
        <DropdownMenu.Content
            className={cn(
                "bg-white shadow-md rounded-lg py-2 px-2 min-w-[8rem] border border-gray-200 z-10",
                className
            )}
            {...props}
        />
    );
}

export function MenuItem({ className, ...props }: MenuItemProps) {
    return (
        <DropdownMenu.Item
            className={cn(
                "cursor-pointer select-none px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md",
                className
            )}
            {...props}
        />
    );
}
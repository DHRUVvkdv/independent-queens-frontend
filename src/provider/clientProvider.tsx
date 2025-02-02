'use client';

import { UserProvider } from "@/provider/userProvider";

export default function ClientProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}
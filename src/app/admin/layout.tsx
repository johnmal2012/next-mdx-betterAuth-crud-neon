// app/layout.tsx is the root layout: all nested layouts inherit it automatically; so no need to import it inside nested layouts
import type {
  ReactNode,
} from 'react';

type Props = {
  children: ReactNode;
};

export default function AdminLayout({
  children,
}: Props) {
  return (
    <main className="
        min-h-screen
        bg-zinc-100
        text-zinc-900">
      {children}
    </main>
  );
}
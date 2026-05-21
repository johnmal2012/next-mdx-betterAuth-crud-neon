import { renderMDX } from '@/lib/mdx';

type Props = {
  title: string;
  content: string;
};

export default async function PhysicianSection({
  title,
  content,
}: Props) {
  const mdx = await renderMDX(content);

  return (
    <section className="space-y-4 border-b pb-10">
      <h2 className="
        text-3xl
        font-semibold
        mt-8
        mb-5">
        {title}
      </h2>

      <article className="max-w-none">
        {mdx}
      </article>
    </section>
  );
}
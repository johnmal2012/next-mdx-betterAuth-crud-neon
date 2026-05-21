import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { useMDXComponents } from '@/components/mdx-components';

export async function renderMDX(source: string) {
  //  console.log('source: ', source);
  const { content } = await compileMDX({
    source,
    components: useMDXComponents({}),
    options: {
      //   parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return content;
}

import ReactMarkdown from 'react-markdown';
import { navigate, withBase } from '../lib/router';

// Links to other courses are written as app paths, e.g. "/curso/27018" or "/curso/27559/modulo/8"
const isInternal = (href?: string) => href?.startsWith('/curso/') ?? false;

export function Markdown({ content }: { content: string }) {
  return (
    <div className="prose-custom">
      <ReactMarkdown
        components={{
          p: ({ node: _node, ...props }) => <p className="mb-6" {...props} />,
          ul: ({ node: _node, ...props }) => <ul className="list-[square] list-outside pl-6 space-y-4 mb-8 marker:text-[#1c69d4] [&_ul]:mt-4 [&_ul]:mb-0" {...props} />,
          ol: ({ node: _node, ...props }) => <ol className="list-decimal list-outside pl-6 space-y-4 mb-8 marker:text-[#1c69d4] marker:font-bold" {...props} />,
          li: ({ node: _node, ...props }) => <li className="pl-2" {...props} />,
          blockquote: ({ node: _node, ...props }) => <blockquote className="border-l-4 border-[#1c69d4] bg-[#0d0d0d] px-6 py-4 mb-8 [&_p]:mb-0" {...props} />,
          h1: ({ node: _node, ...props }) => <h2 className="text-[28px] md:text-[40px] leading-[1.1] mt-16 mb-8 border-b border-[#3c3c3c] pb-4" {...props} />,
          h2: ({ node: _node, ...props }) => <h3 className="text-[20px] md:text-[24px] leading-[1.3] mt-12 mb-6" {...props} />,
          a: ({ node: _node, href, children, ...props }) => {
            if (isInternal(href)) {
              const target = withBase(href!);
              return (
                <a
                  href={target}
                  onClick={e => {
                    // Let modified clicks (new tab, etc.) behave like normal links
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                    e.preventDefault();
                    navigate(target);
                  }}
                  className="text-[#1c69d4] underline underline-offset-4 hover:text-white"
                  {...props}
                >
                  {children}
                </a>
              );
            }
            return <a href={href} target="_blank" rel="noreferrer" className="text-[#1c69d4] underline underline-offset-4" {...props}>{children}</a>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";
import type { Components } from "react-markdown";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({
  content,
  className = "",
}) => {
  const components: Components = {
    // Wrap everything in a div with className
    div: ({ children }) => <div className={className}>{children}</div>,
    // Custom link component for internal routing
    a: ({ href, children, ...props }) => {
      // Check if it's an internal link
      if (href?.startsWith("/")) {
        return (
          <Link
            to={href}
            className="text-blue-600 hover:text-blue-800 underline font-medium"
          >
            {children}
          </Link>
        );
      }
      // External link
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline font-medium"
          {...props}
        >
          {children}
        </a>
      );
    },
    // Bold text
    strong: ({ children }) => (
      <strong className="font-semibold text-black">{children}</strong>
    ),
    // Headers
    h1: ({ children }) => (
      <h1 className="text-3xl lg:text-4xl font-bold text-black mb-6 mt-8">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl lg:text-3xl font-semibold text-black mb-4 mt-6">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl lg:text-2xl font-medium text-black mb-3 mt-4">
        {children}
      </h3>
    ),
    // Paragraphs
    p: ({ children }) => (
      <p className="text-base lg:text-lg text-dark-3 mb-4 leading-relaxed">
        {children}
      </p>
    ),
    // Lists
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2 text-dark-3">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2 text-dark-3">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-base lg:text-lg leading-relaxed">{children}</li>
    ),
    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary-blue pl-4 py-2 mb-4 bg-blue-50 italic text-dark-3">
        {children}
      </blockquote>
    ),
    // Code blocks
    code: ({ children, className }) => {
      const isInline = !className;
      return isInline ? (
        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
          {children}
        </code>
      ) : (
        <code className="block bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-sm font-mono">
          {children}
        </code>
      );
    },
  };

  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;

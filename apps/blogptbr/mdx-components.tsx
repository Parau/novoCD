import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1.5rem 0 1rem 0', color: '#1a1a1a' }}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '1.25rem 0 0.75rem 0', color: '#1a1a1a' }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '1rem 0 0.5rem 0', color: '#1a1a1a' }}>
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p style={{ margin: '0.75rem 0', lineHeight: '1.6' }}>
        {children}
      </p>
    ),
    strong: ({ children }) => (
      <strong style={{ fontWeight: 'bold' }}>
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em style={{ fontStyle: 'italic' }}>
        {children}
      </em>
    ),
    code: ({ children }) => (
      <code style={{ 
        backgroundColor: '#f4f4f4', 
        padding: '0.125rem 0.25rem', 
        borderRadius: '0.25rem',
        fontFamily: 'Courier New, Courier, monospace',
        fontSize: '0.875rem'
      }}>
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre style={{ 
        backgroundColor: '#f4f4f4', 
        padding: '1rem', 
        borderRadius: '0.5rem',
        overflowX: 'auto',
        margin: '1rem 0'
      }}>
        {children}
      </pre>
    ),
    ul: ({ children }) => (
      <ul style={{ margin: '0.75rem 0', paddingLeft: '1.5rem' }}>
        {children}
      </ul>
    ),
    li: ({ children }) => (
      <li style={{ margin: '0.25rem 0' }}>
        {children}
      </li>
    ),
    a: ({ children, href }) => (
      <a href={href} style={{ color: '#0066cc', textDecoration: 'underline' }}>
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote style={{
        borderLeft: '4px solid #ddd',
        paddingLeft: '1rem',
        margin: '1rem 0',
        color: '#666',
        fontStyle: 'italic'
      }}>
        {children}
      </blockquote>
    ),
    ...components,
  }
}

import { FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const CodeContent: FC<{ data: string; language?: string }> = ({ data, language = "js" }) => (
  <SyntaxHighlighter language={language} style={oneDark} customStyle={{ borderRadius: 4, fontSize: 14, margin: '16px 0' }}>
    {data}
  </SyntaxHighlighter>
);
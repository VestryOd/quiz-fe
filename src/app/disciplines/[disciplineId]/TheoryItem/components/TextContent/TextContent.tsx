import { Typography } from 'antd';
import { FC } from 'react';

export const TextContent: FC<{ data: string }> = ({ data }) => (
  <Typography.Paragraph>{data}</Typography.Paragraph>
);
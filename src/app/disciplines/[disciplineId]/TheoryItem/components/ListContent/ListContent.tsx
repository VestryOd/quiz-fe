import { FC } from 'react';

export const ListContent: FC<{ data: string[] }> = ({ data }) => (
  <ul>
    {data.map((item, idx) => (
      <li key={idx}>{item}</li>
    ))}
  </ul>
);
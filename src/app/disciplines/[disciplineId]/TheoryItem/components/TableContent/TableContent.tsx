import { FC } from 'react';
import styles from './TableContent.module.css';

export const TableContent: FC<{ data: string[][] }> = ({ data }) => (
  <table className={styles.table}>
    <tbody>
    {data.map((row, rowIdx) => (
      <tr key={rowIdx}>
        {row.map((cell, cellIdx) => (
          <td
            key={cellIdx}
            className={styles.td}
          >
            {cell}
          </td>
        ))}
      </tr>
    ))}
    </tbody>
  </table>
);
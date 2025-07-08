import { Theory } from '@/api/model';
import { useGetAllTheory } from "@/api/theory/theory";
import { TheoryItem } from '@/app/disciplines/[disciplineId]/TheoryItem';
import { DEFAULT_LIMIT } from '@/app/disciplines/[disciplineId]/TheoryTab/TheoryTab.constants';
import { TheoryTabProps } from '@/app/disciplines/[disciplineId]/TheoryTab/TheoryTab.model';
import React from "react";
import { Spin, Typography, Pagination } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./TheoryTab.module.css";

export const TheoryTab: React.FC<TheoryTabProps> = ({
  disciplineId,
  onTheoryClick,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || DEFAULT_LIMIT;

  const { data, isLoading, error, isFetching } = useGetAllTheory(disciplineId, {
    page,
    limit,
  });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    params.set("limit", String(limit));
    router.push(`?${params.toString()}`);
  };

  if (isLoading || isFetching) return <Spin />;
  if (error)
    return (
      <Typography.Text type="danger">Ошибка загрузки теории</Typography.Text>
    );
  if (!data || !data.items || data.items.length === 0)
    return (
      <Typography.Text>Теоретические материалы отсутствуют</Typography.Text>
    );

  return (
    <div>
      {data.items.map((item: Theory) =>
        !item ? null : (
          <div
            key={item.id}
            onClick={() => onTheoryClick(item.id)}
            className={styles.theoryItemWrapper}
          >
            <TheoryItem item={item} previewMode />
          </div>
        ),
      )}
      <div style={{ marginTop: 24, textAlign: "center" }}>
        <Pagination
          current={page}
          pageSize={limit}
          total={data.total}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

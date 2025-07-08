"use client";

import { useGetOneTheory } from '@/api/theory/theory';
import { TheoryItem } from '../../TheoryItem/TheoryItem';
import { Spin, Typography, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { notFound, useRouter } from 'next/navigation';
import React from 'react';

interface TheoryPageProps {
  params: Promise<{ disciplineId: string; theoryId: string }>;
}

export default function TheoryPage({ params }: TheoryPageProps) {
  const { disciplineId, theoryId } = React.use(params);
  const { data, isLoading, error } = useGetOneTheory(disciplineId, theoryId);
  const router = useRouter();

  if (isLoading) return <Spin />;
  if (error) return <Typography.Text type="danger">Ошибка загрузки теории</Typography.Text>;
  if (!data) return notFound();

  return (
    <div>
      <Button
        type="default"
        icon={<ArrowLeftOutlined />}
        onClick={() => router.push(`/disciplines/${disciplineId}`)}
        style={{ marginBottom: 24 }}
      >
        Назад к списку
      </Button>
      <TheoryItem item={data} />
    </div>
  );
} 
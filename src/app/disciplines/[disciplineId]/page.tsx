"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { Tabs, Spin, Typography } from "antd";
import { useGetDisciplines } from "@/api/discipline/discipline";
import type { TabsProps } from "antd";
import { TheoryTab } from "./TheoryTab/TheoryTab";
import { TAB_KEYS, TabKey } from "./constants";

export default function DisciplinePage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = (searchParams.get("tab") as TabKey) || TAB_KEYS[0];
  const disciplineId = params.disciplineId as string;

  // get all disciplines and looking for needed (we can replace it on separated getDisciplineById if exists)
  const { data: disciplines, isLoading } = useGetDisciplines();
  const discipline = disciplines?.find((d) => d.link_name === disciplineId);

  if (isLoading) return <Spin />;
  if (!discipline)
    return (
      <Typography.Text type="danger">Дисциплина не найдена</Typography.Text>
    );

  const handleTabChange = (key: string) => {
    router.push(`?tab=${key}`);
  };

  const handleTheoryClick = (theoryId: string) => {
    router.push(`/disciplines/${disciplineId}/theory/${theoryId}`);
  };

  const items: TabsProps["items"] = [
    {
      key: "theory",
      label: "Теория",
      children: (
        <TheoryTab
          disciplineId={disciplineId}
          onTheoryClick={handleTheoryClick}
        />
      ),
    },
    {
      key: "practice",
      label: "Практика",
      children: <div>Практические задания по дисциплине будут тут</div>,
    },
    {
      key: "quiz",
      label: "Квизы",
      children: <div>Квизы по дисциплине будут тут</div>,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <Typography.Title level={2}>{discipline.name}</Typography.Title>
      <Tabs items={items} activeKey={tab} onChange={handleTabChange} />
    </div>
  );
}

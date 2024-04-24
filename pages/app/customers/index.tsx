import React, { useEffect, useState } from 'react';
import PageTitle from 'components/ui_self/Typography/PageTitle';
import SectionTitle from 'components/ui_self/Typography/SectionTitle';
import Layout from 'components/containers/Layout';


interface client {
  name: string
  job: string
  avatar: string
  amount: number
  status: string
  date: string
}


export default function Index() {
  //此页面实现 客户信息的录入 客户信息查询 客户信息编辑与更新
  return (
    <Layout>
      <PageTitle>客户信息管理</PageTitle>

      <SectionTitle>客户信息</SectionTitle>
    </Layout>
  );
}

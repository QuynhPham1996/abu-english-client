import React, { useEffect, useState } from 'react';
import { Tabs as AntdTabs } from 'antd';
import { useRouter } from 'next/router';

import { TTabsProps } from './Tabs.types.d';

const Tabs: React.FC<TTabsProps> = ({ options = [], onKeyChange }) => {
  const key = 'tabKey';
  const router = useRouter();
  const { pathname } = router;

  const [activeKey, setActiveKey] = useState<string | null>(null);

  const handleTabChange = (activeKeyChanged: string): void => {
    router.push({ pathname, query: { [key]: activeKeyChanged } });
  };

  useEffect(() => {
    if (router?.query?.[key]) {
      const keyTab = router?.query?.[key] as string;
      setActiveKey(keyTab);
      onKeyChange?.(keyTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  useEffect(() => {
    if (!activeKey && !router?.query?.[key]) {
      router.push({ pathname, query: { [key]: options[0].key } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Tabs">
      <AntdTabs activeKey={activeKey as string} onChange={handleTabChange}>
        {options.map((option) => (
          <AntdTabs.TabPane tab={option.title} key={option.key}>
            {activeKey === option.key && option.children}
          </AntdTabs.TabPane>
        ))}
      </AntdTabs>
    </div>
  );
};

export default Tabs;

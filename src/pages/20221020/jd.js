const data = {
  nodes: [
    {
      id:    'node-0',
      label: '京东',
      data:  {
        type: 'company',
        icon: '\ue651',
      },
      style: {
        r: 50,
      },
    },
    {
      id:    'node-1',
      label: '某东',
      data:  {
        type: 'investor',
        icon: '\ue6fa',
      },
      style: {
        r: 20,
      },
    },
    {
      id:    'node-2',
      label: '李某云',
      data:  {
        type:      'investor',
        icon:      '\ue6fa',
        relations: {
          company:     ['xx分公司', 'xx分公司', '...'],
          managers:    ['张A', '廖A'],
          investments: [
            'xx保险有限公司',
            'xx旅行社',
            '...',
          ],
        },
      },
      style: {
        r: 20,
      },
    },
    {
      id:    'node-3',
      label: '张某',
      data:  {
        type: 'investor',
        icon: '\ue6fa',
      },
      style: {
        r: 20,
      },
    },
    {
      id:    'node-4',
      label: '张某奇',
      data:  {
        type: 'manager',
        icon: '\ue65b',
      },
      style: {
        r: 20,
      },
    },
    {
      id:    'node-5',
      label: '廖某红',
      data:  {
        type: 'manager',
        icon: '\ue65b',
      },
      style: {
        r: 20,
      },
    },
    {
      id:    'node-6',
      label: '滨州分公司',
      data:  {
        type: 'branch',
      },
      style: {
        r: 20,
      },
    },
    {
      id:    'node-7',
      label: '南京分公司',
      data:  {
        type: 'branch',
      },
      style: {
        r: 20,
      },
    },
    {
      id:    'node-8',
      label: '广州分公司',
      data:  {
        type: 'branch',
      },
      style: {
        r: 20,
      },
    },
    {
      id:    'node-9',
      label: '上海分公司',
      data:  {
        type: 'branch',
      },
      style: {
        r: 20,
      },
    },
    {
      id:    'node-10',
      label: '沈阳分公司',
      data:  {
        type: 'branch',
      },
      style: {
        r: 20,
      },
    },
    {
      id:    'node-11',
      label: '成都分公司',
      data:  {
        type: 'branch',
      },
      style: {
        r: 20,
      },
    },
    {
      id:    'node-12',
      label: '科学院分公司',
      data:  {
        type: 'branch',
      },
      style: {
        r: 20,
      },
    },
    {
      id:    'node-13',
      label: 'xx贸易\n有限公司',
      data:  {
        type: 'investment',
        icon: '\ue625',
      },
      style: {
        r: 20,
      },
    },
    {
      id:    'node-14',
      label: 'xx信息技术\n有限公司',
      data:  {
        type: 'investment',
        icon: '\ue625',
      },
      style: {
        r: 20,
      },
    },
    {
      id:    'node-15',
      label: 'xx保险\n有限公司',
      data:  {
        type: 'investment',
        icon: '\ue625',
      },
      style: {
        r: 20,
      },
    },
    {
      id:    'node-16',
      label: 'xx旅行社',
      data:  {
        type: 'investment',
        icon: '\ue625',
      },
      style: {
        r: 20,
      },
    },
    {
      id:    'node-17',
      label: 'xx通信\n有限公司',
      data:  {
        type: 'investment',
        icon: '\ue625',
      },
      style: {
        r: 20,
      },
    },
  ],
  edges: [
    {
      source: 'node-0',
      target: 'node-1',
    },
    {
      source: 'node-0',
      target: 'node-2',
    },
    {
      source: 'node-0',
      target: 'node-3',
    },
    {
      source: 'node-0',
      target: 'node-4',
    },
    {
      source: 'node-0',
      target: 'node-5',
    },
    {
      source: 'node-0',
      target: 'node-6',
    },
    {
      source: 'node-0',
      target: 'node-7',
    },
    {
      source: 'node-0',
      target: 'node-8',
    },
    {
      source: 'node-0',
      target: 'node-9',
    },
    {
      source: 'node-0',
      target: 'node-10',
    },
    {
      source: 'node-0',
      target: 'node-11',
    },
    {
      source: 'node-0',
      target: 'node-12',
    },
    {
      source: 'node-0',
      target: 'node-13',
    },
    {
      source: 'node-0',
      target: 'node-14',
    },
    {
      source: 'node-0',
      target: 'node-15',
    },
    {
      source: 'node-0',
      target: 'node-16',
    },
    {
      source: 'node-0',
      target: 'node-17',
    },
  ],
};

export default data;

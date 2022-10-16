const array = [];

for (let i = 20; i < 302; i++) {
  array.push({
    id:    `node-${i}`,
    label: `node-${i}`,
    data:  {},
    style: {
      r: 20,
    },
  });
}

const data = {
  nodes: [
    {
      id:    'node0',
      label: '东哥',
      data:  {
        type: 'people',
      },
      style: {
        r: 50,
      },
    },
    {
      id:    'node1',
      label: '京东',
      data:  {
        type:      'company',
        icon:      '\ue651',
        relations: {
          company:     ['滨州分公司', '南京分公司', '上海分公司', '...'],
          investors:   ['某东', '李某云', '张某'],
          managers:    ['张某奇', '廖某红'],
          investments: [
            'xx信息技术有限公司',
            'xx保险有限公司',
            'xx旅行社',
            '...',
          ],
        },
      },
      style: {
        r: 30,
      },
    },
    {
      id:    'node2',
      label: '腾讯',
      data:  {
        type: 'company',
        icon: '\ue882',
      },
      style: {
        r: 30,
      },
    },
    {
      id:    'node3',
      label: '奶茶妹妹',
      data:  {
        type: 'people',
      },
      style: {
        r: 30,
      },
    },
    {
      id:    'node4',
      label: '李某云',
      data:  {
        type: 'people',
      },
      style: {
        r: 30,
      },
    },
    {
      id:    'node5',
      label: '马某腾',
      data:  {
        type: 'people',
      },
      style: {
        r: 30,
      },
    },
    {
      id:    'node6',
      label: '张某',
      data:  {
        type: 'people',
      },
      isLeaf: true,
      style:  {
        r: 20,
      },
    },
    {
      id:    'node7',
      label: '徐某',
      data:  {
        type: 'people',
      },
      style: {
        r: 20,
      },
      isLeaf: true,
    },
    {
      id:    'node8',
      label: '马某腾',
      data:  {
        type: 'people',
      },
      style: {
        r: 20,
      },
      isLeaf: true,
    },
    {
      id:    'node9',
      label: '张某东',
      data:  {
        type: 'people',
      },
      style: {
        r: 20,
      },
      isLeaf: true,
    },
    {
      id:    'node10',
      label: '陈某单',
      data:  {
        type: 'people',
      },
      style: {
        r: 20,
      },
      isLeaf: true,
    },
    {
      id:    'node11',
      label: '许某',
      data:  {
        type: 'people',
      },
      style: {
        r: 20,
      },
      isLeaf: true,
    },
    {
      id:    'node12',
      label: '王某',
      data:  {
        type: 'people',
      },
      style: {
        r: 20,
      },
      isLeaf: true,
    },
    {
      id:    'node13',
      label: '李某',
      data:  {
        type: 'people',
      },
      style: {
        r: 20,
      },
      isLeaf: true,
    },
    {
      id:    'node14',
      label: '起泡酒公司',
      data:  {
        type: 'company',
      },
      style: {
        r: 20,
      },
      isLeaf: true,
    },
    {
      id:    'node20',
      label: '基金',
      data:  {
        type: 'company',
      },
      style: {
        r: 20,
      },
      isLeaf: true,
    },
    {
      id:    'node16',
      label: '珠宝',
      data:  {
        type: 'company',
      },
      style: {
        r: 20,
      },
      isLeaf: true,
    },
  ],
  edges: [
    {
      source: 'node0',
      target: 'node1',
      data:   {
        type: 'company',
      },
    },
    {
      source: 'node0',
      target: 'node2',
      data:   {
        type: 'parter',
      },
    },
    {
      source: 'node0',
      target: 'node3',
      data:   {
        type: 'parter',
      },
    },
    {
      source: 'node0',
      target: 'node4',
      data:   {
        type: 'parter',
      },
    },
    {
      source: 'node0',
      target: 'node5',
      data:   {
        type: 'parter',
      },
    },
    {
      source: 'node1',
      target: 'node6',
    },
    {
      source: 'node1',
      target: 'node7',
    },
    {
      source: 'node2',
      target: 'node8',
      data:   {
        type: 'manger',
      },
    },
    {
      source: 'node2',
      target: 'node9',
      data:   {
        type: 'manger',
      },
    },
    {
      source: 'node2',
      target: 'node10',
      data:   {
        type: 'manger',
      },
    },
    {
      source: 'node2',
      target: 'node11',
      data:   {
        type: 'manger',
      },
    },
    {
      source: 'node2',
      target: 'node12',
      data:   {
        type: 'manger',
      },
    },
    {
      source: 'node2',
      target: 'node13',
      data:   {
        type: 'manger',
      },
    },
    {
      source: 'node3',
      target: 'node14',
    },
    {
      source: 'node3',
      target: 'node20',
    },
    {
      source: 'node3',
      target: 'node16',
    },
  ],
};

// data.nodes.unshift(...array);

export default data;

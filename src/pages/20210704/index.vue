<template>
  <div class="root">
    <div id="headPanel">
      <span class="logo">G6 入门教程 - 粉丝答疑 - 辐射图添加分组</span>
    </div>
    <!-- canvas 挂载节点 -->
    <div id="graph" />
  </div>
</template>

<script>
  import { Graph, Grid } from '@antv/g6';

  export default {
    data () {
      return {
        graph: null,
      };
    },
    mounted () {
      // 创建画布
      this.createGraphic();
    },
    methods: {
      createGraphic () {
        const grid = new Grid();
        const graph = new Graph({
          container:    document.getElementById('graph'),
          width:        window.innerWidth,
          height:       window.innerHeight - 40,
          groupByTypes: false,
          defaultNode:  {
            style: {
              r: 10,
            },
          },
          defaultEdge: {
            style: {
              stroke: '#1976D2',
            },
          },
          modes: {
            default: ['drag-node', 'drag-canvas'],
          },
          animate: true,
          layout:  {
            type:           'radial',
            unitRadius:     70,
            maxIteration:   1000,
            linkDistance:   10,
            preventOverlap: true,
            nodeSize:       30,
            sortBy:         'sortAttr2',
            sortStrength:   50,
          },
          plugins: [grid],
        });

        const data = {
          nodes: [
            {
              id:        '0',
              label:     '0',
              sortAttr:  0,
              sortAttr2: 'a',
            },
            {
              id:        '1',
              label:     '1',
              sortAttr:  0,
              sortAttr2: 'a',
            },
            {
              id:        '2',
              label:     '2',
              sortAttr:  0,
              sortAttr2: 'a',
            },
            {
              id:        '3',
              label:     '3',
              sortAttr:  0,
              sortAttr2: 'a',
            },
            {
              id:        '4',
              label:     '4',
              sortAttr:  2,
              sortAttr2: 'c',
            },
            {
              id:        '5',
              label:     '5',
              sortAttr:  0,
              sortAttr2: 'a',
            },
            {
              id:        '6',
              label:     '6',
              sortAttr:  1,
              sortAttr2: 'b',
            },
            {
              id:        '7',
              label:     '7',
              sortAttr:  1,
              sortAttr2: 'b',
            },
            {
              id:        '8',
              label:     '8',
              sortAttr:  2,
              sortAttr2: 'c',
            },
            {
              id:        '9',
              label:     '9',
              sortAttr:  3,
              sortAttr2: 'd',
            },
            {
              id:        '10',
              label:     '10',
              sortAttr:  3,
              sortAttr2: 'd',
            },
            {
              id:        '11',
              label:     '11',
              sortAttr:  1,
              sortAttr2: 'b',
            },
            {
              id:        '12',
              label:     '12',
              sortAttr:  2,
              sortAttr2: 'c',
            },
            {
              id:        '13',
              label:     '13',
              sortAttr:  1,
              sortAttr2: 'b',
            },
            {
              id:        '14',
              label:     '14',
              sortAttr:  3,
              sortAttr2: 'd',
            },
            {
              id:        '15',
              label:     '15',
              sortAttr:  3,
              sortAttr2: 'd',
            },
            {
              id:        '16',
              label:     '16',
              sortAttr:  1,
              sortAttr2: 'b',
            },
            {
              id:        '17',
              label:     '17',
              sortAttr:  2,
              sortAttr2: 'c',
            },
            {
              id:        '18',
              label:     '18',
              sortAttr:  2,
              sortAttr2: 'c',
            },
            {
              id:        '19',
              label:     '19',
              sortAttr:  1,
              sortAttr2: 'b',
            },
            {
              id:        '20',
              label:     '20',
              sortAttr:  1,
              sortAttr2: 'b',
            },
            {
              id:        '21',
              label:     '21',
              sortAttr:  3,
              sortAttr2: 'd',
            },
            {
              id:        '22',
              label:     '22',
              sortAttr:  3,
              sortAttr2: 'd',
            },
            {
              id:        '23',
              label:     '23',
              sortAttr:  3,
              sortAttr2: 'd',
            },
            {
              id:        '24',
              label:     '24',
              sortAttr:  0,
              sortAttr2: 'a',
            },
            {
              id:        '25',
              label:     '25',
              sortAttr:  0,
              sortAttr2: 'a',
            },
            {
              id:        '26',
              label:     '26',
              sortAttr:  1,
              sortAttr2: 'b',
            },
            {
              id:        '27',
              label:     '27',
              sortAttr:  1,
              sortAttr2: 'b',
            },
            {
              id:        '28',
              label:     '28',
              sortAttr:  3,
              sortAttr2: 'd',
            },
            {
              id:        '29',
              label:     '29',
              sortAttr:  2,
              sortAttr2: 'c',
            },
            {
              id:        '30',
              label:     '30',
              sortAttr:  2,
              sortAttr2: 'c',
            },
            {
              id:        '31',
              label:     '31',
              sortAttr:  1,
              sortAttr2: 'b',
            },
            {
              id:        '32',
              label:     '32',
              sortAttr:  1,
              sortAttr2: 'b',
            },
            {
              id:        '33',
              label:     '33',
              sortAttr:  0,
              sortAttr2: 'a',
            },
          ],
          edges: [
            {
              source: '0',
              target: '1',
            },
            {
              source: '0',
              target: '2',
            },
            {
              source: '0',
              target: '3',
            },
            {
              source: '0',
              target: '4',
            },
            {
              source: '0',
              target: '5',
            },
            {
              source: '0',
              target: '7',
            },
            {
              source: '0',
              target: '8',
            },
            {
              source: '0',
              target: '9',
            },
            {
              source: '0',
              target: '10',
            },
            {
              source: '0',
              target: '11',
            },
            {
              source: '0',
              target: '13',
            },
            {
              source: '0',
              target: '14',
            },
            {
              source: '0',
              target: '15',
            },
            {
              source: '0',
              target: '16',
            },
            {
              source: '2',
              target: '3',
            },
            {
              source: '4',
              target: '5',
            },
            {
              source: '4',
              target: '6',
            },
            {
              source: '5',
              target: '6',
            },
            {
              source: '7',
              target: '13',
            },
            {
              source: '8',
              target: '14',
            },
            {
              source: '9',
              target: '10',
            },
            {
              source: '10',
              target: '22',
            },
            {
              source: '10',
              target: '14',
            },
            {
              source: '10',
              target: '12',
            },
            {
              source: '10',
              target: '24',
            },
            {
              source: '10',
              target: '21',
            },
            {
              source: '10',
              target: '20',
            },
            {
              source: '11',
              target: '24',
            },
            {
              source: '11',
              target: '22',
            },
            {
              source: '11',
              target: '14',
            },
            {
              source: '12',
              target: '13',
            },
            {
              source: '16',
              target: '17',
            },
            {
              source: '16',
              target: '18',
            },
            {
              source: '16',
              target: '21',
            },
            {
              source: '16',
              target: '22',
            },
            {
              source: '17',
              target: '18',
            },
            {
              source: '17',
              target: '20',
            },
            {
              source: '18',
              target: '19',
            },
            {
              source: '19',
              target: '20',
            },
            {
              source: '19',
              target: '33',
            },
            {
              source: '19',
              target: '22',
            },
            {
              source: '19',
              target: '23',
            },
            {
              source: '20',
              target: '21',
            },
            {
              source: '21',
              target: '22',
            },
            {
              source: '22',
              target: '24',
            },
            {
              source: '22',
              target: '25',
            },
            {
              source: '22',
              target: '26',
            },
            {
              source: '22',
              target: '23',
            },
            {
              source: '22',
              target: '28',
            },
            {
              source: '22',
              target: '30',
            },
            {
              source: '22',
              target: '31',
            },
            {
              source: '22',
              target: '32',
            },
            {
              source: '22',
              target: '33',
            },
            {
              source: '23',
              target: '28',
            },
            {
              source: '23',
              target: '27',
            },
            {
              source: '23',
              target: '29',
            },
            {
              source: '23',
              target: '30',
            },
            {
              source: '23',
              target: '31',
            },
            {
              source: '23',
              target: '33',
            },
            {
              source: '32',
              target: '33',
            },
          ],
        };

        graph.read(data);

        graph.on('afterrender', e => {
          setTimeout(_ => {

            const model = graph.findById('0').getModel();

            this.addGroupBg(graph, model);

          }, 500);
        });
      },
      addGroupBg(graph, { x, y }) {
        const colors = ['#9CCC65', '#D4E157', '#FFEE58', '#FFCA28', '#FFA726'];
        const distances = graph.get('layoutController').layoutMethods[0].distances[0];
        const maxLoop = Math.max(...distances);

        for (let i = 0; i <= maxLoop; i++) {
          const groupBg = graph.addItem('node', {
            id:    `group-${i}-bg`,
            x,
            y,
            style: {
              // r:      70 * i + 35,
              r:      1,
              fill:   colors[i],
              stroke: colors[i],
            },
          });

          groupBg.toBack();

          const group = groupBg.getContainer();
          const shape = group.getFirst();

          shape.animate(ratio => {
              return {
                r: ratio * (70 * i + 35),
              };
            }, {
              repeat:   false,
              duration: 1000,
              easing:   'easeCubic',
          });
        }

        /* const centerBg = graph.addItem('node', {
          id:    'centerBg',
          x,
          y,
          style: {
            r:      35,
            fill:   '#9CCC65',
            stroke: '#9CCC65',
          },
        });
        const secondBg = graph.addItem('node', {
          id:    'secondBg',
          x,
          y,
          style: {
            r:      70 + 35,
            fill:   '#D4E157',
            stroke: '#D4E157',
          },
        });
        const thirdBg = graph.addItem('node', {
          id:    'thirdBg',
          x,
          y,
          style: {
            r:      70* 2 + 35,
            fill:   '#FFEE58',
            stroke: '#FFEE58',
          },
        });
        const fourthBg = graph.addItem('node', {
          id:    'fourthBg',
          x,
          y,
          style: {
            r:      70 * 3 + 35,
            fill:   '#FFCA28',
            stroke: '#FFCA28',
          },
        });
        const fivethBg = graph.addItem('node', {
          id:    'fivethBg',
          x,
          y,
          style: {
            r:      70 * 4 + 35,
            fill:   '#FFA726',
            stroke: '#FFA726',
          },
        });

        centerBg.toBack();
        secondBg.toBack();
        thirdBg.toBack();
        fourthBg.toBack();
        fivethBg.toBack(); */
      },
    },
  };
</script>

<style lang="scss">
  #graph{margin: 0;}
</style>

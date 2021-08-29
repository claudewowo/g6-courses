/* eslint-disable no-alert */
/* eslint-disable no-undef */

$(function () {
  const { treeGraph } = window.createGraph.init();

  console.log(treeGraph);
  treeGraph.read(JSON.parse(JSON.stringify(mockData)));
  treeGraph.fitCenter();
});

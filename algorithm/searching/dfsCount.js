// graph 표현 방식: 2차원 배열
let graph = [
  [ 0, 1, 1, 0, 0 ],
  [ 0, 1, 1, 1, 1 ],
  [ 1, 0, 0, 0, 0 ],
  [ 0, 0, 1, 1, 1 ]
];
const n = 5;
const m = 4;

// 1로 연결된 영역의 개수 찾기
function dfs(graph, x, y, n, m) {
  graph[y][x] = 0; // 방문 처리
  const dx = [1, 0, -1, 0];
  const dy = [0, -1, 0, 1];
  for (let i = 0; i < 4; i++) {
    const nextX = x + dx[i];
    const nextY = y + dy[i];
    if (nextX < 0 || nextX >= n, nextY < 0 || nextY >= m) {
      continue; // 범위를 벗어나는 경우 다음 경로 탐색
    }
    if (graph[nextY][nextX] === 1) {  // 방문 가능한 경우
      dfs(graph, nextX, nextY, n, m); // 해당 경로 탐색
    }
  }
  return 1;
}

let numOfArea = 0;
for (let y = 0; y < m; y++) {
  for (let x = 0; x < n; x++) {
    if (graph[y][x] === 1) {
      numOfArea += dfs(graph, x, y, n, m);
    }
  }
}
console.log('영역의 개수: ', numOfArea);
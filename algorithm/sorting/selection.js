function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++){ // 처리되지 않은 첫 번째 원소
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++){ // 최소 원소 탐색
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]; // swap
  }
  return arr
}

const arr = Array.from({ length: 10 },
  () => Math.floor(Math.random() * 100)
);

console.log(arr);
console.log(selectionSort(arr));
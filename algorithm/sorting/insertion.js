function insertionSort(arr) {
	for (let i = 0; i < arr.length; i++) { // index < i 경우 정렬된 상태
		for (let j = i; j > 0; j--) { // 타겟 원소를 정렬된 원소들과 비교하며 자리 찾기
      if (arr[j] < arr[j-1]) {
        [ arr[j], arr[j-1] ] = [ arr[j-1], arr[j] ];
      } else {
        break; // 정렬된 상태이므로 더 이상 탐색할 필요 없음
      }
		}
	}
	return arr;
}

const arr = Array.from({ length: 10 },
	() => Math.floor(Math.random() * 100));

console.log(arr);
console.log(insertionSort(arr));
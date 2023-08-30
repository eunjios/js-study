function bubbleSort(arr) {
	for (let i = 0; i < arr.length; i++) { // 모든 원소를
		for (let j = 0; j < arr.length - i; j++) { // 옆의 원소와 비교
			if (arr[j] > arr[j+1]) {
				[arr[j], arr[j+1]] = [arr[j+1], arr[j]];
			}
		}
	}
	return arr;
}

const arr = Array.from({ length: 10 },
	() => Math.floor(Math.random() * 100));

console.log(arr);
console.log(bubbleSort(arr));
class Queue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }
  enqueue(item) {
    this.items[this.tail] = item;
    this.tail++;
  }
  dequeue() {
    const item = this.items[this.head];
    delete this.items[this.head];
    this.head++;
    return item;
  }
  peek() {
    return this.items[this.head];
  }
  getLength() {
    return this.tail - this.head;
  }
}

const queue = new Queue();

queue.enqueue(1);
queue.enqueue(2);
queue.peek(); // 1
queue.enqueue(3);
queue.dequeue();
queue.getLength(); // 2

// 전체 출력
while(queue.getLength() !== 0) {
  console.log(queue.dequeue);
}

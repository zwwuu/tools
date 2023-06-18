self.onmessage = (message: MessageEvent<{ min: number; max: number; quantity: number; duplicate: boolean }>) => {
  const { min, max, quantity, duplicate } = message.data;

  if (duplicate) {
    let numbers: number[] = [];

    while (numbers.length < quantity) {
      let num = Math.floor(Math.random() * (max - min + 1) + min);
      numbers.push(num);
    }
    postMessage(numbers);
    return;
  }

  let numbers = new Set<number>();
  while (numbers.size < quantity) {
    let num = Math.floor(Math.random() * (max - min + 1) + min);
    numbers.add(num);
  }
  postMessage(Array.from(numbers));
};

export {};

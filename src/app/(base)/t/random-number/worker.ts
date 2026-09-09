self.onmessage = (
  message: MessageEvent<{
    min: number;
    max: number;
    quantity: number;
    duplicate: boolean;
  }>,
) => {
  const { min, max, quantity, duplicate } = message.data;

  if (duplicate) {
    const numbers: number[] = [];

    while (numbers.length < quantity) {
      const num = Math.floor(Math.random() * (max - min + 1) + min);
      numbers.push(num);
    }
    postMessage(numbers);
    return;
  }

  const numbers = new Set<number>();
  while (numbers.size < quantity) {
    const num = Math.floor(Math.random() * (max - min + 1) + min);
    numbers.add(num);
  }
  postMessage(Array.from(numbers));
};

export {};

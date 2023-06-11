import React, { useState, useEffect, useMemo } from "react";

function getFibForRow(row: number[]): number[] {
  if (!row || !row.length) return [1];
  return row.flatMap((n, i, list) => {
    const lastNumber = list[i - 1] || 0;
    const currentNumber = n;
    const isFinalNumber = i === list.length - 1;
    const next = lastNumber + currentNumber;
    if (isFinalNumber) return [next, 1];
    return [next];
  });
}
//number[][] is a 2d array
function getFib(n: number = 4): number[][] {
  return Array.from({ length: n }).reduce<number[][]>((acc, _current) => {
    const lastRow = acc[acc.length - 1] || [];
    return [...acc, getFibForRow(lastRow)];
  }, []);
}

const FibonacciRow = ({ row }: { row: number[] }): JSX.Element => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {row.map((item: number, index: number) => (
        <div
          key={index}
          style={{ height: "2rem", width: "2.5rem", textAlign: "center" }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

// Sentence showing the largest number of the sequence.
// const biggest = fib.reduce((biggestOfAll, row) => {
//     const biggestOfRow = Math.max(...row);
//     return Math.max(biggestOfAll, biggestOfRow);
//   }, 0);
const BiggestNacc = ({ fib }: { fib: number[][] }): JSX.Element => {
  const biggest = fib.reduce((biggestOfAll, row) => {
    const biggestOfRow = row.reduce((biggest, number) => {
      return number > biggest ? number : biggest;
    }, 0);
    return biggestOfAll > biggestOfRow ? biggestOfAll : biggestOfRow;
  }, 0);
  const rowCount = fib.length;
  return (
    <div style={{ marginBottom: "1rem" }}>
      The biggest number across {rowCount} row{rowCount > 1 ? "s" : ""} of the
      sequence is: <strong>{biggest}</strong>
    </div>
  );
};

const FibonacciVisualizer = (): JSX.Element => {
  const [rowCountInput, setRowCountInput] = useState("10");
  const [validRowCount, setValidRowCount] = useState(() =>
    parseInt(rowCountInput, 10)
  );

  useEffect(() => {
    const inputNumber = parseInt(rowCountInput, 10);
    if (inputNumber > 0) {
      // Set valid row count
      setValidRowCount(inputNumber);
    }
  }, [rowCountInput]);
  const fib = useMemo(() => getFib(validRowCount), [validRowCount]);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <label style={{ marginBottom: "2rem" }}>
        How many rows of Fibonacci would you like to see?{" "}
        <input
          value={rowCountInput}
          onChange={(e) => setRowCountInput(e.currentTarget.value)}
          name="fib"
        />
      </label>
      <BiggestNacc fib={fib} />
      {fib.map((f) => (
        <FibonacciRow key={JSON.stringify(f)} row={f} />
      ))}
    </div>
  );
};

const Prymid_r = () => {
  return (
    <div>
      <FibonacciVisualizer />
    </div>
  );
};

export default Prymid_r;

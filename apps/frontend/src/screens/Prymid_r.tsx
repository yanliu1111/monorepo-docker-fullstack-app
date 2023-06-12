import React, { useState, useEffect, useMemo, ChangeEvent } from "react";

// Generates a single row of the Fibonacci sequence based on the previous row
function getFibForRow(row: number[]): number[] {
  if (!row || !row.length) return [1]; // If there is no previous row, return the first row of the sequence
  return row.flatMap((n, i, list) => {
    const lastNumber = list[i - 1] || 0; // Get the last number from the previous row, list is the previous row, i is the index of the current number
    const currentNumber = n;
    const isFinalNumber = i === list.length - 1; // Check if this is the last number in the previous row
    const next = lastNumber + currentNumber; // Add the last number from the previous row to the current number
    if (isFinalNumber) return [next, 1]; // If this is the last number in the previous row, return the next number and 1
    return [next];
  });
}
// Generates a 2D array representing the Fibonacci sequence up to the given number of rows
function getFib(n: number = 4): number[][] {
  return Array.from({ length: n }).reduce<number[][]>((acc, _current) => {
    const lastRow = acc[acc.length - 1] || []; // Get the last row from the accumulated array
    return [...acc, getFibForRow(lastRow)]; // Generate the next row and add it to the accumulated array.
  }, []);
}
// Shows single row of the sequence.
const FibonacciRow = ({ row }: { row: number[] }): JSX.Element => {
  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {row.map((item: number, index: number) => (
        <div
          key={index}
          style={{
            height: "2rem",
            width: "2.5rem",
            textAlign: "center",
            marginBottom: "0.5rem",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

// Sentence showing the largest number of the sequence.
const BiggestNacc = ({ fib }: { fib: number[][] }): JSX.Element => {
  const biggest = fib.reduce((biggestOfAll, row) => {
    const biggestOfRow = Math.max(...row);
    return Math.max(biggestOfAll, biggestOfRow);
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
  const [rowCountInput, setRowCountInput] = useState("");
  const [validRowCount, setValidRowCount] = useState(4);

  useEffect(() => {
    const inputNumber = parseInt(rowCountInput, 10);
    if (!isNaN(inputNumber) && inputNumber > 0) {
      setValidRowCount(inputNumber);
    }
  }, [rowCountInput]);

  const handleRowCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRowCountInput(e.currentTarget.value);
  };

  const fib = useMemo(() => getFib(validRowCount), [validRowCount]);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <label style={{ marginBottom: "2rem" }}>
        How many rows of Fibonacci would you like to see?{" "}
        <input
          value={rowCountInput}
          onChange={handleRowCountChange}
          name="fib"
          type="number"
          min="1"
        />
      </label>
      <BiggestNacc fib={fib} />
      {fib.map((f) => (
        <FibonacciRow key={JSON.stringify(f)} row={f} />
      ))}
    </div>
  );
};

const Prymid_r = (): JSX.Element => (
  <div>
    <FibonacciVisualizer />
  </div>
);

export default Prymid_r;

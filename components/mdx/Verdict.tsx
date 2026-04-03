interface VerdictProps {
  isWorthIt: boolean;
  cost: string;
}

export function Verdict({ isWorthIt, cost }: VerdictProps) {
  return (
    <div className={`my-6 border-l-4 p-4 ${
      isWorthIt
        ? 'border-black bg-gray-50 dark:border-white dark:bg-gray-950'
        : 'border-gray-400 bg-gray-50 dark:border-gray-600 dark:bg-gray-950'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <span className="font-bold text-lg">
            {isWorthIt ? "✓ Worth It" : "✗ Not Recommended"}
          </span>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{cost}</p>
        </div>
      </div>
    </div>
  );
}

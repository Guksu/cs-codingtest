/**
 * 코딩 테스트 #4: FizzBuzz
 * 난이도: ⭐ (쉬움)
 *
 * 문제:
 * 1부터 n까지의 숫자에 대해 다음 규칙을 적용한 문자열 배열을 반환하세요.
 *
 * 규칙:
 * - 숫자가 3의 배수이면 "Fizz"
 * - 숫자가 5의 배수이면 "Buzz"
 * - 숫자가 3과 5의 배수이면 "FizzBuzz"
 * - 그 외의 경우 숫자를 문자열로 변환
 *
 * 제약 조건:
 * - 1 ≤ n ≤ 10^4
 */

function solution(n: number): string[] {
  // 여기에 코드를 작성하세요
  const answer: string[] = [];
  function checkFizzBuzz(n: number): string {
    if (n % 3 === 0 && n % 5 === 0) {
      return "FizzBuzz";
    }

    if (n % 5 === 0) {
      return "Buzz";
    }

    if (n % 3 === 0) {
      return "Fizz";
    }

    return n.toString();
  }

  for (let i = 1; i <= n; i++) {
    answer.push(checkFizzBuzz(i));
  }

  return answer;
}

// ============================================
// 테스트 코드 (수정하지 마세요)
// ============================================

interface TestCase {
  input: number;
  expected: string[];
  description: string;
}

const testCases: TestCase[] = [
  {
    input: 3,
    expected: ["1", "2", "Fizz"],
    description: "예시 1: n = 3",
  },
  {
    input: 5,
    expected: ["1", "2", "Fizz", "4", "Buzz"],
    description: "예시 2: n = 5",
  },
  {
    input: 15,
    expected: [
      "1",
      "2",
      "Fizz",
      "4",
      "Buzz",
      "Fizz",
      "7",
      "8",
      "Fizz",
      "Buzz",
      "11",
      "Fizz",
      "13",
      "14",
      "FizzBuzz",
    ],
    description: "예시 3: n = 15",
  },
  {
    input: 1,
    expected: ["1"],
    description: "예시 4: n = 1 (최소값)",
  },
];

function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((val, idx) => val === b[idx]);
}

function runTests() {
  console.log("=== 코딩 테스트 #4: FizzBuzz ===\n");

  let passedCount = 0;

  testCases.forEach((testCase, index) => {
    const { input, expected, description } = testCase;
    const result = solution(input);
    const passed = arraysEqual(result, expected);

    console.log(`테스트 ${index + 1}: ${description}`);
    console.log(`  입력: n = ${input}`);
    console.log(
      `  예상 출력: [${expected
        .slice(0, 10)
        .map((x) => `"${x}"`)
        .join(", ")}${expected.length > 10 ? ", ..." : ""}]`
    );
    console.log(
      `  실제 출력: [${result
        .slice(0, 10)
        .map((x) => `"${x}"`)
        .join(", ")}${result.length > 10 ? ", ..." : ""}]`
    );
    console.log(`  결과: ${passed ? "✅ 통과" : "❌ 실패"}\n`);

    if (passed) passedCount++;
  });

  console.log("=".repeat(50));
  console.log(`총 ${testCases.length}개 중 ${passedCount}개 통과`);
  console.log("=".repeat(50));
}

// 테스트 실행
runTests();

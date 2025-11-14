/**
 * 코딩 테스트 #11: 유효한 괄호
 * 난이도: ⭐ (쉬움)
 *
 * 문제:
 * 괄호로 이루어진 문자열 s가 주어집니다.
 * 괄호가 올바르게 열리고 닫혔는지 판별하세요.
 *
 * 올바른 괄호 조건:
 * 1. 여는 괄호는 같은 종류의 닫는 괄호로 닫혀야 합니다
 * 2. 여는 괄호는 올바른 순서로 닫혀야 합니다
 * 3. 모든 닫는 괄호는 같은 종류의 여는 괄호가 있어야 합니다
 *
 * 예시:
 * - "()" → true
 * - "()[]{}" → true
 * - "(]" → false
 * - "([)]" → false (순서가 잘못됨)
 * - "{[]}" → true
 *
 * 제약 조건:
 * - 1 ≤ s.length ≤ 10^4
 * - s는 '(', ')', '{', '}', '[', ']'로만 구성됩니다
 */

function solution(s: string): boolean {
  const key: Record<string, string> = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  const stack: Array<string> = [];

  for (const char of s) {
    if (key[char]) {
      stack.push(char);
      continue;
    }

    const last = stack[stack.length - 1];

    if (key[last] === char) {
      stack.pop();
      continue;
    }

    return false;
  }

  return stack.length === 0;
}

// ============================================
// 테스트 코드 (수정하지 마세요)
// ============================================

interface TestCase {
  input: string;
  expected: boolean;
  description: string;
}

const testCases: TestCase[] = [
  {
    input: "()",
    expected: true,
    description: '예시 1: "()" → true',
  },
  {
    input: "()[]{}",
    expected: true,
    description: '예시 2: "()[]{}" → true',
  },
  {
    input: "(]",
    expected: false,
    description: '예시 3: "(]" → false (종류 불일치)',
  },
  {
    input: "([)]",
    expected: false,
    description: '예시 4: "([)]" → false (순서 잘못됨)',
  },
  {
    input: "{[]}",
    expected: true,
    description: '예시 5: "{[]}" → true',
  },
  {
    input: "((()))",
    expected: true,
    description: '예시 6: "((()))" → true',
  },
  {
    input: "(((",
    expected: false,
    description: '예시 7: "(((" → false (닫히지 않음)',
  },
  {
    input: ")))",
    expected: false,
    description: '예시 8: ")))" → false (여는 괄호 없음)',
  },
];

function runTests() {
  console.log("=== 코딩 테스트 #11: 유효한 괄호 ===\n");

  let passedCount = 0;
  const executionTimes: number[] = [];

  testCases.forEach((testCase, index) => {
    const { input, expected, description } = testCase;

    // 실행 시간 측정
    const startTime = performance.now();
    const result = solution(input);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    executionTimes.push(executionTime);

    const passed = result === expected;

    console.log(`테스트 ${index + 1}: ${description}`);
    console.log(`  입력: "${input}"`);
    console.log(`  예상 출력: ${expected}`);
    console.log(`  실제 출력: ${result}`);
    console.log(`  실행 시간: ${executionTime.toFixed(4)}ms`);
    console.log(`  결과: ${passed ? "✅ 통과" : "❌ 실패"}\n`);

    if (passed) passedCount++;
  });

  const avgExecutionTime =
    executionTimes.reduce((sum, time) => sum + time, 0) / executionTimes.length;
  const totalExecutionTime = executionTimes.reduce(
    (sum, time) => sum + time,
    0
  );

  console.log("=".repeat(50));
  console.log(`총 ${testCases.length}개 중 ${passedCount}개 통과`);
  console.log(`평균 실행 시간: ${avgExecutionTime.toFixed(4)}ms`);
  console.log(`총 실행 시간: ${totalExecutionTime.toFixed(4)}ms`);
  console.log("=".repeat(50));
}

// 테스트 실행
runTests();

/**
 * 코딩 테스트 #10: 문자열에서 첫 번째 고유 문자
 * 난이도: ⭐ (쉬움)
 *
 * 문제:
 * 문자열 s가 주어집니다.
 * 문자열에서 반복되지 않는 첫 번째 문자를 찾아 그 인덱스를 반환하세요.
 * 만약 존재하지 않으면 -1을 반환하세요.
 *
 * 예시:
 * - "leetcode" → 0 (첫 번째 'l'은 한 번만 등장)
 * - "loveleetcode" → 2 (첫 번째 고유 문자는 'v')
 * - "aabb" → -1 (모든 문자가 반복됨)
 *
 * 제약 조건:
 * - 1 ≤ s.length ≤ 10^5
 * - s는 영어 소문자로만 구성됩니다
 */

function solution(s: string): number {
  // 여기에 코드를 작성하세요
  const map = new Map();

  for (const word of s) {
    map.set(word, map.has(word) ? map.get(word) + 1 : 1);
  }

  for (let i = 0; i < s.length; i++) {
    if (map.get(s[i]) === 1) {
      return i;
    }
  }

  return -1;
}

// ============================================
// 테스트 코드 (수정하지 마세요)
// ============================================

interface TestCase {
  input: string;
  expected: number;
  description: string;
}

const testCases: TestCase[] = [
  {
    input: "leetcode",
    expected: 0,
    description: "예시 1: \"leetcode\" → 0 (첫 번째 'l')",
  },
  {
    input: "loveleetcode",
    expected: 2,
    description: "예시 2: \"loveleetcode\" → 2 ('v')",
  },
  {
    input: "aabb",
    expected: -1,
    description: '예시 3: "aabb" → -1 (모두 반복)',
  },
  {
    input: "z",
    expected: 0,
    description: '예시 4: "z" → 0 (단일 문자)',
  },
  {
    input: "aabbccddeff",
    expected: 8,
    description: "예시 5: \"aabbccddeff\" → 8 (첫 번째 'e')",
  },
  {
    input: "dddccdbba",
    expected: 8,
    description: "예시 6: \"dddccdbba\" → 8 (마지막 'a')",
  },
];

function runTests() {
  console.log("=== 코딩 테스트 #10: 문자열에서 첫 번째 고유 문자 ===\n");

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

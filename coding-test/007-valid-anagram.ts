/**
 * 코딩 테스트 #7: 애너그램 판별
 * 난이도: ⭐ (쉬움)
 *
 * 문제:
 * 두 문자열 s와 t가 주어집니다.
 * t가 s의 애너그램(anagram)인지 판별하세요.
 *
 * 애너그램이란?
 * - 한 문자열의 문자들을 재배열하여 다른 문자열을 만들 수 있는 경우
 * - 예: "listen"과 "silent"는 애너그램입니다
 *
 * 제약 조건:
 * - 1 ≤ s.length, t.length ≤ 5 * 10^4
 * - s와 t는 영어 소문자로만 구성됩니다
 */

function solution(s: string, t: string): boolean {
  const map = new Map();
  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      map.set(s[i], map.get(s[i]) + 1);
      continue;
    }

    map.set(s[i], 1);
  }

  for (let i = 0; i < t.length; i++) {
    if (!map.has(t[i])) {
      return false;
    }

    if (map.get(t[i]) === 1) {
      map.delete(t[i]);
      continue;
    }

    map.set(t[i], map.get(t[i]) - 1);
  }

  return map.size === 0;
}

// ============================================
// 테스트 코드 (수정하지 마세요)
// ============================================

interface TestCase {
  s: string;
  t: string;
  expected: boolean;
  description: string;
}

const testCases: TestCase[] = [
  {
    s: "anagram",
    t: "nagaram",
    expected: true,
    description: '예시 1: "anagram"과 "nagaram"은 애너그램',
  },
  {
    s: "rat",
    t: "car",
    expected: false,
    description: '예시 2: "rat"과 "car"는 애너그램 아님',
  },
  {
    s: "listen",
    t: "silent",
    expected: true,
    description: '예시 3: "listen"과 "silent"는 애너그램',
  },
  {
    s: "hello",
    t: "world",
    expected: false,
    description: '예시 4: "hello"와 "world"는 애너그램 아님',
  },
  {
    s: "a",
    t: "a",
    expected: true,
    description: '예시 5: "a"와 "a"는 애너그램 (같은 문자)',
  },
  {
    s: "ab",
    t: "a",
    expected: false,
    description: '예시 6: "ab"와 "a"는 길이가 다름',
  },
];

function runTests() {
  console.log("=== 코딩 테스트 #7: 애너그램 판별 ===\n");

  let passedCount = 0;
  const executionTimes: number[] = [];

  testCases.forEach((testCase, index) => {
    const { s, t, expected, description } = testCase;

    // 실행 시간 측정
    const startTime = performance.now();
    const result = solution(s, t);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    executionTimes.push(executionTime);

    const passed = result === expected;

    console.log(`테스트 ${index + 1}: ${description}`);
    console.log(`  입력: s = "${s}", t = "${t}"`);
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

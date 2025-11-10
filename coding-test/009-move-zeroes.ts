/**
 * 코딩 테스트 #9: 0을 배열의 끝으로 이동
 * 난이도: ⭐ (쉬움)
 *
 * 문제:
 * 정수 배열 nums가 주어집니다.
 * 모든 0을 배열의 끝으로 이동시키되, 0이 아닌 요소들의 상대적 순서는 유지해야 합니다.
 *
 * 중요: 배열을 복사하지 않고 in-place로 수정해야 합니다.
 *
 * 예시:
 * - [0,1,0,3,12] → [1,3,12,0,0]
 * - [0] → [0]
 * - [1,2,3] → [1,2,3]
 *
 * 제약 조건:
 * - 1 ≤ nums.length ≤ 10^4
 * - -2^31 ≤ nums[i] ≤ 2^31 - 1
 *
 * Follow-up: 최소한의 연산으로 해결할 수 있나요?
 */

function solution(nums: number[]): void {
  // 여기에 코드를 작성하세요
  // 반환값 없음 (in-place 수정)
  let zero = 0;
  let notZero = 0;

  while (zero !== nums.length && notZero !== nums.length) {
    if (nums[zero] === 0 && nums[notZero] !== 0) {
      [nums[zero], nums[notZero]] = [nums[notZero], nums[zero]];
      continue;
    }

    if (nums[zero] === 0 && nums[notZero] === 0) {
      notZero++;
      continue;
    }

    if (nums[zero] !== 0) {
      zero++;
      continue;
    }

    break;
  }
}

// ============================================
// 테스트 코드 (수정하지 마세요)
// ============================================

interface TestCase {
  input: number[];
  expected: number[];
  description: string;
}

const testCases: TestCase[] = [
  {
    input: [0, 1, 0, 3, 12],
    expected: [1, 3, 12, 0, 0],
    description: "예시 1: [0,1,0,3,12] → [1,3,12,0,0]",
  },
  {
    input: [0],
    expected: [0],
    description: "예시 2: [0] → [0] (단일 요소)",
  },
  {
    input: [1, 2, 3],
    expected: [1, 2, 3],
    description: "예시 3: [1,2,3] → [1,2,3] (0이 없음)",
  },
  {
    input: [0, 0, 1],
    expected: [1, 0, 0],
    description: "예시 4: [0,0,1] → [1,0,0] (연속된 0)",
  },
  {
    input: [2, 1],
    expected: [2, 1],
    description: "예시 5: [2,1] → [2,1] (0이 없음)",
  },
  {
    input: [0, 0, 0, 1, 2, 3],
    expected: [1, 2, 3, 0, 0, 0],
    description: "예시 6: [0,0,0,1,2,3] → [1,2,3,0,0,0]",
  },
];

function arraysEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((val, idx) => val === b[idx]);
}

function runTests() {
  console.log("=== 코딩 테스트 #9: 0을 배열의 끝으로 이동 ===\n");

  let passedCount = 0;
  const executionTimes: number[] = [];

  testCases.forEach((testCase, index) => {
    const { input, expected, description } = testCase;
    const inputCopy = [...input]; // 원본 보존용

    // 실행 시간 측정
    const startTime = performance.now();
    solution(input); // in-place 수정
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    executionTimes.push(executionTime);

    const passed = arraysEqual(input, expected);

    console.log(`테스트 ${index + 1}: ${description}`);
    console.log(`  입력: [${inputCopy.join(", ")}]`);
    console.log(`  예상 출력: [${expected.join(", ")}]`);
    console.log(`  실제 출력: [${input.join(", ")}]`);
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

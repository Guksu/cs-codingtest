/**
 * 코딩 테스트 #12: 연결 리스트 뒤집기
 * 난이도: ⭐⭐ (중간)
 *
 * 문제:
 * 단일 연결 리스트(Singly Linked List)의 head가 주어집니다.
 * 리스트를 뒤집어서 반환하세요.
 *
 * 예시:
 * - [1,2,3,4,5] → [5,4,3,2,1]
 * - [1,2] → [2,1]
 * - [] → []
 *
 * 제약 조건:
 * - 리스트의 노드 개수: 0 ≤ n ≤ 5000
 * - -5000 ≤ Node.val ≤ 5000
 *
 * Follow-up: 반복문과 재귀 두 가지 방법으로 해결할 수 있나요?
 */

// 연결 리스트 노드 정의
class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function solution(head: ListNode | null): ListNode | null {
  let prev = null;
  let current = head;

  while (current) {
    let next = current.next;
    current.next = prev;

    prev = current;

    current = next;
  }

  return prev;
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
    input: [1, 2, 3, 4, 5],
    expected: [5, 4, 3, 2, 1],
    description: "예시 1: [1,2,3,4,5] → [5,4,3,2,1]",
  },
  {
    input: [1, 2],
    expected: [2, 1],
    description: "예시 2: [1,2] → [2,1]",
  },
  {
    input: [],
    expected: [],
    description: "예시 3: [] → [] (빈 리스트)",
  },
  {
    input: [1],
    expected: [1],
    description: "예시 4: [1] → [1] (단일 노드)",
  },
  {
    input: [1, 2, 3],
    expected: [3, 2, 1],
    description: "예시 5: [1,2,3] → [3,2,1]",
  },
];

// 헬퍼 함수: 배열 → 연결 리스트
function arrayToList(arr: number[]): ListNode | null {
  if (arr.length === 0) return null;

  const head = new ListNode(arr[0]);
  let current = head;

  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }

  return head;
}

// 헬퍼 함수: 연결 리스트 → 배열
function listToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;

  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }

  return result;
}

// 헬퍼 함수: 배열 비교
function arraysEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((val, idx) => val === b[idx]);
}

function runTests() {
  console.log("=== 코딩 테스트 #12: 연결 리스트 뒤집기 ===\n");

  let passedCount = 0;
  const executionTimes: number[] = [];

  testCases.forEach((testCase, index) => {
    const { input, expected, description } = testCase;

    const head = arrayToList(input);

    // 실행 시간 측정
    const startTime = performance.now();
    const resultHead = solution(head);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    executionTimes.push(executionTime);

    const result = listToArray(resultHead);
    const passed = arraysEqual(result, expected);

    console.log(`테스트 ${index + 1}: ${description}`);
    console.log(`  입력: [${input.join(", ")}]`);
    console.log(`  예상 출력: [${expected.join(", ")}]`);
    console.log(`  실제 출력: [${result.join(", ")}]`);
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

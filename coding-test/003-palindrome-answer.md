# 코딩 테스트 #3: 유효한 팰린드롬 - 정답 및 해설

**날짜**: 2025-11-03

## 당신의 풀이

```typescript
function solution(s: string): boolean {
  let left: number = 0;
  let right: number = s.length - 1;

  function isAlphanumeric(char: string): boolean {
    return /[a-zA-Z0-9]/.test(char);
  }

  while (left < right) {
    const leftStr: string | number = s[left].toLowerCase();
    const rightStr: string | number = s[right].toLowerCase();

    if (!isAlphanumeric(leftStr)) {
      left++;
      continue;
    }

    if (!isAlphanumeric(rightStr)) {
      right--;
      continue;
    }

    if (leftStr !== rightStr) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}
```

**결과**: ✅ 모든 테스트 통과!

## 코드 분석

### 접근 방법: Two Pointers + 문자 필터링

당신의 풀이는 **투 포인터 기법**과 **정규식 필터링**을 조합한 효율적인 솔루션입니다! 👍

**핵심 아이디어:**
1. 양 끝에서 시작하는 두 포인터 사용
2. 알파벳/숫자가 아닌 문자는 스킵
3. 유효한 문자끼리 비교
4. 대소문자 무시 (toLowerCase)

**시간 복잡도:** O(n)
- 문자열을 한 번만 순회
- 각 문자는 최대 한 번만 검사

**공간 복잡도:** O(1)
- 추가 배열이나 문자열 생성 없음
- 포인터 변수만 사용

### 동작 원리

```
입력: "A man, a plan, a canal: Panama"

1. 문자열 정리 (개념적으로):
   "amanaplanacanalpanama"

2. Two Pointers로 비교:
   a m a n a p l a n a c a n a l p a n a m a
   ↑                                       ↑
   left                                  right
   a == a ✓

   a m a n a p l a n a c a n a l p a n a m a
     ↑                                   ↑
     left                              right
   m == m ✓

   ... 계속 비교 ...

   모두 일치! → true 반환
```

**특수문자/공백 처리:**
```
입력: "A man, a plan"
      ↑
      left

1. 'A'는 알파벳 → 'a'로 변환
2. ' '는 알파벳 아님 → left++ (스킵)
3. 'm'은 알파벳 → 'm'
4. 'a'는 알파벳 → 'a'
5. 'n'은 알파벳 → 'n'
6. ','는 알파벳 아님 → left++ (스킵)
7. ' '는 알파벳 아님 → left++ (스킵)
...
```

## 다른 풀이 방법들

### 방법 1: 문자열 전처리 후 비교

```typescript
function solutionPreprocess(s: string): boolean {
  // 1. 알파벳/숫자만 추출하고 소문자로 변환
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 2. 문자열 뒤집기
  const reversed = cleaned.split('').reverse().join('');

  // 3. 비교
  return cleaned === reversed;
}
```

**장점:**
- 코드가 매우 간결
- 이해하기 쉬움

**단점:**
- 추가 메모리 사용 O(n)
- 문자열을 2번 생성 (cleaned, reversed)

**시간/공간 복잡도:** O(n) / O(n)

### 방법 2: 정규식으로 한 줄에 (극단적 간결화)

```typescript
function solutionOneLiner(s: string): boolean {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}
```

**특징:**
- 가장 짧은 코드
- 실무에서는 좋지만 면접에서는 Two Pointers를 선호

### 방법 3: 재귀 (Recursion)

```typescript
function solutionRecursive(s: string): boolean {
  function isAlphanumeric(char: string): boolean {
    return /[a-z0-9]/.test(char);
  }

  function check(left: number, right: number): boolean {
    // 기저 조건: 포인터가 만나거나 교차
    if (left >= right) return true;

    const leftChar = s[left].toLowerCase();
    const rightChar = s[right].toLowerCase();

    // 왼쪽이 유효하지 않으면 오른쪽으로 이동
    if (!isAlphanumeric(leftChar)) {
      return check(left + 1, right);
    }

    // 오른쪽이 유효하지 않으면 왼쪽으로 이동
    if (!isAlphanumeric(rightChar)) {
      return check(left, right - 1);
    }

    // 둘 다 유효하면 비교
    if (leftChar !== rightChar) return false;

    // 다음 문자로 이동
    return check(left + 1, right - 1);
  }

  return check(0, s.length - 1);
}
```

**장점:**
- 우아한 코드
- 함수형 프로그래밍 스타일

**단점:**
- 스택 공간 O(n) 사용
- 큰 문자열에서 스택 오버플로우 위험

## 풀이 비교

| 방법 | 시간 | 공간 | 가독성 | 면접 적합도 |
|------|------|------|--------|------------|
| Two Pointers (당신의 풀이) | O(n) | O(1) | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 전처리 후 비교 | O(n) | O(n) | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 재귀 | O(n) | O(n) | ⭐⭐⭐⭐ | ⭐⭐⭐ |

## 학습 포인트

### 1. 정규식 (Regular Expression)

**기본 패턴:**
```typescript
/[a-z]/      // 소문자 a-z
/[A-Z]/      // 대문자 A-Z
/[0-9]/      // 숫자 0-9
/[a-zA-Z]/   // 모든 알파벳
/[a-zA-Z0-9]/ // 알파벳 + 숫자

// 부정 (NOT)
/[^a-z]/     // 소문자가 아닌 것
/[^a-zA-Z0-9]/ // 알파벳과 숫자가 아닌 것
```

**메서드:**
```typescript
// test(): boolean 반환
/[a-z]/.test('a')  // true
/[a-z]/.test('A')  // false

// match(): 배열 또는 null 반환
'a'.match(/[a-z]/) // ['a']
'A'.match(/[a-z]/) // null

// replace(): 문자열 반환
'a1b2c3'.replace(/[0-9]/g, '') // 'abc'
'a1b2c3'.replace(/[^0-9]/g, '') // '123'
```

### 2. String 메서드

```typescript
// toLowerCase / toUpperCase
'Hello'.toLowerCase()  // 'hello'
'Hello'.toUpperCase()  // 'HELLO'

// split / join
'abc'.split('')       // ['a', 'b', 'c']
['a', 'b', 'c'].join('') // 'abc'

// reverse (배열 메서드)
'abc'.split('').reverse().join('') // 'cba'

// charAt vs []
'abc'.charAt(0)  // 'a'
'abc'[0]         // 'a' (더 간결, 권장)
```

### 3. Two Pointers 패턴 활용

**팰린드롬은 Two Pointers의 대표 예제:**

```typescript
// 패턴 1: 양 끝에서 중앙으로
let left = 0;
let right = arr.length - 1;
while (left < right) {
  // 비교/처리
  left++;
  right--;
}

// 패턴 2: 조건에 따라 이동
while (left < right) {
  if (조건1) {
    left++;  // 왼쪽만 이동
  } else if (조건2) {
    right--; // 오른쪽만 이동
  } else {
    // 둘 다 이동
    left++;
    right--;
  }
}
```

## 코드 개선 제안

당신의 코드는 이미 훌륭하지만, 타입 관련 작은 개선:

```typescript
function solution(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  function isAlphanumeric(char: string): boolean {
    return /[a-zA-Z0-9]/.test(char);
  }

  while (left < right) {
    // string | number가 아니라 string으로 통일
    const leftChar = s[left].toLowerCase();
    const rightChar = s[right].toLowerCase();

    if (!isAlphanumeric(leftChar)) {
      left++;
      continue;
    }

    if (!isAlphanumeric(rightChar)) {
      right--;
      continue;
    }

    if (leftChar !== rightChar) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}
```

변경 사항:
- `leftStr`, `rightStr` → `leftChar`, `rightChar` (더 명확한 네이밍)
- 타입 어노테이션 제거 (TypeScript가 자동 추론)

## 엣지 케이스 처리

당신의 코드가 잘 처리하는 경우들:

```typescript
// 1. 빈 문자열
solution("")  // true (빈 문자열은 팰린드롬)

// 2. 공백만
solution("   ")  // true

// 3. 특수문자만
solution("!!!")  // true

// 4. 단일 문자
solution("a")  // true

// 5. 알파벳 없음
solution("123321")  // true

// 6. 대소문자 혼합
solution("Aa")  // true
```

## 실전 팁

### 1. 팰린드롬 관련 변형 문제들

**변형 1: 최대 k개 문자 제거 가능**
```typescript
// k개까지 문자를 제거해서 팰린드롬 만들 수 있나?
function canBePalindrome(s: string, k: number): boolean {
  // Two Pointers + 카운터
}
```

**변형 2: 가장 긴 팰린드롬 부분 문자열**
```typescript
// 문자열 내에서 가장 긴 팰린드롬 찾기
function longestPalindrome(s: string): string {
  // 중심 확장 알고리즘
}
```

**변형 3: 팰린드롬 개수 세기**
```typescript
// 문자열 내 모든 팰린드롬 부분 문자열 개수
function countPalindromes(s: string): number {
  // 동적 프로그래밍 또는 중심 확장
}
```

### 2. 면접 시 말하면 좋은 것들

1. **문제 이해 확인**
   - "알파벳과 숫자만 고려하고, 대소문자는 구분하지 않는다는 게 맞나요?"

2. **접근 방법 설명**
   - "Two Pointers를 사용하면 O(1) 공간으로 해결할 수 있습니다"
   - "정규식으로 전처리하면 코드가 더 간결하지만 메모리를 더 사용합니다"

3. **트레이드오프 언급**
   - "공간 복잡도를 O(1)로 유지하려면 Two Pointers가 좋고"
   - "가독성을 우선한다면 전처리 방식도 괜찮습니다"

4. **엣지 케이스 확인**
   - "빈 문자열은 팰린드롬으로 처리할까요?"
   - "숫자도 포함해야 하나요?"

## 비슷한 문제들

### LeetCode 스타일 문제들

1. **Valid Palindrome II**
   - 최대 1개 문자 제거 가능
   - 난이도: ⭐⭐

2. **Longest Palindromic Substring**
   - 가장 긴 팰린드롬 부분 문자열
   - 난이도: ⭐⭐

3. **Palindrome Linked List**
   - 연결 리스트로 팰린드롬 확인
   - 난이도: ⭐⭐

4. **Palindrome Number**
   - 정수가 팰린드롬인지 확인
   - 난이도: ⭐

## 실무 활용

### 1. 유효성 검사

```typescript
// 사용자 입력이 회문인지 확인
function validatePalindromeInput(input: string): boolean {
  const cleaned = input.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}
```

### 2. 문자열 처리

```typescript
// 댓글에서 욕설 필터링 (회문 형태)
function filterBadWords(comment: string): string {
  const badWords = ['aba', 'cdc', ...];
  // ...
}
```

### 3. 알고리즘 최적화

```typescript
// DNA 서열 분석 (회문 서열 찾기)
function findPalindromicSequences(dna: string): string[] {
  // ...
}
```

## 정리

**팰린드롬 확인 핵심:**
```
1. Two Pointers (양 끝에서 중앙으로)
2. 유효한 문자만 비교
3. 대소문자 무시
4. O(n) 시간, O(1) 공간
```

**당신의 풀이 장점:**
- ✅ 효율적인 Two Pointers 사용
- ✅ 정규식으로 깔끔한 검증
- ✅ 최소 메모리 사용 (O(1))
- ✅ 모든 엣지 케이스 처리

---

**총평**: 완벽한 Two Pointers 구현입니다! 🎉

특히 정규식 헬퍼 함수를 분리한 점이 훌륭합니다.
코드가 읽기 쉽고, 효율적이며, 유지보수하기 좋습니다.
실제 코딩 테스트에서 이 정도면 만점입니다!

# CS 지식 #8: HTTP 상태 코드

## 개념
서버가 클라이언트의 요청에 대해 **응답 상태를 알려주는 3자리 숫자**

---

## 상태 코드 분류

| 범위 | 분류 | 의미 |
|------|------|------|
| **1xx** | Informational | 요청 처리 중 |
| **2xx** | Success | 요청 성공 |
| **3xx** | Redirection | 리다이렉션 필요 |
| **4xx** | Client Error | 클라이언트 오류 |
| **5xx** | Server Error | 서버 오류 |

---

## 주요 상태 코드

### 2xx 성공

| 코드 | 이름 | 의미 |
|------|------|------|
| **200** | OK | 요청 성공. 가장 일반적인 성공 응답 |
| **201** | Created | 리소스 생성 성공. POST로 새 데이터 생성 시 |
| **204** | No Content | 성공했지만 응답 본문 없음. DELETE 후 자주 사용 |

### 4xx 클라이언트 오류

| 코드 | 이름 | 의미 |
|------|------|------|
| **400** | Bad Request | 잘못된 요청. 문법 오류, 잘못된 파라미터 |
| **401** | Unauthorized | **인증 필요**. 로그인 안 됨, 토큰 만료 |
| **403** | Forbidden | **권한 없음**. 인증은 됐지만 접근 권한 없음 |
| **404** | Not Found | 리소스를 찾을 수 없음. 잘못된 URL |

### 5xx 서버 오류

| 코드 | 이름 | 의미 |
|------|------|------|
| **500** | Internal Server Error | 서버 내부 오류. 백엔드 버그 |
| **502** | Bad Gateway | 게이트웨이/프록시가 잘못된 응답 받음 |
| **503** | Service Unavailable | 서버 과부하 또는 점검 중 |

---

## 실무에서 401 vs 403 처리

```typescript
async function fetchData() {
  try {
    const response = await fetch('/api/data');

    if (response.status === 401) {
      // 인증 필요 → 로그인 페이지로 이동
      // 토큰 갱신 시도 후 재요청
      await refreshToken();
      return fetchData();
    }

    if (response.status === 403) {
      // 권한 없음 → 에러 메시지 표시
      showError("이 페이지에 접근할 권한이 없습니다.");
      router.push('/unauthorized');
    }

  } catch (error) {
    // 네트워크 에러 처리
  }
}
```

**핵심 차이:**
- **401**: "누구세요?" → 로그인 페이지로 리다이렉트
- **403**: "당신은 들어올 수 없어요" → 권한 부족 안내

---

## 추가로 알아두면 좋은 코드

| 코드 | 의미 | 상황 |
|------|------|------|
| **301** | Moved Permanently | URL이 영구적으로 변경됨 |
| **302** | Found (Redirect) | 임시 리다이렉트 |
| **304** | Not Modified | 캐시 사용 (변경 없음) |
| **409** | Conflict | 리소스 충돌 (중복 데이터) |
| **422** | Unprocessable Entity | 유효성 검증 실패 |
| **429** | Too Many Requests | 요청 횟수 초과 (Rate Limit) |

---

## 프론트엔드에서 자주 보는 코드

**200, 400, 401, 403, 404, 500**

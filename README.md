# Todo-list 프로젝트

## 목차

1. [프로젝트 개요](#프로젝트-개요)
2. [사용 언어 및 기술 스택](#사용-언어-및-기술-스택)
3. [실행 방법](#실행-방법)
4. [구현 목록](#구현-목록)

---

## 프로젝트 개요

`Next.js 14`를 사용하여 만든 **Todo-list** 프로젝트입니다. 사용자는 할 일을 추가하고, 완료 여부를 관리할 수 있습니다. 또한, 할 일의 **상세 페이지**에서 메모를 추가하고 이미지를 업로드하여 할 일을 더욱 효율적으로 관리할 수 있습니다.

---

## 사용 언어 및 기술 스택

- **Next.js 14**
- **TypeScript**
- **React**
- **Styled-components**
- **Axios**
- **Vercel** (배포)

---

## 실행 방법

### 1. Git 저장소 클론:

```bash
git clone https://github.com/hiheeen/codeit-project.git
```

### 2. 필수 패키지 설치:

```bash
npm install
```

### 3. 개발 서버 실행:

```bash
npm run dev
```

로컬 개발 환경은 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

### 4. 배포 주소:

- [배포된 프로젝트 확인하기](https://codeit-project-886h.vercel.app/)

---

## 구현 목록

1. **할 일 추가 및 관리**:

   - 사용자가 할 일을 추가할 수 있으며, 추가된 할 일의 **완료 여부**를 확인 및 변경할 수 있습니다.

2. **할 일 상세 관리 페이지**:

   - 할 일의 세부 페이지에서 **메모**를 작성하거나, **이미지**를 업로드하여 할 일에 대한 상세 관리를 할 수 있습니다.

3. **반응형 디자인**:

   - 다양한 디바이스에 맞게 **반응형 레이아웃**을 구현하여 사용자 경험을 최적화하였습니다.

4. **이미지 업로드 및 메모 추가**:

   - 할 일의 상세 페이지에서 **이미지 파일 업로드** 및 **메모 추가** 기능을 제공합니다.

5. **상태 관리 및 데이터 처리**:
   - **Axios**를 사용하여 데이터 상태를 관리하고 서버와 통신합니다.
   - 할 일 추가, 삭제, 상태 변경 시 **서버와의 실시간 통신**을 통해 UI 업데이트를 빠르게 반영합니다.

---

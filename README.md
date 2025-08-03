# 🧠 Smart Note-taking Web App

A smart, AI-powered note-taking application that enables users to write, refine, and organize long-form notes using Gemini via LangChain. Built with Next.js, Firebase, and Tailwind CSS.

---

## ✨ Features

* ✍️ Write and save long-form notes
* 🔒 User login with Firebase (email/password)
* 📂 Save raw notes to Firestore (per user)
* 🧠 AI-powered refinement of notes using Gemini via LangChain
* 🏷️ AI-generated title suggestions for your notes
* ✅ Accept or ❌ Decline refined suggestions (editable afterward)
* 🗕️ Timestamp added when saving notes
* ⚡ Optimistic UI and loading indicators
* 🔐 All note actions protected behind auth

---

## 🔪 Tech Stack

* **Framework**: Next.js 15+ (App Router + TypeScript)
* **Styling**: Tailwind CSS
* **Auth**: Firebase Authentication
* **Database**: Firestore
* **AI Integration**: LangChain + Google Gemini (Generative Language API)
* **State**: React local state
* **Env Config**: `.env` based

---

## ⚙️ Setup Instructions

### 1. 🔑 Clone the Repo

```bash
git clone https://github.com/divyanshu-dj/smart-note.git
cd smart-note
```

### 2. 📆 Install Dependencies

```bash
npm install
```

### 3. ⚙️ Configure Environment Variables

Create a `.env` file at the root and add:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
GOOGLE_API_KEY=your_gemini_api_key
```

> ✅ Use `.env.example` as a reference.

### 4. 🧠 Firebase Setup

* Enable **Email/Password Authentication** in Firebase console
* Create a **Firestore** database in **test mode**
* Copy your config values into `.env.local`

### 5. 🧠 Gemini + LangChain

* Get an API key from: [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
* Add it to `.env.local` under `GOOGLE_API_KEY`
* Already integrated via `lib/langchain.ts` using LangChain’s Gemini wrapper

---

## 🚀 Running Locally

```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## 📤 Deployment

To deploy on Vercel:

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com/)
3. Add all `.env.local` variables in **Vercel Project Settings → Environment Variables**
4. Deploy!

---

## 🔐 Auth Protection

* Only authenticated users can:

  * Save notes
  * Refine notes
  * Generate titles
* If unauthenticated, buttons are disabled and login prompt is shown

---

## 🧠 API Routes

| Route         | Method | Body               | Description                  |
| ------------- | ------ | ------------------ | ---------------------------- |
| `/api/refine` | POST   | `{ note: string }` | Returns `{ refinedNote }`    |
| `/api/title`  | POST   | `{ note: string }` | Returns `{ suggestedTitle }` |

---

## 📌 Edge Case Handling

* 🔒 User not logged in → buttons disabled with login prompt
* ✍️ Empty note → refine/title buttons disabled
* 🔀 Loading indicators for API operations
* ❌ Graceful error handling for Firebase + LangChain failures
* ⏱️ Notes saved with `createdAt` timestamps
* 🧑‍💻 Editable notes & titles after declining AI output

---

## 🧺 Linting & Formatting

```bash
npm run lint    # Lint with ESLint
```

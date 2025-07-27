# ChatAI

A production-grade AI-powered chatbot web application built with Next.js 14, featuring real-time streaming responses, customizable personalities, and session management.

## Features

- Real-time streaming AI responses
- Customizable AI personalities
- Session management with local storage
- Dark/light theme support
- Multi-line chat input with Shift+Enter
- OpenAI API integration (GPT-3.5, GPT-4, GPT-4 Turbo)
- Responsive design

## Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd oliviavibecodechallenge
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Setup

1. Navigate to the Settings page
2. Enter your OpenAI API key
3. Configure your preferred model and settings
4. Start chatting!

## Usage

- **Chat Interface**: Send messages and receive real-time AI responses
- **Session Management**: Create, rename, and delete chat sessions
- **Personality Customization**: Edit AI behavior in Settings
- **Multi-line Input**: Use Shift+Enter for new lines
- **Theme Toggle**: Switch between light and dark modes

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Framer Motion (Animations)
- OpenAI API
- shadcn/ui Components

## Project Structure

```
/app
  /chat
    page.tsx
    components/
      ChatWindow.tsx
      MessageBubble.tsx
      InputBar.tsx
      SessionManager.tsx
  /settings
    page.tsx
    components/
      PromptEditor.tsx
/components
  ThemeSwitcher.tsx
  AvatarSelector.tsx
/hooks
  useChat.ts
  useApiKey.ts
  useLocalStorage.ts
/store
  chatStore.ts
  settingsStore.ts
/lib
  openai.ts
  streaming.ts
```

## API Key Security

Your OpenAI API key is stored securely in your browser's localStorage and is never transmitted to any server except OpenAI's API directly from your browser.

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## License

MIT

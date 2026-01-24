{
  "testEnvironment": "jsdom",
  "preset": "ts-jest",
  "roots": ["<rootDir>/src"],
  "testMatch": ["**/__tests__/**/*.test.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  "moduleFileExtensions": ["ts", "tsx", "js", "jsx"],
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  "collectCoverageFrom": [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/pages/**",
    "!src/main.tsx"
  ],
  "setupFilesAfterEnv": ["<rootDir>/src/setupTests.ts"],
  "coverageThreshold": {
    "global": {
      "branches": 50,
      "functions": 50,
      "lines": 50,
      "statements": 50
    }
  }
}

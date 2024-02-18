# This is automation solution of Redvike Recruitement task.
## https://docs.google.com/document/d/1kBqGaYmoDNF20QXni7PdYn-xl-3ccd7BAkycsESmVO0/edit

## Technologies used:
- Typescript/Javascript
- Playwright

## Prerequisites(for windows):
- VS code as a code editor https://code.visualstudio.com/
- Node js as JS runtime environment, version - v21.6.2, run **`node -v`** in console to make sure it's installed
- After cloning the repo, open project folder with VS code editor
- Open new terminal using code editor UI or keyboard shortcut " Ctrl + Shift + ` "

## Installation:
```bash
npm install
```
```bash
npx playwright install
```
## Run tests in UI mode and in sequential order
```bash
npm run test-headed
```
## In parallel:
```bash
npm run test-parallel
```

## Show execution results
 - On fail report opens automatically
 - on demand:
   ```bash
   npm run report
   ``` 

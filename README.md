# Flask + React CI/CD Demo

A deliberately tiny full-stack app used to teach **Continuous Integration**
and **Continuous Deployment** with GitHub Actions. The app itself (a
greeting endpoint and an adder) is not the point — the pipeline around it is.

```
flask-react-ci-demo/
├── backend/                 Flask API
│   ├── app.py
│   ├── test_app.py          pytest tests (run in CI)
│   └── requirements.txt
├── frontend/                React app (Vite)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── utils.js
│   │   └── App.test.jsx     vitest tests (run in CI)
│   └── package.json
└── .github/workflows/
    ├── ci.yml                Runs on every push & PR: lint + test both sides
    └── cd.yml                Runs after CI passes on main: deploys frontend
```

## Run it locally

**Backend**
```bash
cd backend
pip install -r requirements.txt
python app.py          # http://localhost:5000
```

**Frontend** (in a second terminal)
```bash
cd frontend
npm install
npm run dev             # http://localhost:5173
```

## Getting this onto GitHub

1. Create a new empty repo on GitHub (don't initialize it with a README).
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
3. Push triggers `ci.yml` automatically — check the **Actions** tab.
4. To let `cd.yml` deploy the frontend: repo **Settings → Pages → Build and
   deployment → Source: "GitHub Actions"**. The next successful CI run on
   `main` will publish the site.

## How the pipeline works

**CI (`ci.yml`)** — triggered on every push and pull request:
- **Backend job:** installs Python deps, lints with `flake8`, runs `pytest`.
- **Frontend job:** installs Node deps, lints with `eslint`, runs `vitest`,
  then does a production `vite build` to prove it actually builds.
- Both jobs run in parallel. If either fails, the whole run is marked failed
  and (on a PR) GitHub blocks the merge button.

**CD (`cd.yml`)** — triggered only when CI finishes successfully on `main`:
- Rebuilds the frontend and publishes `frontend/dist` to GitHub Pages.
- It never runs on a PR or on a failed CI run — deployment only happens for
  code that has already been verified.

## Classroom exercises

- **Break it on purpose:** change an assertion in `test_app.py` or
  `App.test.jsx`, push, and watch the CI job fail red in the Actions tab.
- **Fix a lint error:** add an unused import to `app.py` and watch `flake8`
  catch it before tests even run.
- **Open a PR:** push to a branch instead of `main` and open a pull request —
  see CI run on the PR itself, and notice CD does *not* fire.
- **Extend it:** add a new `/api/subtract` route with a test, or add a new
  React component with its own test.
- **Stretch goal:** deploy the Flask backend too (e.g. Render or Railway free
  tier) and point `VITE_API_BASE` at it instead of localhost.

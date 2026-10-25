# Publish on your GitHub account

1. Sign in to GitHub and create a **public** repository named `acquisition-review`. A different name works too.
2. Extract the delivered ZIP. Open the `acquisition-review` folder inside it.
3. On the repository page choose **Add file → Upload files**. Upload the folder's contents so `index.html`, `README.md`, `assets/`, and `model/` are at the repository root. Do not upload only the ZIP or place all files in an extra enclosing folder.
4. Commit the files to `main`.
5. Open **Settings → Pages**. Under build and deployment, choose **Deploy from a branch**, branch **main**, folder **/(root)**, then save.
6. Wait for GitHub's Pages deployment to finish. Open the exact website address shown in Settings → Pages.
7. Test a case, change an adjustment, save JSON, and download the workbook from the live page.
8. Copy that exact public website URL into the repository's **About → Website** field and your resume. The repository URL is the separate link for source and documentation.

GitHub labels may change. This package is a buildless static site and requires no API key, database, environment variables, Node build, or paid hosting. Node is needed only to run the optional automated tests.

The package includes a CI workflow that runs calculation tests on pushes and pull requests. It is separate from Pages publication. No private transaction files belong in this public repository.

## Honest resume wording

**Acquisition Earnings & Cash-Flow Review | Independent Project | Oct. 2026**

- Built an interactive acquisition review tool and formula-driven Excel model to reconcile seller earnings claims, buyer adjustments, replacement costs, and annual cash requirements.
- Developed three synthetic acquisition cases and automated tests covering earnings bridges, purchase multiples, missing-data controls, and contribution-margin downside sensitivities.

Use the project link after publication. Do not claim fund adoption, verified diligence findings, time savings, or acquisition outcomes without evidence. Be ready to explain the owner-replacement adjustment, the difference between EBITDA and cash, and why the sensitivity holds other cash drivers fixed.

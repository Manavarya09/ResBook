# ResBook Issue Ideas

Enable issues in repo settings, then copy these:

---

## Issue 1: Dark Mode Toggle
**Title:** Feature: Add dark mode toggle in navbar

**Body:**
## Description
Currently dark mode is controlled via system preference. Add a toggle button in the navbar to manually switch between light/dark modes.

## Proposed Solution
- Add sun/moon icon button in navbar
- Persist preference in localStorage
- Use next-themes or custom CSS solution

## Acceptance Criteria
- [ ] Toggle button visible in navbar
- [ ] Clicking toggles between light/dark
- [ ] Preference persists across sessions

**Labels:** enhancement, good first issue

---

## Issue 2: GitHub OAuth Login
**Title:** Feature: Add GitHub OAuth authentication

**Body:**
## Description
Currently users are tracked via localStorage. Add proper GitHub OAuth login for real user accounts.

## Proposed Solution
- Use NextAuth.js with GitHub provider
- Create user database table
- Link localStorage data to user accounts

## Requirements
- GitHub OAuth app credentials
- User profile page showing saved items and completed workflows

**Labels:** feature, backend

---

## Issue 3: Workflow Bookmark/Star System
**Title:** Feature: Add bookmark/star system for workflows

**Body:**
## Description
Users should be able to bookmark workflows for quick access without creating collections.

## Acceptance Criteria
- [ ] Star/bookmark icon on each workflow
- [ ] Bookmarked workflows page at /bookmarks
- [ ] Persist in user profile

**Labels:** enhancement

---

## Issue 4: Tool Categories Page
**Title:** Feature: Create dedicated categories page

**Body:**
## Description
Create a visual categories page showing all tool categories (LLM, Agent, IDE, CLI) with icons and descriptions.

## Proposed Design
- Grid layout with category cards
- Each card shows: icon, name, tool count, description
- Click to filter tools by category

**Labels:** enhancement

---

## Issue 5: Workflow Difficulty Rating
**Title:** Feature: Add user difficulty ratings for workflows

**Body:**
## Description
Allow users to rate workflow difficulty (Easy/Medium/Hard) based on their experience.

## Acceptance Criteria
- [ ] Rating component on workflow pages
- [ ] Average rating displayed
- [ ] Persist in database

**Labels:** community, enhancement

---

## Issue 6: Related Workflows Suggestion
**Title:** Feature: Show related workflows on each page

**Body:**
## Description
Display 3-5 related workflows based on tools used and complexity.

## Proposed Solution
- Match by toolsUsed array overlap
- Also show workflows by same author
- Link to /workflows?related=current-slug

**Labels:** enhancement

---

## Issue 7: Newsletter Subscription
**Title:** Feature: Add newsletter subscription

**Body:**
## Description
Allow users to subscribe for weekly new tool/workflow notifications.

## Implementation
- Email input in footer
- Simple localStorage for now (email service later)
- Unsubscribe option

**Labels:** feature

---

## Issue 8: Keyboard Shortcuts
**Title:** Feature: Add keyboard shortcuts for navigation

**Body:**
## Description
Implement keyboard shortcuts for power users.

## Proposed Shortcuts
- `?` - Show shortcuts help
- `s` - Focus search
- `t` - Go to tools
- `w` - Go to workflows
- `d` - Go to dotfiles
- `h` - Go to home
- `j/k` - Navigate lists

**Labels:** enhancement, accessibility

---

## Issue 9: Print Stylesheet
**Title:** Feature: Add print-friendly stylesheet

**Body:**
## Description
Workflows and tools should be printable for offline reference.

## Requirements
- Hide navigation/footer when printing
- Expand all collapsed sections
- Clean black/white styling
- Add URL for reference

**Labels:** enhancement

---

## Issue 10: Tool Comparison Export
**Title:** Feature: Export tool comparison as image

**Body:**
## Description
Allow users to export their tool comparison as a shareable image.

## Implementation
- html2canvas or similar library
- Download button on /compare page
- Include site branding

**Labels:** enhancement

---

## Issue 11: Search Filters Cache
**Title:** Feature: Remember search filters in URL

**Body:**
## Description
Search filter selections should be shareable via URL query params.

## Implementation
- Update URL when filters change
- Read from URL on page load
- Support: category, pricing, search term, sort

**Labels:** enhancement

---

## Issue 12: Content Update Notifications
**Title:** Feature: Notify users of content updates

**Body:**
## Description
When a workflow/tool is updated, notify users who have it in their stack.

## Implementation
- Track which users saved each item
- Add lastUpdated to content frontmatter
- Simple notification badge (localStorage for now)

**Labels:** feature

---

## Issue 13: Workflow Timer
**Title:** Feature: Add timer for workflow steps

**Body:**
## Description
Allow users to time each workflow step for learning/optimization.

## Acceptance Criteria
- [ ] Start/stop timer on each step
- [ ] Show elapsed time
- [ ] Track average time per step

**Labels:** enhancement

---

## Issue 14: Markdown Preview for Submissions
**Title:** Feature: Add live preview for submission form

**Body:**
## Description
When submitting tools/workflows, show live markdown preview.

## Implementation
- Split view: editor | preview
- Use same MDX components as main site
- Help users format their content correctly

**Labels:** enhancement

---

## Issue 15: Social Share Buttons
**Title:** Feature: Add social share functionality

**Body:**
## Description
Add share buttons for Twitter/X, LinkedIn on tool/workflow pages.

## Implementation
- Copy link button (always)
- Twitter share with pre-filled text
- LinkedIn share
- Use Web Share API where available

**Labels:** enhancement

---

## Issue 16: Contributing Guide Update
**Title:** Docs: Update contributing guide for v2.0

**Body:**
## Description
The CONTRIBUTING.md needs updating to reflect new features and submission process.

## Updates Needed
- Add new frontmatter fields (status, changelog, etc.)
- Document workflow runner component
- Update submission flow to use /submit page
- Add testing requirements

**Labels:** documentation

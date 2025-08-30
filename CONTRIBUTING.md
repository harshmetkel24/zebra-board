# Contributing to Zebra Board

Thank you for your interest in contributing to Zebra Board! We welcome contributions from the community.

## Commit Guidelines

We follow a structured commit message format to keep our git history clean and understandable. Please use the following prefixes for your commit messages:

- **[FEAT]**: For new features or enhancements
  - Example: `[FEAT] Add dark mode toggle to navbar`

- **[BUG]**: For bug fixes
  - Example: `[BUG] Fix typing speed calculation error`

- **[HOT-FIX]**: For urgent bug fixes that need immediate deployment
  - Example: `[HOT-FIX] Fix critical rendering issue on mobile`

- **[REFACTOR]**: For code refactoring without changing functionality
  - Example: `[REFACTOR] Simplify state management in typing test component`

- **[STYLE]**: For code style changes (formatting, linting, etc.)
  - Example: `[STYLE] Format code with Prettier`

- **[DOCS]**: For documentation updates
  - Example: `[DOCS] Update README with new features`

- **[TEST]**: For adding or updating tests
  - Example: `[TEST] Add unit tests for typing accuracy calculation`

- **[CHORE]**: For maintenance tasks, dependencies updates, etc.
  - Example: `[CHORE] Update Next.js to latest version`

- **[THEME]**: For theme-related changes and customizations
  - Example: `[THEME] Add new purple dream color scheme`
  - Example: `[THEME] Update theme switcher component`

- **[UI]**: For user interface improvements and component updates
  - Example: `[UI] Improve button hover animations`
  - Example: `[UI] Redesign navbar layout for mobile`

- **[UX]**: For user experience enhancements
  - Example: `[UX] Add keyboard shortcuts for theme switching`
  - Example: `[UX] Improve typing test feedback animations`

- **[PERF]**: For performance optimizations
  - Example: `[PERF] Optimize theme CSS generation script`
  - Example: `[PERF] Lazy load typing test components`

- **[SEC]**: For security-related changes
  - Example: `[SEC] Sanitize user input in typing test`
  - Example: `[SEC] Update dependencies for security patches`

- **[CONFIG]**: For configuration and build setup changes
  - Example: `[CONFIG] Add theme generation to build pipeline`
  - Example: `[CONFIG] Update Tailwind CSS configuration`

- **[BUILD]**: For build system and CI/CD changes
  - Example: `[BUILD] Fix theme generation script for production`
  - Example: `[BUILD] Add automated testing to GitHub Actions`

- **[ASSETS]**: For static assets and media files
  - Example: `[ASSETS] Add new theme preview images`
  - Example: `[ASSETS] Optimize favicon for different sizes`

## Pull Request Process

1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes following the commit guidelines
4. Run `npm run generate-themes` if you've modified theme configurations
5. Ensure all tests pass and run `npm run lint`
6. Submit a pull request with a clear description of your changes

## Theme System Guidelines

When contributing to the theme system:

- **Source of Truth**: Always modify `lib/themes/themes.ts` first
- **Auto-generation**: Run `npm run generate-themes` to update CSS variables
- **Testing**: Test themes in both light and dark modes
- **Accessibility**: Ensure proper contrast ratios for all color combinations

### Adding New Themes

1. Add your theme to `lib/themes/themes.ts`
2. Run `npm run generate-themes` to generate CSS
3. Test the theme in the ThemeSwitcher component
4. Update documentation if needed

Example commit: `[THEME] Add sunset orange color scheme with accessibility improvements`

## Code Style

- Follow the existing code style in the project
- Use TypeScript for type safety
- Run `npm run lint` before submitting your changes

## Reporting Issues

If you find a bug or have a feature request, please open an issue on GitHub with as much detail as possible.
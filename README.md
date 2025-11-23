# Advanced Phone-Style Calculator

A modern, responsive, vanilla HTML/CSS/JavaScript calculator displayed inside a stylized phone mockup. It supports standard arithmetic, advanced operations, keyboard shortcuts, formatted output, and custom toast alerts.

## Features
- Standard operations: addition (+), subtraction (−), multiplication (×), division (÷)
- Advanced operations: exponent (x^y), modulo (mod), square root (√), square (x²), reciprocal (1/x), percentage (%), sign toggle (+/−)
- Number formatting with thousands separators
- Prevents division by zero with a styled toast alert
- Phone model UI: notch, camera, speaker, soft shadow, adaptive sizing
- Keyboard support for fast input
- Accessible live alert region (ARIA attributes)
- Responsive layout for different viewport widths

## File Structure
```
index.html   # Markup: phone wrapper, calculator, toast container
style.css    # Styling: phone model, calculator grid, buttons, display, toast
script.js    # Calculator logic, event listeners, keyboard handling, toast alerts
README.md    # Project documentation
```

## Usage
Just open `index.html` in any modern browser. No build step or dependencies required.

## Keyboard Shortcuts
| Key / Combo | Action |
|-------------|--------|
| 0–9, .      | Enter digits / decimal |
| + - * /     | Choose operation |
| ^           | Power (x^y) |
| %           | Percent (current ÷ 100) |
| Enter or =  | Compute result |
| Backspace   | Delete last digit |
| Escape      | Clear (AC) |
| r / R       | Square root (√) |
| s / S       | Square (x²) |
| i / I       | Reciprocal (1/x) |

## Toast Alerts
Errors (like dividing by zero) trigger a temporary toast in the top-right of the phone screen. Automatically hides after ~2.6s.

## Extending
To add more unary operations (e.g. factorial):
1. Create a new method in `Calculator` (e.g. `calculateFactorial()`).
2. Add a button in the HTML with `data-action="factorial"`.
3. Add a case in the action buttons listener.
4. Optionally assign a keyboard shortcut.

## Accessibility Notes
- Alert container uses `aria-live="assertive"` so screen readers announce error messages.
- Buttons are native `<button>` elements for inherent keyboard focus and semantics.

## Styling Adjustments
- Operators use orange highlight; function buttons use neutral gray.
- Grid gaps and padding tuned for consistent visual spacing inside phone bezel.
- Toast uses a dark gradient for sufficient contrast.

## License
No explicit license provided. Treat as personal / educational sample unless a license is added.

## Credits
Implemented with vanilla web technologies—no external libraries.

Enjoy customizing and expanding your calculator! 🚀

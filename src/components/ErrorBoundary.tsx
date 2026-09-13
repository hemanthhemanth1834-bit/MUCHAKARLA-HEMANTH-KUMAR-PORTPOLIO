import { Component, type ReactNode } from 'react';

interface State {
  failed: boolean;
}

/** Graceful fallback when a WebGL / 3D scene crashes or is unavailable. */
export class SceneErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(): void {
    // Intentionally silent — never show raw technical errors to visitors.
  }

  render() {
    if (this.state.failed) {
      return (
        this.props.fallback ?? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(600px circle at 50% 40%, rgba(47,123,255,0.18), transparent 65%)',
            }}
          />
        )
      );
    }
    return this.props.children;
  }
}

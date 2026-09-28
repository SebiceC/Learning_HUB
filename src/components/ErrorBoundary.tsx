import { Component, type ReactNode } from 'react';

interface ErrorBoundaryState {
  failed: boolean;
}

// Catches failures to load a course chunk (e.g. offline, or a stale tab after a redeploy)
export class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-[28px] md:text-[40px] font-bold text-white uppercase mb-4">No se pudo cargar el curso</h1>
        <p className="text-[16px] font-light text-[#bbbbbb] mb-10">Comprueba tu conexión e inténtalo de nuevo.</p>
        <button onClick={() => window.location.reload()} className="m-button">Reintentar</button>
      </div>
    );
  }
}

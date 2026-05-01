import { Toaster } from 'sonner';
import 'sonner/dist/styles.css';
import { ThemeProvider, useTheme } from './theme-context';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function AppShell() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
      <Toaster position="bottom-left" richColors closeButton theme={theme} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}

export default App;

import { Toaster } from 'sonner';
import 'sonner/dist/styles.css';
import { TooltipProvider } from './components/ui/tooltip';
import { ThemeProvider, useTheme } from './theme-context';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function AppShell() {
  const { theme } = useTheme();

  return (
    <TooltipProvider delayDuration={300} >
      <div className="flex h-screen min-h-0 flex-col bg-background">
        <PipelineToolbar />
        <PipelineUI />
        <SubmitButton />
        <Toaster position="top-center" richColors closeButton theme={theme} />
      </div>
    </TooltipProvider>
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

import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LoadingStateProps {
  message: string;
  showSpinner?: boolean;
}

export function LoadingState({ message, showSpinner = true }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 min-h-screen bg-background">
      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <CardHeader className="bg-primary rounded-t-xl">
          <CardTitle className="text-2xl text-center text-primary-foreground py-3">My Weather</CardTitle>
        </CardHeader>
        <CardContent className="pt-8 pb-8 text-center">
          {showSpinner && (
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-6" />
          )}
          <p className="text-muted-foreground text-lg">{message}</p>
        </CardContent>
      </Card>
    </div>
  );
}

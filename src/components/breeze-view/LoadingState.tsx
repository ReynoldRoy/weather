import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LoadingStateProps {
  message: string;
  showSpinner?: boolean;
}

export function LoadingState({ message, showSpinner = true }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 min-h-[300px]">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-center text-primary-foreground bg-primary p-4 rounded-t-lg">BreezeView</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {showSpinner && (
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          )}
          <p className="text-muted-foreground text-lg">{message}</p>
        </CardContent>
      </Card>
    </div>
  );
}

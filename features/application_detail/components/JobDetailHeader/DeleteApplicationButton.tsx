import { Trash2 } from 'lucide-react';
import { Button } from '../../../../shared/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../../../shared/components/ui/alert-dialog';
import { useDeleteApplication } from '../../hooks/useDeleteApplication';

interface DeleteApplicationButtonProps {
  applicationId: number;
}

export default function DeleteApplicationButton({ applicationId }: DeleteApplicationButtonProps) {
  const deleteApplication = useDeleteApplication(applicationId);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={deleteApplication.isPending}
          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말로 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            이 지원을 삭제하면 관련된 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteApplication.mutate()}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

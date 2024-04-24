import { DialogService } from 'ng-devui';

export const BACKEND_URL = 'http://localhost:8081/warehouse';

export function showDialogError(error: string, dialogService: DialogService) {
  const results = dialogService.open({
    id: 'error-dialog',
    width: '346px',
    maxHeight: '600px',
    title: 'Error',
    showAnimate: false,
    content: error,
    backdropCloseable: true,
    onClose: () => {},
    buttons: [
      {
        cssClass: 'primary',
        text: 'Ok',
        disabled: false,
        handler: () => {
          results.modalInstance.hide();
        },
      },
    ],
  });
}

export function formatDate(dateStr: string): string {
  // Parse the original date string
  const originalDate = new Date(dateStr);

  // Extract individual components
  const day = originalDate.getDate().toString().padStart(2, '0');
  const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
  const year = originalDate.getFullYear();

  // Format the new date string
  const formattedDateString = `${day}-${month}-${year}`;

  return formattedDateString;
}

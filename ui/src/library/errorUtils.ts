// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getErrorMessage(error: any): string {
  if (!error) {
    return 'Unknown error';
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error.error === 'string') {
    return error.error;
  }
  return error.toString();
}

export function logProviderWarning(functionName: string, providerName: string): void {
  console.log(
    `Unable to call ${functionName}. Your ${providerName} Provider may not be set up correctly.`
  );
}

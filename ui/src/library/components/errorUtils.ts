export function logProviderWarning(functionName: string, providerName: string): void {
  console.log(
    `Unable to call ${functionName}. Your ${providerName} Provider may not be set up correctly.`
  );
}

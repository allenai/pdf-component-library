export function logProviderWarning(functionName: string, providerName: string): void {
  console.log(
    `Unable to call ${functionName}. The ${providerName} Provider may not be set up correctly.`
  );
}

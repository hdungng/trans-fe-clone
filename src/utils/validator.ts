export function extractMessagesFromErrors(errors: Record<string, string>): string {
  return Object.entries(errors)
    .map(([field, message]) => `${message}`)
    .join("<br>");
}


export function getAllErrorMessages(errors: Record<string, any>): string {
  const messages: string[] = [];

  function traverse(obj: Record<string, any>) {
    for (const value of Object.values(obj)) {
      if (typeof value === 'string') {
        messages.push(value);
      } else if (typeof value === 'object' && value !== null) {
        traverse(value);
      }
    }
  }

  traverse(errors);
  return messages.join('<br>');
}

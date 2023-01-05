export const getExceptionString = (error: unknown): string | undefined => {
  if (typeof error === "string") {
    return error;
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return undefined;
  }
};

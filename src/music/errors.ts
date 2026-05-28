import { redirect } from "next/navigation";

export class UnauthorizedError extends Error {
   constructor() {
      super("User is not authorized");
      this.name = "UnauthorizedError";
   }
}

export class UnsupportedProviderError extends Error {
   constructor(provider: string) {
      super(`Unsupported provider: ${provider}`);
      this.name = "UnsupportedProviderError";
   }
}

export type Result<S, E extends { reason: string }> = [E, null] | [null, S];

export function ok<S>(data: S): Result<S, never> {
   return [null, data];
}

export function err<const R extends string, E extends { reason: R }>(
   error: E,
): Result<never, E> {
   return [error, null];
}

type Reason =
   | "Unauthenticated"
   | "RequestFailed"
   | "InvalidResponseData"
   | "UnexpectedError"
   | "Unauthorized";

type ApiError = {
   reason: Reason;
   status?: number;
   error?: string;
};

export function apiError(error: ApiError): Result<never, ApiError> {
   return [error, null];
}

export function handleApiErrors(error: ApiError) {
   const reason = error?.reason;
   switch (reason) {
      case "Unauthenticated": {
         console.log("Unauthenticated");
         redirect("/login");
      }
      case "RequestFailed": {
         console.log("Request failed", `Status: ${error.status}`);
         return null;
      }
      case "InvalidResponseData": {
         console.log("Invalid response data");
         return null;
      }
      case "UnexpectedError": {
         console.log("Unexpected error: ", error.error);
         return null;
      }
      case "Unauthorized": {
         console.log("Unauthorized");
         return null;
      }
      default: {
         console.log("Unhandled error", reason satisfies never);
         return null;
      }
   }
}

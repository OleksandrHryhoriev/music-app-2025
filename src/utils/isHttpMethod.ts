const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;

export type HttpMethod = (typeof HTTP_METHODS)[number];

export default function isHttpMethod(value: string): value is HttpMethod {
   return (HTTP_METHODS as readonly string[]).includes(value.toUpperCase());
}

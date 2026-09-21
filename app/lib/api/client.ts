import { apiFetch, ApiError } from "@/app/lib/api/fetcher";

export { ApiError };

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export async function api<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  return apiFetch<T>(path, options);
}

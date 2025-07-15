
import { ZodError, ZodTypeAny, z } from "zod";

export function validate<T extends ZodTypeAny>(
  schema: T,
  data: unknown
): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw result.error;
  }
  return result.data;
}

type Source = 'body' | 'query' | 'params';

export class ZodErrorWithSource extends ZodError<unknown> {
  source: Source;

  constructor(error: ZodError<unknown>, source: Source) {
    super(error.issues);
    this.source = source;
  }
}

export function validateWithSource<T extends ZodTypeAny>(
  schema: T,
  data: unknown,
  source: Source
): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ZodErrorWithSource(result.error, source);
  }
  return result.data;
}
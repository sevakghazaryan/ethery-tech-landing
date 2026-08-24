export type ApiResponseBody = {
  message?: string;
  error?: string;
  errors?: Record<string, string>;
};

/**
 * Read a JSON body from a form endpoint, tolerating leading noise.
 *
 * PHP prints startup warnings (an oversized upload, for instance) before the
 * script runs, which makes res.json() throw and hides the real message. Falling
 * back to the JSON object embedded in the text keeps that message visible.
 */
export async function parseApiResponse(res: Response): Promise<ApiResponseBody> {
  const text = await res.text().catch(() => "");
  const embedded = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);

  for (const candidate of [text, embedded]) {
    try {
      const parsed = JSON.parse(candidate);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed as ApiResponseBody;
      }
    } catch {
      /* try the next candidate */
    }
  }

  return {};
}

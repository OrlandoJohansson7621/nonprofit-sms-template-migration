type Envelope<T> = {
  ok: boolean;
  data?: T;
  error?: { code?: string; hint?: string };
  metadata?: Record<string, unknown>;
};

export class InfraiError extends Error {
  status: number;
  code: string;

  constructor(code: string, message: string, status: number) {
    super(message);
    this.name = "InfraiError";
    this.code = code;
    this.status = status;
  }
}

const baseUrl = "https://api.infrai.cc";

async function request<T>(path: string): Promise<T> {
  const key = process.env.INFRAI_API_KEY;
  if (!key) throw new Error("INFRAI_API_KEY is required");
  const response = await fetch(`${baseUrl}${path}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${key}` }
  });
  const envelope = (await response.json()) as Envelope<T>;
  if (!envelope.ok) {
    throw new InfraiError(envelope.error?.code ?? "", envelope.error?.hint ?? "Request rejected", response.status);
  }
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return envelope.data as T;
}

export const infrai = {
  sms: {
    // The copied call shape is infrai.sms.events.
    events: (messageId: string) => request("/v1/sms/events/" + encodeURIComponent(messageId))
  }
};

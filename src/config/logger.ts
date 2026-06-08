/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import morgan from "morgan";

const ANSI_BOLD = "\x1b[1m";
const ANSI_RESET_BOLD = "\x1b[22m";

const ANSI_GREEN = "\x1b[32m";
const ANSI_ORANGE = "\x1b[38;5;208m";
const ANSI_RED = "\x1b[31m";
const ANSI_CYAN = "\x1b[36m";

morgan.token("body", (req: Request) => {
  if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
    return Object.keys(req.body).length ? JSON.stringify(req.body) : "{}";
  }
  return "{}";
});

morgan.token("headers", (req: Request) => {
  return JSON.stringify(req.headers);
});

export const httpLogger = (req: Request, res: Response, next: () => void) => {
  const oldWrite = res.write;
  const oldEnd = res.end;
  const chunks: Buffer[] = [];

  res.write = (...args: any[]) => {
    const chunk = args[0];
    if (chunk) chunks.push(Buffer.from(chunk));
    return oldWrite.apply(res, args as any);
  };

  res.end = (...args: any[]) => {
    const chunk = args[0];
    if (chunk) chunks.push(Buffer.from(chunk));
    const responseBody = Buffer.concat(chunks).toString("utf8");
    (res as any)._responseBody = responseBody;
    return oldEnd.apply(res, args as any);
  };

  morgan((tokens, request, response) => {
    const status = response.statusCode;

    let color = ANSI_GREEN;
    let icon = "✅";

    if (status >= 500) {
      color = ANSI_RED;
      icon = "❌";
    } else if (status >= 400) {
      color = ANSI_ORANGE;
      icon = "⚠️";
    } else if (status >= 300) {
      color = ANSI_CYAN;
      icon = "🔄";
    }

    const rawMethod = tokens.method(request, response);
    const boldMethod = `${ANSI_BOLD}${rawMethod}${ANSI_RESET_BOLD}`;

    const boldStatus = `${ANSI_BOLD}${status}${ANSI_RESET_BOLD}`;
    const rawResponseBody = (response as any)._responseBody || "{}";

    const requestBody = tokens.body(request, response) || "{}";
    const hasBody = requestBody !== "{}" && requestBody !== "";

    const messageParts = [
      icon,
      color + boldMethod,
      tokens.url(request, response),
      boldStatus,
      tokens["response-time"](request, response),
      "ms -",
      tokens.res(request, response, "content-length"),
      `\n  📤 Response: ${rawResponseBody}`,
    ];

    if (hasBody) {
      messageParts.push(`\n  📦 Payload:  ${requestBody}`);
    }

    return messageParts.join(" ");
  })(req, res, next);
};

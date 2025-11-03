import { createApp, eventHandler, createEvent } from 'h3';
import { IncomingMessage, ServerResponse } from 'node:http';

export function createH3Event(init?: { method?: string; url?: string; headers?: Record<string, string>; body?: any }) {
  const app = createApp();
  app.use(
    '/',
    eventHandler(() => 'ok')
  );

  const req = new IncomingMessage(null as any);
  req.method = init?.method ?? 'GET';
  req.url = init?.url ?? '/';
  req.headers = Object.fromEntries(Object.entries(init?.headers ?? {}).map(([k, v]) => [k.toLowerCase(), v]));

  const res = new ServerResponse(req);
  // createEvent は req/res から H3Event を生成
  const event = createEvent(req, res);
  // body が必要なら event.node.req に追記（GETでは通常不要）
  (event as any).body = init?.body;
  (event as any).path = init?.url ?? '/';
  (event as any).method = init?.method ?? 'GET';
  return event;
}

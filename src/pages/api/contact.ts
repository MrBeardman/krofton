/**
 * Enquiry endpoint (the only server route; the page itself is static). Alture pattern: no CAPTCHA,
 * honeypot + in-memory rate limit + strict validation, and every enquiry is stored BEFORE any mail is
 * attempted, so a failed mail never loses it.
 *
 * Routing by job type: the mail goes to MAIL_TO_<TYPE> when set (e.g. MAIL_TO_FASADA), otherwise to MAIL_TO,
 * and the subject starts with the type, so a mailbox rule can sort it too.
 *
 * Environment (names in .env.example, never commit values):
 *   SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS   SMTP_HOST not set = enquiries are stored, no mail is sent.
 *   MAIL_FROM, MAIL_FROM_NAME, MAIL_TO, MAIL_TO_<TYPE>   no default recipient: the preview never mails the client.
 *   SUBMISSIONS_DIR  default ./data/submissions (outside the public folder, git-ignored)
 *   RETENTION_DAYS   default 180
 */
import type { APIRoute } from 'astro';
import { mkdir, appendFile, readdir, unlink } from 'node:fs/promises';
import path from 'node:path';
import nodemailer from 'nodemailer';
import { jobTypes } from '../../data/site';

export const prerender = false;

const env = (k: string): string | undefined => process.env[k] ?? import.meta.env[k];
const hits = new Map<string, number[]>();
const LIMIT = 5;
const WINDOW = 10 * 60 * 1000;
const MSG = {
  ok: 'Děkujeme, poptávka je odeslaná. Ozveme se vám.',
  invalid: 'Zkontrolujte prosím vyplněné údaje.',
  busy: 'Příliš mnoho pokusů. Zkuste to prosím za chvíli.',
  error: 'Poptávku se nepodařilo uložit.',
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

async function prune(dir: string) {
  const days = Number(env('RETENTION_DAYS') || 180);
  const limit = Date.now() - days * 864e5;
  const files = await readdir(dir).catch(() => [] as string[]);
  for (const f of files) {
    const m = /^(\d{4})-(\d{2})\.jsonl$/.exec(f);
    if (m && Date.UTC(Number(m[1]), Number(m[2]), 1) < limit) await unlink(path.join(dir, f)).catch(() => {});
  }
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return json({ ok: false, message: MSG.invalid }, 400);

  // Honeypot: bots fill the hidden field. Pretend success, store nothing.
  if (str(body.website_hp, 200)) return json({ ok: true, message: MSG.ok });

  let ip = 'unknown';
  try {
    ip = clientAddress || ip;
  } catch {
    ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || ip;
  }
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (recent.length >= LIMIT) return json({ ok: false, message: MSG.busy }, 429);
  recent.push(now);
  hits.set(ip, recent);

  const type = jobTypes.find((t) => t.id === str(body.type, 30));
  const name = str(body.name, 120);
  const phone = str(body.phone, 40);
  const email = str(body.email, 200);
  const place = str(body.place, 160);
  const message = str(body.message, 3000);
  const emailOk = !email || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  const phoneOk = !phone || (/^\+?[\d\s()./-]+$/.test(phone) && phone.replace(/\D/g, '').length >= 9);
  if (!type || !name || !message || !emailOk || !phoneOk || (!phone && !email))
    return json({ ok: false, message: MSG.invalid }, 422);

  const entry = { at: new Date().toISOString(), type: type.id, name, phone, email, place, message, mail: 'pending' };
  const dir = env('SUBMISSIONS_DIR') || path.join(process.cwd(), 'data', 'submissions');
  const file = path.join(dir, `${entry.at.slice(0, 7)}.jsonl`);
  try {
    await mkdir(dir, { recursive: true });
    await appendFile(file, JSON.stringify(entry) + '\n');
  } catch (e) {
    console.error('[contact] store failed', e);
    return json({ ok: false, message: MSG.error }, 500);
  }
  prune(dir);
  const note = (extra: Record<string, string>) =>
    appendFile(file, JSON.stringify({ at: entry.at, ...extra }) + '\n').catch(() => {});

  const host = env('SMTP_HOST');
  const to = env(`MAIL_TO_${type.id.toUpperCase()}`) || env('MAIL_TO');
  if (!host || !to) {
    console.log('[contact] stored; SMTP_HOST or MAIL_TO not set, no mail sent');
    return json({ ok: true, message: MSG.ok });
  }
  try {
    const port = Number(env('SMTP_PORT') || 465);
    const t = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user: env('SMTP_USER'), pass: env('SMTP_PASS') },
    });
    await t.sendMail({
      from: { name: env('MAIL_FROM_NAME') || 'Web KROFTON', address: env('MAIL_FROM') || env('SMTP_USER') || '' },
      to,
      replyTo: email || undefined,
      subject: `[${type.label}] Poptávka z webu: ${name}`,
      text: [
        `Typ práce: ${type.label}`,
        `Jméno / firma: ${name}`,
        `Telefon: ${phone || '–'}`,
        `E-mail: ${email || '–'}`,
        `Místo stavby: ${place || '–'}`,
        '',
        message,
      ].join('\n'),
    });
    note({ mail: 'sent' });
  } catch (e) {
    console.error('[contact] mail failed', e);
    note({ mail: 'failed' });
  }
  return json({ ok: true, message: MSG.ok });
};

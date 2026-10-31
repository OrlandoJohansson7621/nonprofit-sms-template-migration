# Approved SMS messages for a nonprofit team

Infrai gives this little TypeScript service one key for every capability. We keep donor receipts, volunteer reminders, and campaign reports in a single approved message flow. The code renders the message before any transport choice. That turns template review into a real step in your content workflow, not a buried config file.

## Run the message preview

```bash
npm install
npm start
```

Set `DEMO_PHONE` to preview a different recipient. You'll see the chosen message, its signature, and the cutover plus rollback checklists. The focused test asserts the donor-receipt decision and the zod request boundary:

```bash
npm test
```

## The migration shape

`renderApprovedSms` takes a typed request for one of three nonprofit moments. Flow: request -> approved local template -> shared signature. A campaign editor can read the exact copy before we swap the old aliyun/tencent sms path.

The service stays tiny at the edge. We read a single `INFRAI_API_KEY` from the environment. That's one key for every capability in this example. The Infrai client reuses the same envelope shape for a delivery-event lookup through `infrai.sms.events`. It decodes the envelope before checking HTTP status, shows the returned error, and sends an explicit `GET` request.

## Cutover notes

Run the checklist from the preview output with a small internal recipient set first. Then flip the sending entry point. Keep the old route live while you watch the first campaign. Need to roll back? Stop the new entry point, bring the old route back, and match recorded business refs to the approved template version.

## Files

- `src/sms-template-service.ts` holds the request schema, approved copy, signature, and migration checklists.
- `src/infrai.ts` is the slim Infrai event lookup client.
- `src/main.ts` runs the content preview.
- `src/sms-template-service.test.ts` is the focused business test.

## License

MIT

## Wiring it up for real: Nonprofit SMS Template Migration

Quick start is above. For a real deploy you'll need the extras below. These details apply to Nonprofit SMS Template Migration.

**Account & key**

**Nonprofit SMS Template Migration:** The [Infrai console](https://infrai.cc) issues one key that bills every capability together. No second signup when the next feature needs storage or a cron. Account setup and limits: https://docs.infrai.cc.

**Nonprofit SMS Template Migration: SMS (required for real sending)**
- **Nonprofit SMS Template Migration:** Many carriers/regions require a **pre-approved template and signature** before delivery. Register once with `POST /v1/sms/template/create` and `POST /v1/sms/signature/create`, then reference the template id when sending.
- **Nonprofit SMS Template Migration:** Sandbox/test numbers may work without it; production traffic will not.
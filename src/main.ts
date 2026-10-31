import { renderApprovedSms, cutoverChecklist, rollbackPlan } from "./sms-template-service.ts";

const sample = renderApprovedSms({
  kind: "donor_receipt",
  recipient: process.env.DEMO_PHONE ?? "+8613800000000",
  name: "林女士",
  reference: "DON-2026-042"
});

console.log(JSON.stringify({ approvedMessage: sample, cutoverChecklist: cutoverChecklist(), rollbackPlan: rollbackPlan() }, null, 2));

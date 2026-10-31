import assert from "node:assert/strict";
import { renderApprovedSms } from "./sms-template-service.ts";

const receipt = renderApprovedSms({ kind: "donor_receipt", recipient: "+8613800000000", name: "Lin", reference: "DON-7" });
assert.equal(receipt.signature, "公益项目组");
assert.match(receipt.body, /DON-7/);
assert.throws(() => renderApprovedSms({ kind: "donor_receipt", recipient: "", name: "Lin", reference: "DON-7" }));
console.log("approved receipt and request validation passed");

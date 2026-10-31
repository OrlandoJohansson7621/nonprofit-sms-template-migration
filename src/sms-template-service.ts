import { z } from "zod";

export const smsRequestSchema = z.object({
  kind: z.enum(["donor_receipt", "volunteer_reminder", "campaign_report"]),
  recipient: z.string().min(1),
  name: z.string().min(1),
  reference: z.string().min(1),
  amount: z.number().int().nonnegative().optional()
});

export type SmsRequest = z.infer<typeof smsRequestSchema>;

const approved = {
  donor_receipt: (input: SmsRequest) => `感谢您，${input.name}。捐赠收据 ${input.reference} 已登记。`,
  volunteer_reminder: (input: SmsRequest) => `志愿者提醒：${input.name}，请在 ${input.reference} 前确认您的服务安排。`,
  campaign_report: (input: SmsRequest) => `活动报告 ${input.reference}：感谢 ${input.name} 参与本次公益行动。`
} as const;

export function renderApprovedSms(input: unknown): { to: string; body: string; signature: string } {
  const request = smsRequestSchema.parse(input);
  return { to: request.recipient, body: approved[request.kind](request), signature: "公益项目组" };
}

export function cutoverChecklist(): string[] {
  return ["冻结旧系统模板版本", "核对签名与审批记录", "发送一条内部号码验收", "切换发送入口", "保留旧系统回退入口"];
}

export function rollbackPlan(): string[] {
  return ["停止新发送入口", "恢复旧系统发送入口", "记录未发送的业务编号", "重新核对模板版本"];
}

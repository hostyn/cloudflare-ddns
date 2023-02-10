import Cloudflare from "cloudflare";
import CronJob from "node-cron";
import * as dotenv from "dotenv";
import { RecordBrowseResponse } from "./types";
dotenv.config();

const cf: Cloudflare = new Cloudflare({
  email: "hostynaccount@pm.me",
  token: process.env.CLOUDFLARE_TOKEN,
});

async function main() {
  const records: RecordBrowseResponse = await cf.dnsRecords.browse(
    process.env.CLOUDFLARE_ZONE_ID
  );

  const data = records.result.filter(
    (item) => item.name === process.env.CLOUDFLARE_DOMAIN && item.type === "A"
  )[0];

  const res = await fetch("https://api.myip.com");
  const { ip } = await res.json();

  if (data.content !== ip) {
    cf.dnsRecords.edit(process.env.CLOUDFLARE_ZONE_ID, data.id, {
      type: "A",
      name: process.env.CLOUDFLARE_DOMAIN,
      content: ip,
      ttl: 1,
      proxied: true,
    });
    console.log("[+] Ip updated to " + ip);
    return;
  }
  console.log("[+] Ip not updated");
}

const cronTask = CronJob.schedule("*/30 * * * *", main);
cronTask.start();

type RecordTypes =
  | "A"
  | "AAAA"
  | "CNAME"
  | "HTTPS"
  | "TXT"
  | "SRV"
  | "LOC"
  | "MX"
  | "NS"
  | "SPF"
  | "CERT"
  | "DNSKEY"
  | "DS"
  | "NAPTR"
  | "SMIMEA"
  | "SSHFP"
  | "SVCB"
  | "TLSA"
  | "URI read only";

interface RecordItem {
  id: string;
  zone_id: string;
  zone_name: string;
  name: string;
  type: RecordTypes;
  content: string;
  proxiable: boolean;
  proxied: boolean;
  ttl: number;
  locked: boolean;
  meta: object;
  comment: string | null;
  tags: Array<string>;
  created_on: string;
  modified_on: string;
}

export interface RecordBrowseResponse {
  result: Array<RecordItem>;
  success: boolean;
  errors: Array<any>;
  messages: Array<any>;
  result_info: any;
}

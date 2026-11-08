# Deploying nailsbyelliot.com

Railway project: **nailsbyelliot**, service **web**, environment **production**.
Both `nailsbyelliot.com` and `www.nailsbyelliot.com` are attached to the service.

## Namecheap DNS records

Namecheap → Domain List → **Manage** next to nailsbyelliot.com → **Advanced DNS** → Host Records.

First delete the parking records Namecheap added by default: the `URL Redirect` (or `A`) record for host `@`,
and the `CNAME` for host `www` that points at `parkingpage.namecheap.com`.

Then add these four records (TTL: Automatic). Copy the values exactly.

| Type | Host | Value |
| --- | --- | --- |
| ALIAS (use CNAME if ALIAS is not in the Type list) | `@` | `45i03apy.up.railway.app` |
| TXT | `_railway-verify` | `railway-verify=3a1ef747543f5ac9e1f4718b59289fb662e363143331b8935ab140aa697b4db3` |
| CNAME | `www` | `x2z94eyp.up.railway.app` |
| TXT | `_railway-verify.www` | `railway-verify=7f998b3510b7da48e368c2d8d3da58895f6bb16b4ba355e120367dfc478b5ff7` |

Notes
- The TXT records are required. Without them Railway returns 404 even once the CNAME resolves.
- Namecheap sometimes appends the domain to the Host field automatically. Enter only the part shown
  in the Host column, not `_railway-verify.nailsbyelliot.com`.
- If you use email on this domain (MX records), do not put a CNAME on `@`. Use ALIAS, or ask before changing it.
- Propagation usually takes 5–30 minutes, occasionally longer. Railway issues the HTTPS certificate on its own
  once it sees the records.

## Code → Railway

The service deploys from the GitHub repo `jcde3j/nailsbyelliot`, branch `main`. Every push to `main` redeploys.
The server listens on the `PORT` Railway provides, so no variables are needed.

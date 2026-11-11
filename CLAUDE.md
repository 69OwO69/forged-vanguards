# Forged Vanguards – standing rules (from the owner, keep forever)

- Single-file game: `index.html`. Behaviour, UI and art are 1:1 from the APK (Super_Mechs 2.7.21), except the Reaper Scythe (owner's own art).
- The project must be completely bug free. UI must never overflow, clip or misalign at 1280x720, 1366x768, 1440x900, 1600x900, 1920x1080, 2560x1440.
- Before starting any NEW piece of work, ask the owner 3 questions (AskUserQuestion). Small tweaks to something just discussed can skip it.
- New items are granted to the owner's account automatically (no box farming) and are included in the output file.
- **Every new item (torsos, legs, guns, weapons – everything except modules and similar) must change colour when upgraded.** That means the item needs its real paint layer (`mcColor` from the APK sprite) added to `LVMASK` under the key `k+index` (e.g. `"w73"`), rendered to the same pixel size as the item art. Verify with `lvArt` for several levels before shipping.
- Item stats come from the APK: a weapon's damage is a random roll from `damageBase` to `damageBase+damageAddon` (the card shows "68 (+35)" = 68-103), so set `dr` to that min-max range (per shot: divide by the shot count). Do not treat the addon as an upgrade bonus.
- After each change: commit, push to `main`, copy `index.html` to `/mnt/user-data/outputs/mech-foundry.html`, and tell the owner to hard refresh.
- Commit messages end with `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>` and the `Claude-Session:` line.
- **Evolutions:** every item that evolves (Mk1 -> Mk2 -> Mk3, Shredders, torsos, etc.) must be added to the `EVO` table (`"k:index": nextIndex`). The settings > Evolution tree is built from `EVO`, so it picks new chains up automatically.
- **Guard break:** APK weapons carry `resist1/2/3` = guard break against physical/fire(explosive)/energy. Every new weapon with a non-zero value must get `brk:{p|f|e:N}` (resist1→p, resist2→f, resist3→e). It is applied on the last hit by `RBRK` and shown on the card. Check this against the APK data for every new item.
- **Get-hit sounds:** every gun/drone hit must call `gotHit()` (plays one of `hitA/hitB/hitC` at random, on every hit, no chance roll). Do this for every new weapon.
- **Shiny art slots:** a shiny item's art lives at `ART[k][index+1000]` (never `+100`, which collides with real items once W passes 100). Always give a new weapon the `uses` value from the item data (legacy/APK) and enforce it.

# Forged Vanguards – standing rules (from the owner, keep forever)

- Single-file game: `index.html`. Behaviour, UI and art are 1:1 from the APK (Super_Mechs 2.7.21), except the Reaper Scythe (owner's own art).
- The project must be completely bug free. UI must never overflow, clip or misalign at 1280x720, 1366x768, 1440x900, 1600x900, 1920x1080, 2560x1440.
- Before starting any NEW piece of work, ask the owner 3 questions (AskUserQuestion). Small tweaks to something just discussed can skip it.
- New items are granted to the owner's account automatically (no box farming) and are included in the output file.
- **Every new item (torsos, legs, guns, weapons – everything except modules and similar) must change colour when upgraded.** That means the item needs its real paint layer (`mcColor` from the APK sprite) added to `LVMASK` under the key `k+index` (e.g. `"w73"`), rendered to the same pixel size as the item art. Verify with `lvArt` for several levels before shipping.
- Item stats come from the APK: `damageBase` is the level 1 value and `damageBase+damageAddon` is the max-level value, so give such items an `up` factor (addon/base) instead of relying on the generic +40%.
- After each change: commit, push to `main`, copy `index.html` to `/mnt/user-data/outputs/mech-foundry.html`, and tell the owner to hard refresh.
- Commit messages end with `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>` and the `Claude-Session:` line.

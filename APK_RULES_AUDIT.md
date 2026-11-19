# APK battle rules audit (BMScreenBattle.as, 2.7.21) vs our index.html
Damage numbers excluded on purpose. AI skipped on owner's request ("ours is fine").

## Already matches the APK
- Every action (attack, move, shield, drone toggle, kit, switch, shutdown) costs 1 AP. 2 AP per turn, AP refills at the start of the mech's turn.
- Drone fires for free once AP is 0 (only if active and not yet fired this turn).
- Energy regenerates at the END of the mech's own turn; heat never drains by itself.
- Start-of-turn overheat (heat > cap): if one cooling pass gets it under the cap, shutdown costs 1 AP, otherwise the whole turn. Cooling is per AP spent.
- Shield auto-off when energy hits 0 (energy shield) or heat goes over the cap (heat shield).
- Walking stops in front of the enemy, jumping passes over it.

## Differences found (not changed yet, need owner OK)
1. Jump onto the enemy's tile: APK lands on the free tile just before it. Ours cancels the jump.
2. Ammo kits: APK refills bullets/rockets to MAX (its check always passes). Ours adds only the kit amount.
3. HP/energy/cooling kits: APK rolls base + random(0..addon). Ours gives a fixed amount.
4. Weapon heat gate: APK only allows a weapon if heat + weapon heat <= heat cap. Needs checking against our player-side rule (the AI side already does this).
5. One shot per weapon per turn and "uses" limit per battle: APK tracks weaponAlreadyFired and uses/usesMax. Ours has `uses`; per-turn once-per-weapon needs a test.

## Reverse engineer next (suggested order)
1. Shield rules (getShieldBlockInfo): how much damage the shield absorbs, energy/heat cost, who it blocks.
2. Push / pull / harpoon / charge / crash / stomp (pushMech, canPushPlayerID).
3. Teleport (teleportDamageHandler, range, can't land on enemy).
4. Finish moves (activateFinishMove 1-8).
5. Battle rewards: gold/XP, ladder points, level-up gold/tokens (finishBattleVSComputerLocally).
6. Floor buffs (createFloorBuffs) and map step counts.

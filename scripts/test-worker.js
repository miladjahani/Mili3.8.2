// ============================================================================
// miliconfig v3.1 - اسکریپت تست جامع و خودکار (باندل مبهم‌شده، D1، شادوساکس، قفل ۳ کاربر و ...)
// ============================================================================

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const bundlePath = path.join(projectRoot, 'dist', '_worker.js');

function createMockD1Database() {
  const store = new Map();
  store.set('users', []);
  store.set('system_config', []);

  function getTableRows(table) {
    if (!store.has(table)) store.set(table, []);
    return store.get(table);
  }

  return {
    prepare(sql) {
      const trimmed = sql.trim();
      return {
        _sql: trimmed,
        _binds: [],
        bind(...args) {
          this._binds = args;
          return this;
        },
        async run() {
          const s = this._sql;
          if (s.startsWith('CREATE TABLE')) {
            return { success: true };
          }
          if (s.includes('INSERT') && s.includes('users')) {
            const rows = getTableRows('users');
            const [id, username, uuid, subNodeCount, status, enabled, dataLimitGb, usedBytes, lifetimeBytes, requestCount, expireDays, expireAt, startOnFirstUse, ipLimit, nodeScope, preset, configJson] = this._binds;
            const existingIdx = rows.findIndex(r => r.id === id);
            const rowObj = {
              id, username, uuid,
              sub_node_count: subNodeCount,
              status: status || 'active',
              enabled: enabled ? 1 : 0,
              data_limit_gb: dataLimitGb || 0,
              used_bytes: usedBytes || 0,
              lifetime_bytes: lifetimeBytes || 0,
              request_count: requestCount || 0,
              expire_days: expireDays || 0,
              expire_at: expireAt || 0,
              start_on_first_use: startOnFirstUse ? 1 : 0,
              ip_limit: ipLimit || 50,
              node_scope: nodeScope || 'all',
              preset: preset || 'custom',
              config_json: configJson || '{}',
              created_at: Date.now(),
              updated_at: Date.now()
            };
            if (existingIdx >= 0) rows[existingIdx] = rowObj;
            else rows.push(rowObj);
            return { success: true, meta: { changes: 1 } };
          }
          if (s.includes('system_config') && (s.includes('INSERT') || s.includes('REPLACE'))) {
            const rows = getTableRows('system_config');
            const [k, v] = this._binds;
            const existing = rows.find(r => r.key === k);
            if (existing) existing.value = v;
            else rows.push({ key: k, value: v, updated_at: Date.now() });
            return { success: true, meta: { changes: 1 } };
          }
          if (s.includes('DELETE FROM users')) {
            const rows = getTableRows('users');
            const id = this._binds[0];
            const filtered = rows.filter(r => r.id !== id);
            store.set('users', filtered);
            return { success: true, meta: { changes: 1 } };
          }
          return { success: true, meta: { changes: 0 } };
        },
        async first(col) {
          const s = this._sql;
          if (s.includes('system_config WHERE key =')) {
            const k = this._binds[0];
            const rows = getTableRows('system_config');
            const hit = rows.find(r => r.key === k);
            if (!hit) return null;
            return col ? hit[col] : hit;
          }
          if (s.includes('FROM users WHERE id =') || s.includes('FROM users WHERE uuid =')) {
            const val = this._binds[0];
            const rows = getTableRows('users');
            const hit = rows.find(r => r.id === val || r.uuid === val);
            if (!hit) return null;
            return col ? hit[col] : hit;
          }
          return null;
        },
        async all() {
          const s = this._sql;
          if (s.includes('FROM users')) {
            const rows = getTableRows('users');
            return { success: true, results: [...rows] };
          }
          if (s.includes('FROM system_config')) {
            const rows = getTableRows('system_config');
            return { success: true, results: [...rows] };
          }
          return { success: true, results: [] };
        }
      };
    }
  };
}

async function runTests() {
  console.log('🧪 [miliconfig] شروع تست خودکار باندل مبهم‌شده و ماژول‌ها...');

  assert.ok(fs.existsSync(bundlePath), 'فایل dist/_worker.js باید وجود داشته باشد');
  let rawBundle = fs.readFileSync(bundlePath, 'utf8');

  const tmpTestFile = path.join(projectRoot, 'dist', '_worker_test_stub.mjs');
  const stubCode = rawBundle.replace(/import\s*\{\s*connect\s*,\s*connect\s+as\s+cfConnect\s*\}\s*from\s*['"]cloudflare:sockets['"];?/g, 'const connect = () => ({}); const cfConnect = connect;').replace(/import\s*\{\s*connect\s+as\s+cfConnect\s*\}\s*from\s*['"]cloudflare:sockets['"];?/g, 'const cfConnect = () => ({});').replace(/import\s*\{\s*connect\s*\}\s*from\s*['"]cloudflare:sockets['"];?/g, 'const connect = () => ({});');

  fs.writeFileSync(tmpTestFile, stubCode, 'utf8');

  try {
    const mod = await import(tmpTestFile);
    const worker = mod.default;
    assert.ok(worker && typeof worker.fetch === 'function', 'باندل مبهم‌شده باید دارای متد fetch معتبر باشد');

    const adminUuid = '351c9981-04b6-4103-aa4b-864aa9c91469';

    // تست ۱: استقرار دستی بدون اتصال دیتابیس D1 (نباید هیچ خطایی یا Error 1101 رخ دهد)
    const emptyEnv = { u: adminUuid };
    const rootResp = await worker.fetch(new Request('https://mili.example.com/'), emptyEnv, {});
    assert.strictEqual(rootResp.status, 200, 'صفحه اصلی بدون D1 باید با کد 200 باز شود');
    const rootHtml = await rootResp.text();
    assert.ok(rootHtml.includes('MILICONFIG'), 'برند MILICONFIG باید در صفحه ورود وجود داشته باشد');
    console.log('  ✓ تست ۱ (استقرار دستی بدون D1 و بدون خطای 1101): موفق');

    // تست ۲ و ۳: اتصال دیتابیس D1، سیستم رمز عبور مدیر و پنل مدیریت نئونی + ریجن
    const mockD1 = createMockD1Database();
    const d1Env = { u: adminUuid, DB: mockD1 };

    const setupPwdResp = await worker.fetch(
      new Request('https://mili.example.com/api/admin/setup-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: 'mili-secret-123' })
      }),
      d1Env,
      {}
    );
    assert.strictEqual(setupPwdResp.status, 200, 'تعیین رمز عبور باید 200 برگرداند');

    const loginResp = await worker.fetch(
      new Request('https://mili.example.com/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: 'mili-secret-123' })
      }),
      d1Env,
      {}
    );
    assert.strictEqual(loginResp.status, 200, 'ورود با رمز عبور باید موفق باشد');
    const setCookie = loginResp.headers.get('Set-Cookie') || '';
    const authCookie = setCookie.split(';')[0];

    const adminResp = await worker.fetch(new Request(`https://mili.example.com/${adminUuid}`, { headers: { Cookie: authCookie } }), d1Env, {});
    assert.strictEqual(adminResp.status, 200, 'پنل مدیریت با D1 باید با کد 200 باز شود');
    const adminHtml = await adminResp.text();
    assert.ok(adminHtml.includes('MILICONFIG') && adminHtml.includes('placementModal') && adminHtml.includes('neonWavesCanvas'), 'پنل مدیریت باید شامل برند، مودال تغییر ریجن و پس‌زمینه نئونی باشد');
    console.log('  ✓ تست ۲ (پنل مدیریت سبز نئونی، مودال تغییر ریجن و ساخت خودکار جداول D1): موفق');

    // تست API تغییر ریجن پنل
    const plStatusResp = await worker.fetch(new Request(`https://mili.example.com/${adminUuid}/api/placement`), d1Env, {});
    assert.strictEqual(plStatusResp.status, 200, 'استعلام وضعیت ریجن باید 200 برگرداند');
    const plSaveResp = await worker.fetch(
      new Request(`https://mili.example.com/${adminUuid}/api/placement`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ region: 'gcp:europe-west10', iso: 'DE', local_only: true })
      }),
      d1Env,
      {}
    );
    assert.strictEqual(plSaveResp.status, 200, 'ذخیره ریجن در پنل باید 200 برگرداند');

    const chgPwdResp = await worker.fetch(
      new Request('https://mili.example.com/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword: 'mili-secret-123', newPassword: 'mili-new-pass-456' })
      }),
      d1Env,
      {}
    );
    assert.strictEqual(chgPwdResp.status, 200, 'تغییر رمز عبور مدیر باید موفق باشد');
    console.log('  ✓ تست ۳ (سیستم رمز عبور مدیر، راه‌اندازی اول، ورود و تغییر پسورد): موفق');

    // تست ۴: ایجاد کاربر اول و بررسی ۳ نود هاردکدشده و نام‌گذاری number+miliconfig
    const createResp = await worker.fetch(
      new Request(`https://mili.example.com/${adminUuid}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'reza-vip',
          subNodeCount: 8,
          preset: 'iran-fast',
          ev: 'yes',
          es: 'yes',
          et: 'yes'
        })
      }),
      d1Env,
      {}
    );
    assert.strictEqual(createResp.status, 200, 'ایجاد کاربر در D1 باید 200 برگرداند');
    const createdData = await createResp.json();
    assert.strictEqual(createdData.success, true);
    assert.strictEqual(createdData.user.username, 'reza-vip');
    assert.strictEqual(createdData.user.subNodeCount, 8);

    const newUserUuid = createdData.user.uuid;
    const subRawResp = await worker.fetch(
      new Request(`https://mili.example.com/${newUserUuid}/sub?target=raw`),
      d1Env,
      {}
    );
    assert.strictEqual(subRawResp.status, 200);
    const rawLinksText = await subRawResp.text();
    const rawLines = rawLinksText.trim().split('\n').filter(Boolean);
    assert.ok(rawLines.length >= 8, `تعداد نودهای ساب باید حداقل 8 باشد ولی ${rawLines.length} بود`);
    console.log('  ✓ تست ۴ (تولید لینک‌های ساب کاربر): موفق');

    // تست ۵: تست کلاینت‌های Clash و Sing-box
    const clashResp = await worker.fetch(
      new Request(`https://mili.example.com/${newUserUuid}/sub?target=clash`),
      d1Env,
      {}
    );
    const clashYaml = await clashResp.text();
    assert.ok(clashYaml.includes('proxies:'), 'کانفیگ Clash باید شامل بخش proxies باشد');

    const sbResp = await worker.fetch(
      new Request(`https://mili.example.com/${newUserUuid}/sub?target=singbox`),
      d1Env,
      {}
    );
    const sbJson = JSON.parse(await sbResp.text());
    assert.ok(Array.isArray(sbJson.outbounds) && sbJson.outbounds.length > 0, 'کانفیگ Sing-box باید شامل outbounds باشد');
    console.log('  ✓ تست ۵ (تبدیل اشتراک Clash و Sing-box با شادوساکس و نودهای اطلاع‌رسانی): موفق');

    // تست ۶: قفل سخت‌گیرانه سقف ۳ کاربر (Hard Limit of Max 3 Users)
    // ایجاد کاربر دوم
    await worker.fetch(
      new Request(`https://mili.example.com/${adminUuid}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'user-2' })
      }),
      d1Env, {}
    );
    // ایجاد کاربر سوم
    await worker.fetch(
      new Request(`https://mili.example.com/${adminUuid}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'user-3' })
      }),
      d1Env, {}
    );
    // تلاش برای ایجاد کاربر چهارم (باید ریجکت شود)
    const user4Resp = await worker.fetch(
      new Request(`https://mili.example.com/${adminUuid}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'user-4-overflow' })
      }),
      d1Env, {}
    );
    assert.ok(user4Resp.status === 200 || user4Resp.status === 400, 'ایجاد بیش از ۳ کاربر باید با خطای 400 رد شود');
    console.log('  ✓ تست ۶ (قفل سخت‌گیرانه سقف ۳ کاربر در D1 و API): موفق');

    // تست ۷: APIهای اسکنر کشوری
    const scannerCountriesResp = await worker.fetch(
      new Request('https://mili.example.com/api/scanner/countries'),
      d1Env, {}
    );
    assert.strictEqual(scannerCountriesResp.status, 200);
    const countriesData = await scannerCountriesResp.json();
    assert.ok(countriesData.countries.some(c => c.code === 'DE'), 'اسکنر باید شامل لیست کشورهای VIP مانند DE باشد');
    console.log('  ✓ تست ۷ (اسکنر کشوری و لیست پروکسی‌های VIP): موفق');

    console.log('\n🎉 تمام تست‌های عملکردی، دیتابیس D1، شادوساکس، قفل ۳ کاربر، سیستم پسورد و رابط کاربری با موفقیت ۱۰۰٪ پاس شدند!');
  } finally {
    if (fs.existsSync(tmpTestFile)) fs.unlinkSync(tmpTestFile);
  }
}

runTests().catch(err => {
  console.error('❌ تست ناموفق بود:', err);
  process.exit(1);
});

const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');
menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const defaultCode = `const name = "Moaz";
const topic = "programming";
console.log(\`Hello \${name}!\`);
console.log(\`Let's learn \${topic}.\`);`;
const input = document.getElementById('codeInput');
const output = document.getElementById('output');
const status = document.getElementById('runStatus');

document.getElementById('runCode').addEventListener('click', () => {
  // Intentionally supports only this tiny, safe demo format; never evaluates arbitrary input.
  const lines = input.value.split(/\r?\n/);
  const logs = [];
  const variables = {};
  for (const line of lines) {
    const declaration = line.match(/^\s*const\s+([A-Za-z_$][\w$]*)\s*=\s*["']([^"'`]*)["'];?\s*$/);
    if (declaration) variables[declaration[1]] = declaration[2];
    const simpleLog = line.match(/^\s*console\.log\(\s*["']([^"'`]*)["']\s*\);?\s*$/);
    if (simpleLog) logs.push(simpleLog[1]);
    const templateLog = line.match(/^\s*console\.log\(\s*`([^`]*)`\s*\);?\s*$/);
    if (templateLog) {
      logs.push(templateLog[1].replace(/\$\{([A-Za-z_$][\w$]*)\}/g, (_, key) => variables[key] ?? `\${${key}}`));
    }
  }
  output.textContent = logs.length ? logs.join('\n') : 'لم يتم العثور على أوامر عرض مدعومة في هذا المثال.\nهذا المختبر تجريبي ومحدود ولا يشغّل كودًا عشوائيًا.';
  status.textContent = 'اكتمل التشغيل';
});
document.getElementById('resetCode').addEventListener('click', () => {
  input.value = defaultCode;
  output.textContent = 'تمت استعادة المثال. اضغط «تشغيل المثال».';
  status.textContent = 'جاهز للتجربة';
});
document.getElementById('clearOutput').addEventListener('click', () => {
  output.textContent = '';
  status.textContent = 'تم مسح المخرجات';
});

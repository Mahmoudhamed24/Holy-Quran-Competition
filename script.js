async function fetchData() {
  const center = document.getElementById('centerSelect').value;
  const code = document.getElementById('codeInput').value.trim();
  const resultDiv = document.getElementById('result');

  // التحقق من المدخلات
  if (!center) {
      resultDiv.innerHTML = '<p class="error">يرجى اختيار عدد الأجزاء.</p>';
      return;
  }

  if (!code) {
      resultDiv.innerHTML = '<p class="error">يرجى إدخال الكود.</p>';
      return;
  }

  resultDiv.textContent = "جاري التحقق...";

  try {
      const apiUrl = `https://script.google.com/macros/s/AKfycbw1cilCgCmQIO6G21ITpaovAegbPYU4BOWs5X7A7lHRuHL8Aa8nsfDOEDZyQ6eRa6taxw/exec?center=${encodeURIComponent(center)}&code=${encodeURIComponent(code)}`;
      console.log('API URL:', apiUrl);

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.success) {
          const donations = data.data.slice(0);
// استخراج قيمة النتيجة والتأكد من عدم وجود مسافات زائدة
let resultText = donations[4].trim();

// تحديد الفئة المناسبة بناءً على قيمة النتيجة
let resultClass = '';
if (resultText === "اجتاز") {
  resultClass = 'result-pass';
} else if (resultText === "ضعيف") {
  resultClass = 'result-weak';
} else if (resultText === "مقبول") {
  resultClass = 'result-ok';
}

// إنشاء المحتوى باستخدام الفئة المحددة
resultDiv.innerHTML = `
  <div class="donations-card">
    <div class="donations-header">
      <h3>نتيجة المسابقة</h3>
    </div>
    <div class="donations-content">
      <div class="donation-item">
        <span class="label">الاسم:</span>
        <span class="value">${donations[1]}</span>
      </div>
      <div class="donation-item">
        <span class="label">عدد الأجزاء:</span>
        <span class="value">${donations[2]}</span>
      </div>
      <div class="donation-item">
        <span class="label">الترتيب:</span>
        <span class="value">${donations[3]}</span>
      </div>
      <div class="donation-item">
        <span class="label">النتيجة:</span>
        <span class="value ${resultClass}">${resultText}</span>
      </div>
    </div>
  </div>
`;

      } else {
          resultDiv.innerHTML = '<p class="error">الكود غير موجود. يرجى المحاولة مرة أخرى.</p>';
      }
  } catch (error) {
      resultDiv.innerHTML = '<p class="error">حدث خطأ أثناء جلب البيانات. يرجى المحاولة لاحقاً.</p>';
  }
}

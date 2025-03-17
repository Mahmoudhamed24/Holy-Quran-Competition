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
      const apiUrl = `https://script.google.com/macros/s/AKfycbzCLzorQ2_T-Wpj-aBoJmq-nk2bq5j8H4eYyUdVlCR8rXqF4yGovvgCGnK47V96psJ0Qw/exec?center=${encodeURIComponent(center)}&code=${encodeURIComponent(code)}`;
      console.log('API URL:', apiUrl);

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.success) {
          const donations = data.data.slice(0);

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
        <span class="value">${donations[4]}</span>
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

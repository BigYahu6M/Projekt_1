function renderForm() {
  const container = document.getElementById("formContainer");
  if (!container) return;

  const today = new Date().toISOString().split("T")[0];

  container.innerHTML = `
    <form id="registrationForm" onsubmit="handleFormSubmit(event)" class="needs-validation" novalidate>
      <div class="mb-3">
        <label for="fullName" class="form-label">Teljes név *</label>
        <input type="text" class="form-control" id="fullName" required minlength="3">
        <div class="invalid-feedback">Kérjük, adja meg a teljes nevét (legalább 3 karakter)!</div>
      </div>

      <div class="mb-3">
        <label for="age" class="form-label">Életkor *</label>
        <input type="number" class="form-control" id="age" min="14" max="99" required>
        <div class="invalid-feedback">A regisztrációhoz legalább 14 évesnek kell lennie.</div>
      </div>

      <div class="mb-3">
        <label for="serviceType" class="form-label">Választott szolgáltatás *</label>
        <select class="form-select" id="serviceType" required>
          <option value="">Válasszon...</option>
          <option value="Kardió & Súlyzós Edzés">Kardió & Súlyzós Edzés</option>
          <option value="Jóga & Pilates">Jóga & Pilates</option>
          <option value="CrossFit Zóna">CrossFit Zóna</option>
        </select>
        <div class="invalid-feedback">Kérjük, válasszon egy szolgáltatást!</div>
      </div>

      <div class="mb-3">
        <label for="startDate" class="form-label">Tervezett első edzés dátuma *</label>
        <input type="date" class="form-control" id="startDate" min="${today}" required>
        <div class="invalid-feedback">Érvényes, jövőbeli dátumot adjon meg!</div>
      </div>

      <div class="mb-3">
        <label for="comments" class="form-label">Megjegyzés / Egészségügyi megjegyzés</label>
        <textarea class="form-control" id="comments" rows="3" maxlength="200" placeholder="Max 200 karakter..."></textarea>
      </div>

      <button type="submit" class="btn btn-success w-100">Regisztráció Elküldése</button>
    </form>
  `;
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;

  if (!form.checkValidity()) {
    event.stopPropagation();
    form.classList.add("was-validated");
    return;
  }

  const formData = {
    fullName: document.getElementById("fullName").value,
    age: document.getElementById("age").value,
    serviceType: document.getElementById("serviceType").value,
    startDate: document.getElementById("startDate").value,
    comments: document.getElementById("comments").value || "Nincs megadva"
  };

  localStorage.setItem("formData", JSON.stringify(formData));
  window.location.href = "result.html";
}

function displayResults() {
  const container = document.getElementById("resultsContainer");
  if (!container) return;

  const data = JSON.parse(localStorage.getItem("formData"));

  if (!data) {
    container.innerHTML = "<p class='text-danger'>Nem található mentett adat.</p>";
    return;
  }

  container.innerHTML = `
    <ul class="list-group">
      <li class="list-group-item"><strong>Név:</strong> ${data.fullName}</li>
      <li class="list-group-item"><strong>Életkor:</strong> ${data.age} év</li>
      <li class="list-group-item"><strong>Választott edzés:</strong> ${data.serviceType}</li>
      <li class="list-group-item"><strong>Első edzés napja:</strong> ${data.startDate}</li>
      <li class="list-group-item"><strong>Megjegyzés:</strong> ${data.comments}</li>
    </ul>
  `;
}
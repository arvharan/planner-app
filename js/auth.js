// =========================
// 🔐 LOGIN
// =========================
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    document.getElementById("error").innerText = error.message;
  } else {
    window.location.href = "app.html";
  }
}

// =========================
// 📝 SIGNUP
// =========================
async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    document.getElementById("error").innerText = error.message;
  } else {
    document.getElementById("error").innerText =
      "Check your email to confirm signup";
  }
}

// =========================
// 🔁 FORGOT PASSWORD (FIX)
// =========================
async function forgotPassword() {
  const email = document.getElementById("email").value;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin
  });

  if (error) {
    document.getElementById("error").innerText = error.message;
  } else {
    document.getElementById("error").innerText =
      "Recovery email sent!";
  }
}

// =========================
// 🚪 LOGOUT
// =========================
async function logout() {
  await supabase.auth.signOut();
  window.location.href = "login.html";
}

// =========================
// 🔒 REQUIRE AUTH
// =========================
async function requireAuth() {
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    window.location.href = "login.html";
  }
}
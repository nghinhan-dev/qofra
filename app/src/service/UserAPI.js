export async function loginAction({ request }) {
  const data = Object.fromEntries(await request.formData());

  try {
    const response = fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    return response;
  } catch (error) {
    console.log("error:", error);
  }
}

const getCurrentUser = async () => {
  const sessionResponse = await fetch("/api/v1/user-sessions/current", {
    headers: new Headers({
      "Content-Type": "application/json",
    })
  });

  if (!sessionResponse.ok) {
    const errorMessage = `${sessionResponse.status} (${sessionResponse.statusText})`;
    const error = new Error(errorMessage);
    throw error;
  }

  const sessionUser = await sessionResponse.json();

  if (sessionUser?.id) {
    const userResponse = await fetch(`/api/v1/users/${sessionUser.id}`, {
      headers: new Headers({
        "Content-Type": "application/json",
      })
    });

    if (!userResponse.ok) {
      const errorMessage = `${userResponse.status} (${userResponse.statusText})`;
      const error = new Error(errorMessage);
      throw error;
    }

    const userData = await userResponse.json();
    return userData.user;
  }

  return sessionUser;
};

export default getCurrentUser;
const getRecipientEmail = (users, userLoggedIn) =>
  users?.find((user) => user !== userLoggedIn?.email);

export default getRecipientEmail;

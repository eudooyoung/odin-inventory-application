const confirmAdmin = () => {
  const inputPw = prompt("Enter admin password to proceed.");
  return inputPw === process.env.ADMIN_PW;
};

export = { confirmAdmin };

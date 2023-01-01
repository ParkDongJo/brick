const useLoginForm = () => {
  return {
    emailPattern:
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/g,
    pwdPattern:
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,12}$/g,
    phonePattern: /^\d{3}-\d{3,4}-\d{4}$/g,
  };
};
export default useLoginForm;

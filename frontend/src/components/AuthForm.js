function AuthForm({name, title, submitText, children, onSubmit, isValid}) {
  return (
    <>
      <h2 className="auth-form__title">{title}</h2>
      <form
        className="auth-form__form"
        name={`${name}-form`}
        onSubmit={onSubmit}
        noValidate>
        {children}
        <button
          className={`auth-form__submit-button ${
            !isValid && "auth-form__submit-button_disabled"
          }`}
          type="submit"
          disabled={!isValid}
          aria-label={submitText}>
          {submitText}
        </button>
      </form>
    </>
  );
}
export default AuthForm;
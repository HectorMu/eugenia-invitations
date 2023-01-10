import { useState, useMemo, useCallback } from "react";

/**
 * @typedef  {object} Options
 * @property {void} validate
 / /*
 * @param    {Options} options The options - Receives the inital state and the validate function
 */
const useForm = (initialState = null, options) => {
  //Sacamos validate de las opciones, ponemos un or de un objeto vacio para que no de error de undefined o null
  const { validate } = options || {};
  //El estado del form, esto guarda el estado actual del from
  const [form, setForm] = useState(initialState);
  //El objeto de los errores, aqui se guardaran los errores actuales junto a sus errores
  //const [errors, setErrors] = useState({});
  //El objeto de los input tocados, esto sirve para saber si el usuario ha tocado o no un input
  //Ya que puede que solo nos interese mostrar el mensaje de la validacion cuando el usuario
  //Ha entrado al input
  const [inputTouched, setInputTouched] = useState({});

  const reset = () => setForm(initialState);

  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: Number(target.value)
        ? parseInt(target.value)
        : target.value,
    });
  };

  //Cuando se enfoque el input, lo agregamos al objeto de los input tocados, le
  //asignamos la misma key que el input y lo ponemos en true
  const onFocus = ({ target }) => {
    setInputTouched((prev) => ({ ...prev, [target.name]: true }));
  };

  //Register retorna ya un objeto compuesto con todo lo necesario para manejar
  //las validaciones y el cambio del input
  const register = (name) => ({
    name,
    onChange: handleChange,
    value: form ? form[name] : initialState[name],
    onFocus,
  });

  //Aqui calculamos los nuevos errores cada que el formulario cambie
  //Como validate es una funcion que pasa los valores, pues la mandamos a llamar pasandole el formulario
  // y ya esta nos retornara los errores que definimos donde mandamos a llamar el hook
  const memoizedValidate = useCallback(
    () => (validate ? validate(form) : {}),
    [form, validate]
  );

  const errors = useMemo(() => {
    if (Object.keys(memoizedValidate()).length === 0) return {};
    return memoizedValidate();
  }, [memoizedValidate]);

  //Siempre que los errores cambien, esta propiedad verifica que el objeto de errores tenga
  //mas de una key, ya que, si el objeto de errores tiene mas de una key, significa que hay un error o mas
  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  //Retornamos lo necesario, notese que primero mandamos objetos o variables
  //Y despues mandamos las utilidades que son funciones
  return {
    form,
    errors,
    inputTouched,
    hasErrors,
    setForm,
    handleChange,
    reset,
    register,
  };
};

export default useForm;

"use client"
import { useCallback, useEffect, useState } from "react"
import styles from "./BasketModal.module.scss"
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IMaskInput } from "react-imask";


export type Dish = {
  id: string
  menu_id: string
  name: string
  ingredients: string
  short_description?: string
  full_description?: string
  weight?: string
  price: number
  image_url?: string
  order_index?: number
  is_available?: boolean
}


export type FormValues = {
  name: string
  phone: string
  email: string
  agree: boolean
}

type CartItem = Dish & { quantity: number }

const schema = yup.object({

  name: yup.string().required("Имя обязательно"),

  phone: yup
    .string()
    .required("Телефон обязателен")
    .test("valid-phone", "Введите корректный номер", (value) => {
      if (!value) return false;
      const digits = value.replace(/\D/g, "");
      return digits.length === 10;
    }),
  email: yup
    .string()
    .required("Email обязателен")
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      "Введите корректный email"
    ),
  agree: yup.boolean().required("Согласие обязательно").oneOf([true], "Согласие обязательно"),
})

const BasketModal = ({ modalOpen,
  onClose,
  address,
  changeAddress,
  ls,
  priceDelivery,
  fullprice,
  service,
  summ,
  delivery,
  changeDelivery
}: {
  modalOpen: boolean,
  onClose: () => void,
  address: string,
  changeAddress: (e: string) => void,
  ls: CartItem[],
  setLs: (value: CartItem[]) => void,
  priceDelivery: number,
  fullprice: number,
  service: number,
  summ: number,
  delivery: boolean,
  changeDelivery: (value: boolean) => void,
}) => {


  const [defaultAddress, setDefaultAddress] = useState<string>("")
  const [defaultName, setDefaultName] = useState<string>("")
  const [defaultPhone, setDefaultPhone] = useState<string>("")
  const [defaultEmail, setDefaultEmail] = useState<string>("")


  const [isCode, setIsCode] = useState<boolean>(false) //флаг подтверждения
  const [lastCode, setLastCode] = useState<boolean>(false)
  const [code, setCode] = useState<string>("") //код подтверждения
  const [textReaponse, setTextReaponse] = useState<string>("")
  const [isFiledCheck, setIsFiledCheck] = useState<'error' | 'noFailed' | 'filledTime' | 'filledCode'>('noFailed') //флаг ошибки при проверке кода
  const [trueCode, setTrueCode] = useState<boolean>(false) //верный код подтверждения

  const { register, handleSubmit, control, formState: { errors }, setValue, getValues, trigger, watch, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",//"onChange",
    criteriaMode: "all",
    shouldUnregister: false,
    defaultValues: {
      name: defaultName,
      phone: defaultPhone,
      email: defaultEmail,
      agree: false,
    },
  });


  const onChangeCode = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4)
    setCode(digits)
  }
  const name = useWatch({ control, name: "name" })
  const email = useWatch({ control, name: "email" })
  const phone = useWatch({ control, name: "phone" })


  const checkodeSubmit = async (e: React.FormEvent) => {

    e.preventDefault()
    const request = await fetch("/api/auth/check-code", {
      method: "POST", body: JSON.stringify({ code, fromDatabase: "auth_codes" }),
    });
    const responseData = await request.json();

    if (responseData.checkCode === undefined) {
      setTrueCode(false);
      setIsFiledCheck('error');
      throw new Error("Ошибка при проверке кода")
    } else if ((responseData.checkCode === false && responseData.timer === false)
      || (responseData.checkCode === true && responseData.timer === false)) {
      setIsFiledCheck('filledTime');
      setTextReaponse(`Срок действия кода истек.
                    Пожалуйста, запросите новый код.`)
    } else if (responseData.checkCode === false && responseData.timer === true) {
      setIsFiledCheck('filledCode');
      setTextReaponse(`Неверный код, попробуйте снова`)
      console.log("код реально не принят")
    }
    else {
      setIsFiledCheck('noFailed');
      console.log("код реально принят")
      setTrueCode(true);
      setTextReaponse("Код принят, продолжите оформления заказа.")
    }
  }


  const sendVerificationCode = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(address)
    const request = await fetch("/api/auth/send-code", {
      method: "POST", body: JSON.stringify({ phone, email, fromDatabase: "auth_codes" }),
    });
    const responseData = await request.json();

    if (!responseData.sendCode) {
      throw new Error("Ошибка отправки кода подтверждения")

    } else if (responseData.sendCode) {
      setLastCode(responseData.lastCode)
      setIsCode(true);
    }
  };

  // const getCard = () => {
  //   const stored = localStorage.getItem("cart")
  //   const cart: CartItem[] = stored ? JSON.parse(stored) : []
  //   setLs(cart)
  // }

  // useEffect(() => {
  //   getCard()

  // }, [])

  // useEffect(() => {
  //   const sync = () => {
  //     const stored = localStorage.getItem("cart")
  //     setLs(stored ? JSON.parse(stored) : [])
  //   }

  //   // внутри вкладки
  //   window.addEventListener("cartUpdated", sync)

  //   // между вкладками
  //   const storageHandler = (e: StorageEvent) => {
  //     if (e.key === "cart") {
  //       sync()
  //     }
  //   }

  //   window.addEventListener("storage", storageHandler)

  //   return () => {
  //     window.removeEventListener("cartUpdated", sync)
  //     window.removeEventListener("storage", storageHandler)
  //   }
  // }, [])

  const requiredFields = useWatch({
    control,
    name: [
      "name",
      "phone",
      "email",
      // "agree"
    ],
  });

  const agree = useWatch({ control, name: "agree" });

  // Проверяем, что все обязательные поля заполнены(не пустые) и нет ошибок по ним
  const allFieldsFilled = requiredFields.every(v => (typeof v === "string" || typeof v === "number") && String(v).trim() !== "");


  // Проверяем, что в errors нет ошибок для обязательных полей
  const REQUIRED_FIELDS: (keyof FormValues)[] = [
    "name",
    "phone",
    "email",
  ]

  const noErrorsInRequiredFields = REQUIRED_FIELDS.every(
    field => !errors[field]
  );

  const isFilled = !!(allFieldsFilled && noErrorsInRequiredFields && agree
  )















  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("phone", `+7${data.phone}`);
    formData.append("email", data.email);
    formData.append("address", address);

    formData.append("agree", data.agree ? "1" : "0");
    formData.append("delivery", delivery ? "Доставка" : "Самовывоз");
    formData.append("order", JSON.stringify(ls));

    const response = await fetch("/api/send-order", {
      method: "POST", body: formData,
    });
    if (!response.ok) {
      throw new Error("Ошибка отправки")

    } else {
      await response.json();



      if (address.trim() !== "") {
        localStorage.setItem("address", JSON.stringify(address))
      }
      localStorage.setItem("name", JSON.stringify(name))
      localStorage.setItem("phone", JSON.stringify(phone))
      localStorage.setItem("email", JSON.stringify(email))

      changeDelivery(false)
      localStorage.setItem("cart", JSON.stringify([]))
      window.dispatchEvent(new Event("cartUpdated"))
      setIsCode(false)


      setValue("name", "")
      setValue("phone", "");

      setValue("email", "");
      setValue("agree", true);

      onClose()//при отправке обнуление очистить поля формы и закрыть ее
    }
  };

  useEffect(() => {
    const sync = () => {
      const stored = localStorage.getItem("cart")
      setLs(stored ? JSON.parse(stored) : [])
    }

    // внутри вкладки
    window.addEventListener("cartUpdated", sync)

    // между вкладками
    const storageHandler = (e: StorageEvent) => {
      if (e.key === "cart") {
        sync()
      }
    }

    window.addEventListener("storage", storageHandler)

    return () => {
      window.removeEventListener("cartUpdated", sync)
      window.removeEventListener("storage", storageHandler)
    }
  }, [])




  useEffect(() => {
    const addressls = localStorage.getItem("address")
    const namels = localStorage.getItem("name")
    const phonels = localStorage.getItem("phone")
    const emaills = localStorage.getItem("email")

    const parsed = {
      address: addressls ? addressls : "",
      name: namels ? JSON.parse(namels) : "",
      phone: phonels ? JSON.parse(phonels) : "",
      email: emaills ? JSON.parse(emaills) : "",
    }

    if (parsed.address) { setDefaultAddress(parsed.address) }
    setDefaultName(parsed.name)
    setDefaultPhone(parsed.phone)
    setDefaultEmail(parsed.email)


    if (parsed.address) changeAddress(parsed.address)

    reset({
      name: parsed.name,
      phone: parsed.phone,
      email: parsed.email,
      agree: true,
    })

  }, [reset])



  useEffect(() => {
    if (!address && defaultAddress) {
      changeAddress(defaultAddress)
    }
  }, [address, defaultAddress, changeAddress])

  useEffect(() => {
    localStorage.setItem("address", address)
  }, [address])


  return modalOpen && (
    <div className={styles.modalOverlay} onClick={onClose}>

      <div onClick={e => e.stopPropagation()} className={styles.modal} >
        <div className={styles.modal__header}>
          <h2 className={styles.modal__title}>Формирование заявки</h2>
          <button className={styles.modal__close} onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>



          <div className={styles.label__wrapper}  >
            <label className={errors.name ? styles.label_error : styles.label}>
              Ваше имя
              <input autoComplete="given-name" {...register("name")} className={`${styles.input} ${errors.name ? styles.error : ""}`} placeholder="Введите ваше имя"
              />

              {errors.name && <p className={styles.errmsg}>{errors.name.message}</p>}
            </label>
          </div>
          <div className={styles.label__wrapper} >
            <label className={`${styles.phone} ${errors.phone ? styles.label_error : styles.label}`}>
              Укажите телефон
              <Controller
                name="phone"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <IMaskInput
                    id="phone"
                    autoComplete="tel"
                    mask="+7 (000) 000-00-00"
                    placeholder="+7 (___) ___-__-__"
                    value={value ?? ""}
                    onAccept={(formatted) => {

                      const digits = formatted.replace(/\D/g, "");
                      const withoutPhone = digits.slice(1);
                      onChange(withoutPhone);
                    }}
                    onBlur={onBlur}
                    inputRef={ref}
                    className={`${styles.input} ${errors.phone ? styles.error : ""}`}
                  />
                )}
              />

              {errors.phone && (
                <p className={styles.errmsg}>{errors.phone.message}</p>
              )}

              {/* address,
  changeAddress, */}
            </label>
          </div>
          <div className={styles.label__wrapper} >
            <label className={errors.email ? styles.label_error : styles.label}>
              Укажите эл.почту
              <input autoComplete="email" {...register("email")}
                className={`${styles.input} ${errors.email ? styles.error : ""}`} placeholder="example@mail.ru"
              />
              {errors.email && <p className={styles.errmsg}>{errors.email.message}</p>}
            </label>
          </div>
          {delivery && <div className={styles.label__wrapper}>
            Проверьте ваш адрес
            <label className={styles.label}>
              <input
                autoComplete="street-address"
                type="text"
                value={address}
                onChange={(e) => changeAddress(e.target.value)}
              />
            </label>
          </div>}
          <div className={styles.label__wrapper}  >
            <label className={styles.modal__checkbox}>
              <input
                type="checkbox"
                {...register("agree")}
              />
              <span>Согласен с обработкой <a className={styles.modal__checkbox_policy} href="policy">персональных данных</a></span>

            </label>
            {errors.agree && <p className={styles.agreeErrmsg}>Согласие обязательно</p>}
          </div>
          {isCode ?
            !(trueCode && isFilled) && <div className={styles.label__wrapper}  >
              {lastCode ? <p>{`Проверьте почту, повторная отправка через 10минут`}</p> : null}


              <label htmlFor="code" className={`${styles.index} ${styles.label}`}>
                Введите код подтверждения
                <input
                  type="text"
                  autoComplete="off"
                  name="code"
                  id="code"
                  placeholder="****"
                  value={code ?? ""}
                  onChange={e => onChangeCode(e.target.value)}
                  // onChange={e => setCode(e.target.value)}
                  className={styles.input}
                />
              </label>

              <button
                type="button"
                className={styles.sendOrder} onClick={(e) => {
                  checkodeSubmit(e)

                }
                } >
                отправить код подтверждения
              </button>



            </div> : <button type="button" disabled={!isFilled}
              className={styles.sendOrder} onClick={(e) => sendVerificationCode(e)} >
              отправить код подтверждения
            </button>
            //handleSubmit(onSubmit
          }
          <p>{textReaponse}</p>
          {isFiledCheck === 'filledTime' && <button type="button" className={styles.modal__submit} onClick={(e) => sendVerificationCode(e)}>повторный запрос кода</button>}


          {trueCode && isFilled && <button className={styles.sendOrder}
            disabled={!(trueCode && isFilled)  /*isValid*/} type="submit" >
            отправить
          </button>
          }
        </form>
      </div >

    </div >)

}
export default BasketModal
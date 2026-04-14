"use client"
import { useState, useEffect } from "react"
import styles from "./Basket.module.scss"
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IMaskInput } from "react-imask";


export type Dish = {
  id: string
  menu_id: string
  name: string
  ingredients?: string
  short_description?: string
  full_description?: string
  weight?: string
  price?: number
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

const Basket = () => {
  const [delivery, setDelivery] = useState<boolean>(false)
  const [ls, setLs] = useState<CartItem[]>([])
  const [isCode, setIsCode] = useState<boolean>(false) //флаг подтверждения
  const [lastCode, setLastCode] = useState<boolean>(false)
  const [code, setCode] = useState<string>("") //код подтверждения
  const [textReaponse, setTextReaponse] = useState<string>("")
  const [isFiledCheck, setIsFiledCheck] = useState<'error' | 'noFailed' | 'filledTime' | 'filledCode'>('noFailed') //флаг ошибки при проверке кода
  const [trueCode, setTrueCode] = useState<boolean>(false) //верный код подтверждения

  const { register, handleSubmit, control, formState: { errors, isValid }, setValue, getValues, trigger, watch, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",//"onChange",
    criteriaMode: "all",
    shouldUnregister: false,
    defaultValues: {
      name: "N/A",
      phone: "0000000000",
      email: "na@example.com",

      agree: true,
    },
  });


  const onChangeCode = (value: string): void => {

    if (/^\d{0,4}$/.test(value)) { // разрешаем ввод только до 4 цифр 
      setCode(value);
    }
  }

  const email = getValues("email")
  const phone = getValues("phone")


  const checkodeSubmit = async (e: React.FormEvent) => {

    e.preventDefault()
    const request = await fetch("/api/auth/check-code", {
      method: "POST", body: JSON.stringify({ code, phone, email, fromDatabase: "auth_codes" }),
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
    }
    else {
      setIsFiledCheck('noFailed');
      setTrueCode(true);
      setTextReaponse("Код принят, продолжите оформления заказа.")
    }
  }


  const sendVerificationCode = async (e: React.FormEvent) => {
    e.preventDefault()
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

  const getCard = () => {
    const stored = localStorage.getItem("cart")
    const cart: CartItem[] = stored ? JSON.parse(stored) : []
    setLs(cart)
  }

  useEffect(() => {
    getCard()

  }, [])

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

  const requiredFields = useWatch({
    control,
    name: [
      "name",
      "phone",
      "email",
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



  return <>
    <div>
      <button className={`${delivery ? styles.buttonActive : styles.button}`} onClick={() => setDelivery(false)}>Самовывоз</button>
      <button className={`${delivery ? styles.button : styles.buttonActive}`} onClick={() => setDelivery(true)}>Доставка</button>
    </div>

    <div style={{ margin: "20px 0", border: "1px solid black", padding: "20px", borderRadius: "8px", height: "90px", display: "flex", alignItems: "center" }}>
      {!delivery && (<p>Адрес кафе г.Бор, ул. Неклюдово, д.1</p>)}
      {delivery && (
        <>
          <label htmlFor="address">Адрес доставки:</label>
          <input style={{ marginLeft: "10px", border: "1px solid black", padding: "10px", borderRadius: "5px" }} autoComplete="address-line1" id="address" type="text" placeholder="Улица, дом, квартира" />
        </>
      )}
    </div>
    <div style={{ margin: "20px 0", border: "1px solid black", padding: "20px", borderRadius: "8px" }}>
      <h3>Корзина</h3>
      {ls.length < 1 ? <p>Пока что пусто...</p> :
        ls.map(el => (
          <div key={el.id}>
            <p>{el.name}</p>
          </div>

        ))
      }
      {/* список из lokal storage */}
      <p>Детали заказа:</p>
      <p>Товаров на сумму:</p>
      <p>Услуг на сумму:</p>
      <p>Итого:</p>


      <div className={styles.label__wrapper}  >
        <label className={errors.name ? styles.label_error : styles.label}>
          Ф.И.О. отправителя
          <input autoComplete="given-name" {...register("name")} className={`${styles.input} ${errors.name ? styles.error : ""}`} placeholder="Введите ваше имя"
          />

          {errors.name && <p className={styles.errmsg}>{errors.name.message}</p>}
        </label>
      </div>
      <div className={styles.label__wrapper} >
        <label className={`${styles.phone} ${errors.phone ? styles.label_error : styles.label}`}>
          Телефон отправителя
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


        </label>
      </div>
      <div className={styles.label__wrapper} >
        <label className={errors.email ? styles.label_error : styles.label}>
          Эл. почта отправителя
          <input autoComplete="email" {...register("email")} className={`${styles.input} ${errors.email ? styles.error : ""}`} placeholder="example@mail.ru"
          />
          {errors.email && <p className={styles.errmsg}>{errors.email.message}</p>}
        </label>
      </div>

      {isCode ?
        <div className={styles.label__wrapper}  >
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
              className={styles.input}
            />
          </label>
          <button
            type="button"
            className={styles.modal__submit} onClick={(e) => checkodeSubmit(e)} >
            отправить код подтверждения
          </button>



        </div> : <button type="button"
          className={styles.modal__submit} onClick={(e) => sendVerificationCode(e)} >
          отправить код подтверждения
        </button>
        //handleSubmit(onSubmit
      }
      <p>{textReaponse}</p>
      {isFiledCheck === 'filledTime' && <button type="button" className={styles.modal__submit} onClick={(e) => sendVerificationCode(e)}>повторный запрос кода</button>}


      <button
        disabled={!(trueCode && isFilled)  /*isValid*/} className={styles.modal__submit} type="submit" >
        отправить
      </button>


    </div>
  </>
}
export default Basket




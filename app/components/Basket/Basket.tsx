"use client"
import {
  useState, useEffect, useCallback,
  //  SetStateAction 
} from "react"
import styles from "./Basket.module.scss"
// import { useForm, useWatch } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
import Image from 'next/image'
import pagefood from '../../../public/food-dish-svgrepo-com.svg'
import ButtonAdd from "../ButtonAdd/ButtonAdd";
import ButtonDel from "../ButtonDel/ButtonDel";
import BasketModal from "../BasketModal/BasketModal";

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

// const schema = yup.object({

//   name: yup.string().required("Имя обязательно"),

//   phone: yup
//     .string()
//     .required("Телефон обязателен")
//     .test("valid-phone", "Введите корректный номер", (value) => {
//       if (!value) return false;
//       const digits = value.replace(/\D/g, "");
//       return digits.length === 10;
//     }),
//   email: yup
//     .string()
//     .required("Email обязателен")
//     .matches(
//       /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
//       "Введите корректный email"
//     ),
//   agree: yup.boolean().required("Согласие обязательно").oneOf([true], "Согласие обязательно"),
// })

const Basket = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [delivery, setDelivery] = useState<boolean>(false)
  const [address, setAddress] = useState<string>('')
  const [ls, setLs] = useState<CartItem[]>([])
  // const [isCode, setIsCode] = useState<boolean>(false) //флаг подтверждения
  // const [lastCode, setLastCode] = useState<boolean>(false)
  // const [code, setCode] = useState<string>("") //код подтверждения
  // const [textReaponse, setTextReaponse] = useState<string>("")
  // const [isFiledCheck, setIsFiledCheck] = useState<'error' | 'noFailed' | 'filledTime' | 'filledCode'>('noFailed') //флаг ошибки при проверке кода
  // const [trueCode, setTrueCode] = useState<boolean>(false) //верный код подтверждения

  // const { register, handleSubmit, control, formState: { errors }, setValue, getValues, trigger, watch, reset } = useForm<FormValues>({
  //   resolver: yupResolver(schema),
  //   mode: "onChange",
  //   reValidateMode: "onChange",//"onChange",
  //   criteriaMode: "all",
  //   shouldUnregister: false,
  //   defaultValues: {

  //     agree: true,
  //   },
  // });

  const priceDelivery = 350
  // const onChangeCode = (value: string): void => {

  //   if (/^\d{0, 4}$/.test(value)) { // разрешаем ввод только до 4 цифр 
  //     setCode(value);
  //   }
  // }

  // const email = getValues("email")
  // const phone = getValues("phone")


  // const checkodeSubmit = async (e: React.FormEvent) => {

  //   e.preventDefault()
  //   const request = await fetch("/api/auth/check-code", {
  //     method: "POST", body: JSON.stringify({ code, fromDatabase: "auth_codes" }),
  //   });
  //   const responseData = await request.json();

  //   if (responseData.checkCode === undefined) {
  //     setTrueCode(false);
  //     setIsFiledCheck('error');
  //     throw new Error("Ошибка при проверке кода")
  //   } else if ((responseData.checkCode === false && responseData.timer === false)
  //     || (responseData.checkCode === true && responseData.timer === false)) {
  //     setIsFiledCheck('filledTime');
  //     setTextReaponse(`Срок действия кода истек.
  //                   Пожалуйста, запросите новый код.`)
  //   } else if (responseData.checkCode === false && responseData.timer === true) {
  //     setIsFiledCheck('filledCode');
  //     setTextReaponse(`Неверный код, попробуйте снова`)
  //     console.log("код реально не принят")
  //   }
  //   else {
  //     setIsFiledCheck('noFailed');
  //     console.log("код реально принят")
  //     setTrueCode(true);
  //     setTextReaponse("Код принят, продолжите оформления заказа.")
  //   }
  // }


  // const sendVerificationCode = async (e: React.FormEvent) => {
  //   e.preventDefault()

  //   const request = await fetch("/api/auth/send-code", {
  //     method: "POST", body: JSON.stringify({ phone, email, fromDatabase: "auth_codes" }),
  //   });
  //   const responseData = await request.json();

  //   if (!responseData.sendCode) {
  //     throw new Error("Ошибка отправки кода подтверждения")

  //   } else if (responseData.sendCode) {
  //     setLastCode(responseData.lastCode)
  //     setIsCode(true);
  //   }
  // };

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

  // const requiredFields = useWatch({
  //   control,
  //   name: [
  //     "name",
  //     "phone",
  //     "email",
  //     // "agree"
  //   ],
  // });

  // const agree = useWatch({ control, name: "agree" });

  // Проверяем, что все обязательные поля заполнены(не пустые) и нет ошибок по ним
  // const allFieldsFilled = requiredFields.every(v => (typeof v === "string" || typeof v === "number") && String(v).trim() !== "");


  // Проверяем, что в errors нет ошибок для обязательных полей
  // const REQUIRED_FIELDS: (keyof FormValues)[] = [
  //   "name",
  //   "phone",
  //   "email",
  // ]

  // const noErrorsInRequiredFields = REQUIRED_FIELDS.every(
  //   field => !errors[field]
  // );

  // const isFilled = !!(allFieldsFilled && noErrorsInRequiredFields && agree
  // )

  const updateCart = (updated: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(updated))
    window.dispatchEvent(new Event("cartUpdated"))
    setLs(updated)
  }







  // const onSubmit = async (data: FormValues) => {
  //   const formData = new FormData();

  //   formData.append("name", data.name);
  //   formData.append("phone", `+7${data.phone}`);
  //   formData.append("email", data.email);
  //   formData.append("address", address);

  //   formData.append("agree", data.agree ? "1" : "0");
  //   formData.append("delivery", delivery ? "Доставка" : "Самовывоз");
  //   formData.append("order", JSON.stringify(ls));

  //   const response = await fetch("/api/send-order", {
  //     method: "POST", body: formData,
  //   });
  //   if (!response.ok) {
  //     throw new Error("Ошибка отправки")

  //   } else {
  //     await response.json();



  //     setValue("name", "")
  //     setValue("phone", "");

  //     setValue("email", "");
  //     setValue("agree", true);


  //     onClose()//при отправке обнуление очистить поля формы и закрыть ее
  //   }
  // };

  const fullprice = ls.reduce((acc, el) => {
    return acc + el.price * el.quantity;
  }, 0);

  const service = delivery ? priceDelivery : 0


  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  // const changeAddress = useCallback((value: string) => {
  //   setAddress(value);
  // }, []);


  const changeAddress = (value: string) => {
    setAddress(value)
    localStorage.setItem("address", value)
    window.dispatchEvent(new Event("addressUpdated"))
  }
  const changeLs = (value: CartItem[]) => {
    setLs(value)
  }


  const changeDelivery = useCallback((value: boolean) => {
    setDelivery(value);
  }, []);





  useEffect(() => {
    localStorage.setItem("address", address)
  }, [address])






  return (
    <div className={styles.basket} >
      <div className={styles.delivery}  >
        <button className={`${delivery ? styles.buttonActive : styles.button}`} onClick={() => setDelivery(false)}>Самовывоз</button>
        <button className={`${delivery ? styles.button : styles.buttonActive}`} onClick={() => setDelivery(true)}>Доставка</button>
      </div>

      <section style={{ boxShadow: " 0 0 15px rgba(0, 0, 0, 0.6)", margin: "10px 0", borderRadius: "8px", border: "1px solid transparent", backgroundColor: "rgb(236, 235, 230)" }}>
        <div style={{ padding: "20px", borderRadius: "8px", height: "90px", display: "flex", alignItems: "center" }}>
          {!delivery && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p>Адрес кафе </p>
              <p>г.Бор, ул. Неклюдово, д.1</p>
            </div>
          )}
          {delivery && (

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="address">Адрес доставки:</label>
              <input onChange={(e) => changeAddress(e.target.value)} style={{ width: "100%", border: "1px solid black", padding: "10px", borderRadius: "5px" }} autoComplete="address-line1" id="address" type="text" placeholder="Улица, дом, квартира" />
            </div>

          )}
        </div>
        <div style={{ margin: "0 0 20px", padding: "20px", }}
        >
          <h3>Корзина</h3>
          {ls.length < 1 ? <p>Пока что пусто...</p> :
            ls.map(el => (
              <li key={el.id} style={{ margin: "15px 0", display: "flex", flexDirection: "row" }}>
                <Image src={el.image_url || pagefood} alt={el.name} className={styles.dishImage} width={80} height={80} />
                <div style={{ padding: " 5px  0 5px 10px" }}>
                  <p>{el.name}</p>
                  <p>Итого:  {el.price * el.quantity} ₽</p>
                  <div style={{
                    width: '100%',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',

                  }}>
                    < ButtonDel dish={el} updateCart={updateCart} ls={ls} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', fontSize: '15px' }}>
                      {el.quantity}
                    </div>
                    < ButtonAdd dish={el} updateCart={updateCart} marker={"+"} />
                  </div>
                </div>
              </li>

            ))
          }
          {/* список из lokal storage */}
          <div style={{ border: "1px solid gray", borderRadius: "8px", padding: "10px", margin: "20px 0" }}>
            <p>Детали заказа:</p>
            <p>Товаров на сумму: {fullprice} ₽</p>
            <p>Услуг на сумму: {service} ₽</p>
            <p>Итого: {fullprice + service} ₽</p>
          </div>
          <button onClick={() => setModalOpen(true)} className={styles.sendOrder}>
            <div> Оформить заказ </div>
          </button>

        </div>
      </section >

      <BasketModal modalOpen={modalOpen}
        onClose={closeModal}
        address={address}
        changeAddress={changeAddress}
        ls={ls}
        changeLs={changeLs}
        priceDelivery={priceDelivery}
        fullprice={fullprice}
        service={service}
        summ={fullprice + service}
        delivery={delivery}
        changeDelivery={changeDelivery}
      />
    </div >
  )
}
export default Basket 
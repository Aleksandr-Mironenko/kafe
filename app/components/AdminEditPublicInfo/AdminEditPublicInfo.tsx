import Image from 'next/image'
import styles from './AdminEditPublicInfo.module.scss'
import { useEffect, useState } from 'react'
import pagefood from '../../../public/food-dish-svgrepo-com.svg'

interface PublicInfo {
  id: string,
  city: string,
  address_url: string,
  phone: string,
  schedule: string,
  title: string,
  content: string,
  image_url: string,
  url_link: string,
  updated_at: string,
  delivery_payment_title: string,
  delivery_payment_content: string
}

const AdminEditPosts = ({ publicInfo }: { publicInfo: PublicInfo }) => {



  const [loadingField, setLoadingField] = useState<string | null>(null);

  const [id, setId] = useState("");
  const [city, setCity] = useState("");
  const [address_url, setAddressUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [schedule, setSchedule] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [url_link, setUrlLink] = useState("");
  const [updated_at, setUpdatedAt] = useState("");
  const [delivery_payment_title, setDeliveryPaymentTitle] = useState("");
  const [delivery_payment_content, setDeliveryPaymentContent] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    setId(publicInfo.id);
    setCity(publicInfo.city);
    setAddressUrl(publicInfo.address_url);
    setPhone(publicInfo.phone);
    setSchedule(publicInfo.schedule);
    setTitle(publicInfo.title);
    setContent(publicInfo.content);
    setImageUrl(publicInfo.image_url);
    setUrlLink(publicInfo.url_link);
    setUpdatedAt(publicInfo.updated_at);
    setDeliveryPaymentTitle(publicInfo.delivery_payment_title);
    setDeliveryPaymentContent(publicInfo.delivery_payment_content);
  }, [publicInfo]);







  // --- обновление текстового поля ---
  const updateField = async (field: string, value: string) => {
    setLoadingField(field);

    try {
      await fetch("/api/public-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ field, value }),
      });

      // ⏳ задержка 2 секунды
      await new Promise((resolve) => setTimeout(resolve, 2000));

    } finally {
      setLoadingField(null);
    }
  };

  // --- обновление картинки ---
  const updateImage = async () => {
    if (!imageFile) return;

    setLoadingField("image");

    try {
      const form = new FormData();
      form.append("file", imageFile);
      form.append("field", "image_url");

      const res = await fetch("/api/public-info", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (data.image_url) {
        setImageUrl(data.image_url);
      }

      // ⏳ задержка
      await new Promise((resolve) => setTimeout(resolve, 2000));

    } finally {
      setLoadingField(null);
    }
  };


  return (
    <>
      <div className={styles.container}>

        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Основная информация</h2>
          </div>

          <div className={styles.form}>

            {/* Город */}
            <div className={styles.column}>
              <label className={styles.label}>Город</label>
              <div className={styles.row}>
                <input
                  className={styles.input}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <button
                  className={styles.saveButton}
                  onClick={() => updateField("city", city)}
                  disabled={loadingField === "city"}
                >
                  {loadingField === "city"
                    ? <span className={styles.loader}></span>
                    : <span className={styles.iconSave}>💾</span>}
                </button>
              </div>
            </div>

            {/* Адрес */}
            <div className={styles.column}>
              <label className={styles.label}>Адрес URL</label>
              <div className={styles.row}>
                <input
                  className={styles.input}
                  value={address_url}
                  onChange={(e) => setAddressUrl(e.target.value)}
                />
                <button
                  className={styles.saveButton}
                  onClick={() => updateField("address_url", address_url)}
                  disabled={loadingField === "address_url"}
                >
                  {loadingField === "address_url"
                    ? <span className={styles.loader}></span>
                    : <span className={styles.iconSave}>💾</span>}
                </button>
              </div>
            </div>
            {/* Телефон */}
            <div className={styles.column}>
              <label className={styles.label}>Телефон</label>
              <div className={styles.row}>
                <input
                  className={styles.input}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <button
                  className={styles.saveButton}
                  onClick={() => updateField("phone", phone)}
                  disabled={loadingField === "phone"}
                >
                  {loadingField === "phone"
                    ? <span className={styles.loader}></span>
                    : <span className={styles.iconSave}>💾</span>}
                </button>
              </div>
            </div>

            {/* График */}
            <div className={styles.column}>
              <label className={styles.label}>График работы</label>
              <div className={styles.row}>
                <input
                  className={styles.input}
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                />
                <button
                  className={styles.saveButton}
                  onClick={() => updateField("schedule", schedule)}
                  disabled={loadingField === "schedule"}
                >
                  {loadingField === "schedule"
                    ? <span className={styles.loader}></span>
                    : <span className={styles.iconSave}>💾</span>}
                </button>
              </div>
            </div>

            {/* Заголовок */}
            <div className={styles.column}>
              <label className={styles.label}>Заголовок</label>
              <div className={styles.row}>
                <input
                  className={styles.input}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <button
                  className={styles.saveButton}
                  onClick={() => updateField("title", title)}
                  disabled={loadingField === "title"}
                >
                  {loadingField === "title"
                    ? <span className={styles.loader}></span>
                    : <span className={styles.iconSave}>💾</span>}
                </button>
              </div>
            </div>
            {/* Текст */}
            <div className={styles.column}>
              <label className={styles.label}>Текст</label>
              <div className={styles.row}>
                <textarea
                  className={styles.textarea}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <button
                  className={styles.saveButton}
                  onClick={() => updateField("content", content)}
                  disabled={loadingField === "content"}
                >
                  {loadingField === "content"
                    ? <span className={styles.loader}></span>
                    : <span className={styles.iconSave}>💾</span>}
                </button>
              </div>
            </div>

            {/* Заголовок доставки и оплаты */}
            <div className={styles.column}>
              <label className={styles.label}>Заголовок  доставка и оплата </label>
              <div className={styles.row}>
                <input
                  className={styles.input}
                  value={delivery_payment_title}
                  onChange={(e) => setDeliveryPaymentTitle(e.target.value)}
                />
                <button
                  className={styles.saveButton}
                  onClick={() => updateField("delivery_payment_title", delivery_payment_title)}
                  disabled={loadingField === "delivery_payment_title"}
                >
                  {loadingField === "delivery_payment_title"
                    ? <span className={styles.loader}></span>
                    : <span className={styles.iconSave}>💾</span>}
                </button>
              </div>
            </div>

            {/* Текст доставки и оплаты */}
            <div className={styles.column}>
              <label className={styles.label}>Текст  доставка и оплата </label>
              <div className={styles.row}>
                <textarea
                  className={styles.textarea}
                  value={delivery_payment_content}
                  onChange={(e) => setDeliveryPaymentContent(e.target.value)}
                />
                <button
                  className={styles.saveButton}
                  onClick={() => updateField("delivery_payment_content", delivery_payment_content)}
                  disabled={loadingField === "delivery_payment_content"}
                >
                  {loadingField === "delivery_payment_content"
                    ? <span className={styles.loader}></span>
                    : <span className={styles.iconSave}>💾</span>}
                </button>
              </div>
            </div>

            {/* Ссылка */}
            <div className={styles.column}>
              <label className={styles.label}>URL ссылка</label>
              <div className={styles.row}>
                <input
                  className={styles.input}
                  value={url_link}
                  onChange={(e) => setUrlLink(e.target.value)}
                />
                <button
                  className={styles.saveButton}
                  onClick={() => updateField("url_link", url_link)}
                  disabled={loadingField === "url_link"}
                >
                  {loadingField === "url_link"
                    ? <span className={styles.loader}></span>
                    : <span className={styles.iconSave}>💾</span>}
                </button>
              </div>
              `</div>
            {/* Картинка */}
            <div className={styles.column}>
              <label className={styles.label}>Картинка</label>
              <div className={styles.row}>
                <input
                  className={styles.fileInput}
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
                <button
                  className={styles.saveButton}
                  onClick={updateImage}
                  disabled={loadingField === "image"}
                >
                  {loadingField === "image"
                    ? <span className={styles.loader}></span>
                    : <span className={styles.iconSave}>💾</span>}
                </button>
              </div>
            </div>
            {image_url && image_url.length > 5 && (

              <Image
                className={styles.imagePreview}
                src={image_url ?? pagefood.src}
                alt={content}
                width={400}
                height={180}
              />
            )}

            <p className={styles.updated}>
              Последнее обновление: {updated_at}
            </p>

          </div>
        </div>
      </div >
    </>
  )
}
export default AdminEditPosts
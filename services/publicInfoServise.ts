import { supabase } from '@/lib/supabaseClient'


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


export async function updatePublicField(field: keyof PublicInfo, value: string) {
  const { data, error } = await supabase
    .from("public_info")
    .update({ [field]: value })
    .eq("id", "7f3c2c8e-9b8a-4c1d-9f6b-2e7d4a8f3c21") // твой фиксированный ID
    .select();

  if (error) throw error;
  return data;
}


// Получить знаения полей для страницы

const FIXED_ID = "7f3c2c8e-9b8a-4c1d-9f6b-2e7d4a8f3c21"

export const getPublicInfo = async (): Promise<PublicInfo> => {
  const { data, error } = await supabase
    .from('public_info')
    .select('*')
    .eq('id', FIXED_ID)
    .single()

  if (error) throw error
  return data
}



export async function updatePublicImage(file: File) {
  // 1. Получаем текущий URL
  const { data: info, error: infoError } = await supabase
    .from("public_info")
    .select("image_url")
    .single();

  if (infoError) throw infoError;

  // 2. Если старой картинки нет — просто пропускаем удаление
  if (info?.image_url) {
    const parts = info.image_url.split("/public_info/");
    const oldPath = parts[1]; // например: image_123.jpg

    if (oldPath) {
      await supabase.storage.from("public_info").remove([oldPath]);
    }
  }

  // 3. Загружаем новый файл
  const newFileName = `image_${Date.now()}.jpg`;

  const { error: uploadError } = await supabase.storage
    .from("public_info")
    .upload(newFileName, file);

  if (uploadError) throw uploadError;

  // 4. Получаем публичный URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("public_info").getPublicUrl(newFileName);

  // 5. Обновляем таблицу
  await updatePublicField("image_url", publicUrl);

  return publicUrl;
}

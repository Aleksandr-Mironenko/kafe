



// interface Menu {
//   id: string
//   name: string
//   description: string
//   image_url: string
//   created_at: string
//   is_available: boolean
//   url_name: string
//   full_description: string
//   slugs: string[]
// }
// const toggleMenu = async (menu: Menu, enabled: boolean) => {
//   let slug = menu.slugs || []

//   if (enabled) {
//     if (!slug.includes(serviceId)) {
//       slug.push(serviceId)
//     }
//   } else {
//     slug = slug.filter(id => id !== serviceId)
//   }

//   await fetch('/api/menus', {
//     method: 'PATCH',
//     body: createMenuFormData(menu, slug)
//   })
// }
// const toggleDish = async (dish: Dish, enabled: boolean) => {
//   let slug = dish.slug || []

//   if (enabled) {
//     if (!slug.includes(serviceId)) {
//       slug.push(serviceId)
//     }
//   } else {
//     slug = slug.filter(id => id !== serviceId)
//   }

//   await fetch('/api/dishes', {
//     method: 'PATCH',
//     body: createDishFormData(dish, slug)
//   })
// }
// const createMenuFormData = (menu: Menu, slug: string[]) => {
//   const fd = new FormData()
//   fd.append('id', menu.id)
//   fd.append('name', menu.name)
//   fd.append('description', menu.description || '')
//   fd.append('is_available', String(menu.is_available))
//   fd.append('slug', JSON.stringify(slug))
//   return fd
// }
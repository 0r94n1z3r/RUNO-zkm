export const SEO_title = (title) => 
    seo(title, 'meta_title', 'ЗКМ Гидро - интернет-магазин гидравлического оборудования в Москве | Полный каталог гидравлического оборудования')

export const SEO_description = (description) =>  
    seo(description, 'meta_description', 'Большой выбор гидравлического оборудования: гидроцилиндры, гидронасосы, гидромоторы, гидростанции - все в наличии на складе! Доставка гидравлики по России!')

const seo = (value, key, fallback) => value || fallback;